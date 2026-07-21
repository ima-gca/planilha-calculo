"use strict";
// Lista de países pro campo "País" (busca por nome completo, exibe sigla ISO
// alpha-3 depois de selecionado — ex.: "Brasil" -> "BRA", "Estados Unidos" -> "USA").
// Guarda os códigos ISO 3166-1 alpha-2 (usados nas buscas de CEP/GeoNames) e o
// respectivo alpha-3 (ALPHA3_POR_ALPHA2, só pra exibição) — o NOME em português
// vem de Intl.DisplayNames em tempo de execução (sempre atualizado, sem precisar
// manter uma lista de nomes traduzidos à mão).

const CODIGOS_PAISES_ISO = [
  "AD","AE","AF","AG","AI","AL","AM","AO","AR","AT","AU","AW","AZ",
  "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BN","BO","BR","BS","BT","BW","BY","BZ",
  "CA","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CU","CV","CY","CZ",
  "DE","DJ","DK","DM","DO","DZ",
  "EC","EE","EG","ER","ES","ET",
  "FI","FJ","FM","FR",
  "GA","GB","GD","GE","GH","GM","GN","GQ","GR","GT","GW","GY",
  "HN","HR","HT","HU",
  "ID","IE","IL","IN","IQ","IR","IS","IT",
  "JM","JO","JP",
  "KE","KG","KH","KI","KM","KN","KP","KR","KW","KZ",
  "LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY",
  "MA","MC","MD","ME","MG","MH","MK","ML","MM","MN","MR","MT","MU","MV","MW","MX","MY","MZ",
  "NA","NE","NG","NI","NL","NO","NP","NR","NZ",
  "OM",
  "PA","PE","PG","PH","PK","PL","PS","PT","PW","PY",
  "QA",
  "RO","RS","RU","RW",
  "SA","SB","SC","SD","SE","SG","SI","SK","SL","SM","SN","SO","SR","SS","ST","SV","SY","SZ",
  "TD","TG","TH","TJ","TL","TM","TN","TO","TR","TT","TV","TW","TZ",
  "UA","UG","US","UY","UZ",
  "VA","VC","VE","VN","VU",
  "WS",
  "YE",
  "ZA","ZM","ZW",
];

const ALPHA3_POR_ALPHA2 = {
  AD:"AND",AE:"ARE",AF:"AFG",AG:"ATG",AI:"AIA",AL:"ALB",AM:"ARM",AO:"AGO",AR:"ARG",AT:"AUT",AU:"AUS",AW:"ABW",AZ:"AZE",
  BA:"BIH",BB:"BRB",BD:"BGD",BE:"BEL",BF:"BFA",BG:"BGR",BH:"BHR",BI:"BDI",BJ:"BEN",BN:"BRN",BO:"BOL",BR:"BRA",BS:"BHS",BT:"BTN",BW:"BWA",BY:"BLR",BZ:"BLZ",
  CA:"CAN",CD:"COD",CF:"CAF",CG:"COG",CH:"CHE",CI:"CIV",CK:"COK",CL:"CHL",CM:"CMR",CN:"CHN",CO:"COL",CR:"CRI",CU:"CUB",CV:"CPV",CY:"CYP",CZ:"CZE",
  DE:"DEU",DJ:"DJI",DK:"DNK",DM:"DMA",DO:"DOM",DZ:"DZA",
  EC:"ECU",EE:"EST",EG:"EGY",ER:"ERI",ES:"ESP",ET:"ETH",
  FI:"FIN",FJ:"FJI",FM:"FSM",FR:"FRA",
  GA:"GAB",GB:"GBR",GD:"GRD",GE:"GEO",GH:"GHA",GM:"GMB",GN:"GIN",GQ:"GNQ",GR:"GRC",GT:"GTM",GW:"GNB",GY:"GUY",
  HN:"HND",HR:"HRV",HT:"HTI",HU:"HUN",
  ID:"IDN",IE:"IRL",IL:"ISR",IN:"IND",IQ:"IRQ",IR:"IRN",IS:"ISL",IT:"ITA",
  JM:"JAM",JO:"JOR",JP:"JPN",
  KE:"KEN",KG:"KGZ",KH:"KHM",KI:"KIR",KM:"COM",KN:"KNA",KP:"PRK",KR:"KOR",KW:"KWT",KZ:"KAZ",
  LA:"LAO",LB:"LBN",LC:"LCA",LI:"LIE",LK:"LKA",LR:"LBR",LS:"LSO",LT:"LTU",LU:"LUX",LV:"LVA",LY:"LBY",
  MA:"MAR",MC:"MCO",MD:"MDA",ME:"MNE",MG:"MDG",MH:"MHL",MK:"MKD",ML:"MLI",MM:"MMR",MN:"MNG",MR:"MRT",MT:"MLT",MU:"MUS",MV:"MDV",MW:"MWI",MX:"MEX",MY:"MYS",MZ:"MOZ",
  NA:"NAM",NE:"NER",NG:"NGA",NI:"NIC",NL:"NLD",NO:"NOR",NP:"NPL",NR:"NRU",NZ:"NZL",
  OM:"OMN",
  PA:"PAN",PE:"PER",PG:"PNG",PH:"PHL",PK:"PAK",PL:"POL",PS:"PSE",PT:"PRT",PW:"PLW",PY:"PRY",
  QA:"QAT",
  RO:"ROU",RS:"SRB",RU:"RUS",RW:"RWA",
  SA:"SAU",SB:"SLB",SC:"SYC",SD:"SDN",SE:"SWE",SG:"SGP",SI:"SVN",SK:"SVK",SL:"SLE",SM:"SMR",SN:"SEN",SO:"SOM",SR:"SUR",SS:"SSD",ST:"STP",SV:"SLV",SY:"SYR",SZ:"SWZ",
  TD:"TCD",TG:"TGO",TH:"THA",TJ:"TJK",TL:"TLS",TM:"TKM",TN:"TUN",TO:"TON",TR:"TUR",TT:"TTO",TV:"TUV",TW:"TWN",TZ:"TZA",
  UA:"UKR",UG:"UGA",US:"USA",UY:"URY",UZ:"UZB",
  VA:"VAT",VC:"VCT",VE:"VEN",VN:"VNM",VU:"VUT",
  WS:"WSM",
  YE:"YEM",
  ZA:"ZAF",ZM:"ZMB",ZW:"ZWE",
};

const _nomesPaisesIntl = new Intl.DisplayNames(["pt"], { type: "region" });

const PAISES = CODIGOS_PAISES_ISO.map((codigo) => ({
  codigo,
  nome: _nomesPaisesIntl.of(codigo),
  sigla: ALPHA3_POR_ALPHA2[codigo] || codigo,
}));
