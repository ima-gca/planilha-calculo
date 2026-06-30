
"use strict";
// Dados embutidos. UFEMG: acrescente o ano novo aqui todo início de ano.
// Fonte: fazenda.mg.gov.br/empresas/legislacao_tributaria/resolucoes/ufemg.html
const UFEMG = {
  2005:1.6175, 2006:1.6528, 2007:1.708,  2008:1.8122, 2009:2.0349,
  2010:1.9991, 2011:2.1813, 2012:2.3291, 2013:2.5016, 2014:2.6382,
  2015:2.7229, 2016:3.0109, 2017:3.2514, 2018:3.2514, 2019:3.5932,
  2020:3.7116, 2021:3.944,  2022:4.7703, 2023:5.0369, 2024:5.2797,
  2025:5.531,  2026:5.7899
};
function anosUfemgDisponiveis(){
  const anos = Object.keys(UFEMG).sort();
  return `${anos[0]} a ${anos[anos.length - 1]}`;
}

const PARAMS = {
  multaAte30PorDia: 0.0015,
  multa31a60:       0.09,
  multaApos60:      0.12,
  leiteFracaoUfemg: 0.15
};

const FERIADOS_FIXOS = [
  "2008-03-21","2008-04-21","2008-05-01","2008-05-22","2008-09-07","2008-10-12","2008-11-02","2008-11-15","2008-12-25",
  "2009-01-01","2009-02-23","2009-02-24","2009-04-10","2009-04-21","2009-05-01","2009-06-11","2009-09-07","2009-10-12","2009-11-02","2009-11-15","2009-12-25",
  "2010-01-01","2010-02-15","2010-02-16","2010-04-02","2010-04-21","2010-05-01","2010-06-03","2010-09-07","2010-10-12","2010-11-02","2010-11-15","2010-12-25",
  "2011-01-01","2011-03-07","2011-03-08","2011-04-21","2011-04-22","2011-05-01","2011-06-23","2011-09-07","2011-10-12","2011-11-02","2011-11-15","2011-12-25",
  "2012-01-01","2012-02-20","2012-02-21","2012-04-06","2012-04-21","2012-05-01","2012-06-07","2012-09-07","2012-10-12","2012-11-02","2012-11-15","2012-12-25",
  "2013-01-01","2013-02-11","2013-02-12","2013-03-29","2013-04-21","2013-05-01","2013-05-30","2013-09-07","2013-10-12","2013-11-02","2013-11-15","2013-12-25",
  "2014-01-01","2014-03-03","2014-03-04","2014-04-18","2014-04-21","2014-05-01","2014-06-19","2014-09-07","2014-10-12","2014-11-02","2014-11-15","2014-12-25",
  "2015-01-01","2015-02-16","2015-02-17","2015-04-03","2015-04-21","2015-05-01","2015-06-04","2015-09-07","2015-10-12","2015-11-02","2015-11-15","2015-12-25",
  "2016-01-01","2016-02-08","2016-02-09","2016-03-25","2016-04-21","2016-05-01","2016-05-26","2016-09-07","2016-10-12","2016-11-02","2016-11-15","2016-12-25",
  "2017-01-01","2017-02-27","2017-02-28","2017-04-14","2017-04-21","2017-05-01","2017-06-15","2017-09-07","2017-10-12","2017-11-02","2017-11-15","2017-12-25",
  "2018-01-01","2018-02-12","2018-02-13","2018-03-30","2018-04-21","2018-05-01","2018-05-31","2018-09-07","2018-10-12","2018-11-02","2018-11-15","2018-12-25",
  "2019-01-01","2019-03-04","2019-03-05","2019-04-19","2019-04-21","2019-05-01","2019-06-20","2019-09-07","2019-10-12","2019-11-02","2019-11-15","2019-12-25",
  "2020-01-01","2020-02-24","2020-02-25","2020-04-10","2020-04-21","2020-05-01","2020-06-11","2020-09-07","2020-10-12","2020-11-02","2020-11-15","2020-12-25",
  "2021-01-01","2021-02-15","2021-02-16","2021-04-02","2021-04-21","2021-05-01","2021-06-03","2021-09-07","2021-10-12","2021-11-02","2021-11-15","2021-12-25",
  "2022-01-01","2022-02-28","2022-03-01","2022-04-15","2022-04-21","2022-05-01","2022-06-16","2022-09-07","2022-10-12","2022-11-02","2022-11-15","2022-12-25",
  "2023-01-01","2023-02-20","2023-02-21","2023-04-07","2023-04-21","2023-05-01","2023-06-08","2023-09-07","2023-10-12","2023-11-02","2023-11-15","2023-12-25",
  "2024-01-01","2024-02-12","2024-02-13","2024-03-29","2024-04-21","2024-05-01","2024-05-30","2024-09-07","2024-10-12","2024-11-02","2024-11-15","2024-12-25",
  "2025-01-01","2025-03-03","2025-03-04","2025-04-18","2025-04-21","2025-05-01","2025-06-19","2025-09-07","2025-10-12","2025-11-02","2025-11-15","2025-12-25",
  "2026-01-01","2026-02-16","2026-02-17","2026-04-03","2026-04-21","2026-05-01","2026-06-04","2026-09-07","2026-10-12","2026-11-02","2026-11-15","2026-12-25",
  "2027-01-01","2027-02-08","2027-02-09","2027-03-26","2027-04-21","2027-05-01","2027-05-27","2027-09-07","2027-10-12","2027-11-02","2027-11-15","2027-12-25",
  "2028-01-01","2028-02-28","2028-02-29","2028-04-14","2028-04-21","2028-05-01","2028-06-15","2028-09-07","2028-10-12","2028-11-02","2028-11-15","2028-12-25",
  "2029-01-01","2029-02-12","2029-02-13","2029-03-30","2029-04-21","2029-05-01","2029-05-31","2029-09-07","2029-10-12","2029-11-02","2029-11-15","2029-12-25",
  "2030-01-01","2030-03-04","2030-03-05","2030-04-19","2030-04-21","2030-05-01","2030-06-20","2030-09-07","2030-10-12","2030-11-02","2030-11-15","2030-12-25"
];

const SELIC_SNAPSHOT = {
  "2005-01":1.38,"2005-02":1.22,"2005-03":1.53,"2005-04":1.41,"2005-05":1.5,"2005-06":1.59,"2005-07":1.51,"2005-08":1.66,"2005-09":1.5,"2005-10":1.41,"2005-11":1.38,"2005-12":1.47,
  "2006-01":1.43,"2006-02":1.15,"2006-03":1.42,"2006-04":1.08,"2006-05":1.28,"2006-06":1.18,"2006-07":1.17,"2006-08":1.26,"2006-09":1.06,"2006-10":1.09,"2006-11":1.02,"2006-12":0.99,
  "2007-01":1.08,"2007-02":0.87,"2007-03":1.05,"2007-04":0.94,"2007-05":1.03,"2007-06":0.91,"2007-07":0.97,"2007-08":0.99,"2007-09":0.8,"2007-10":0.93,"2007-11":0.84,"2007-12":0.84,
  "2008-01":0.93,"2008-02":0.8,"2008-03":0.84,"2008-04":0.9,"2008-05":0.88,"2008-06":0.96,"2008-07":1.07,"2008-08":1.02,"2008-09":1.1,"2008-10":1.18,"2008-11":1.02,"2008-12":1.12,
  "2009-01":1.05,"2009-02":0.86,"2009-03":0.97,"2009-04":0.84,"2009-05":0.77,"2009-06":0.76,"2009-07":0.79,"2009-08":0.69,"2009-09":0.69,"2009-10":0.69,"2009-11":0.66,"2009-12":0.73,
  "2010-01":0.66,"2010-02":0.59,"2010-03":0.76,"2010-04":0.67,"2010-05":0.75,"2010-06":0.79,"2010-07":0.86,"2010-08":0.89,"2010-09":0.85,"2010-10":0.81,"2010-11":0.81,"2010-12":0.93,
  "2011-01":0.86,"2011-02":0.84,"2011-03":0.92,"2011-04":0.84,"2011-05":0.99,"2011-06":0.96,"2011-07":0.97,"2011-08":1.07,"2011-09":0.94,"2011-10":0.88,"2011-11":0.86,"2011-12":0.91,
  "2012-01":0.89,"2012-02":0.75,"2012-03":0.82,"2012-04":0.71,"2012-05":0.74,"2012-06":0.64,"2012-07":0.68,"2012-08":0.69,"2012-09":0.54,"2012-10":0.61,"2012-11":0.55,"2012-12":0.55,
  "2013-01":0.6,"2013-02":0.49,"2013-03":0.55,"2013-04":0.61,"2013-05":0.6,"2013-06":0.61,"2013-07":0.72,"2013-08":0.71,"2013-09":0.71,"2013-10":0.81,"2013-11":0.72,"2013-12":0.79,
  "2014-01":0.85,"2014-02":0.79,"2014-03":0.77,"2014-04":0.82,"2014-05":0.87,"2014-06":0.82,"2014-07":0.95,"2014-08":0.87,"2014-09":0.91,"2014-10":0.95,"2014-11":0.84,"2014-12":0.96,
  "2015-01":0.94,"2015-02":0.82,"2015-03":1.04,"2015-04":0.95,"2015-05":0.99,"2015-06":1.07,"2015-07":1.18,"2015-08":1.11,"2015-09":1.11,"2015-10":1.11,"2015-11":1.06,"2015-12":1.16,
  "2016-01":1.06,"2016-02":1.0,"2016-03":1.16,"2016-04":1.06,"2016-05":1.11,"2016-06":1.16,"2016-07":1.11,"2016-08":1.22,"2016-09":1.11,"2016-10":1.05,"2016-11":1.04,"2016-12":1.12,
  "2017-01":1.09,"2017-02":0.87,"2017-03":1.05,"2017-04":0.79,"2017-05":0.93,"2017-06":0.81,"2017-07":0.8,"2017-08":0.8,"2017-09":0.64,"2017-10":0.64,"2017-11":0.57,"2017-12":0.54,
  "2018-01":0.58,"2018-02":0.47,"2018-03":0.53,"2018-04":0.52,"2018-05":0.52,"2018-06":0.52,"2018-07":0.54,"2018-08":0.57,"2018-09":0.47,"2018-10":0.54,"2018-11":0.49,"2018-12":0.49,
  "2019-01":0.54,"2019-02":0.49,"2019-03":0.47,"2019-04":0.52,"2019-05":0.54,"2019-06":0.47,"2019-07":0.57,"2019-08":0.5,"2019-09":0.46,"2019-10":0.48,"2019-11":0.38,"2019-12":0.37,
  "2020-01":0.38,"2020-02":0.29,"2020-03":0.34,"2020-04":0.28,"2020-05":0.24,"2020-06":0.21,"2020-07":0.19,"2020-08":0.16,"2020-09":0.16,"2020-10":0.16,"2020-11":0.15,"2020-12":0.16,
  "2021-01":0.15,"2021-02":0.13,"2021-03":0.2,"2021-04":0.21,"2021-05":0.27,"2021-06":0.31,"2021-07":0.36,"2021-08":0.43,"2021-09":0.44,"2021-10":0.49,"2021-11":0.59,"2021-12":0.77,
  "2022-01":0.73,"2022-02":0.76,"2022-03":0.93,"2022-04":0.83,"2022-05":1.03,"2022-06":1.02,"2022-07":1.03,"2022-08":1.17,"2022-09":1.07,"2022-10":1.02,"2022-11":1.02,"2022-12":1.12,
  "2023-01":1.12,"2023-02":0.92,"2023-03":1.17,"2023-04":0.92,"2023-05":1.12,"2023-06":1.07,"2023-07":1.07,"2023-08":1.14,"2023-09":0.97,"2023-10":1.0,"2023-11":0.92,"2023-12":0.89,
  "2024-01":0.97,"2024-02":0.8,"2024-03":0.83,"2024-04":0.89,"2024-05":0.83,"2024-06":0.79,"2024-07":0.91,"2024-08":0.87,"2024-09":0.84,"2024-10":0.93,"2024-11":0.79,"2024-12":0.93,
  "2025-01":1.01,"2025-02":0.99,"2025-03":0.96,"2025-04":1.06,"2025-05":1.14,"2025-06":1.1,"2025-07":1.28,"2025-08":1.16,"2025-09":1.22,"2025-10":1.28,"2025-11":1.05,"2025-12":1.22,
  "2026-01":1.16,"2026-02":1.0,"2026-03":1.21,"2026-04":1.09,"2026-05":1.07,"2026-06":0.27
};

// Unidades administrativas do IMA
// TODO: confirmar lista completa com a GCA

const GERENCIAS_SEDE = [
  "GCA — Gerência de Controle da Arrecadação",
  "GCF — Gerência de Contabilidade e Finanças",
  "GDA — Gerência de Defesa Sanitária Animal",
  "GDV — Gerência de Defesa Sanitária Vegetal",
  "GIP — Gerência de Inspeção de Produtos de Origem Animal",
  "GIV — Gerência de Inspeção de Produtos de Origem Vegetal",
  "PRD — Procuradoria"
];

const UNIDADES_IMA = [
  "Escritório Regional de Belo Horizonte",
  "Escritório Regional de Uberlândia",
  "Escritório Regional de Uberaba",
  "Escritório Regional de Juiz de Fora",
  "Escritório Regional de Montes Claros",
  "Escritório Regional de Governador Valadares",
  "Escritório Regional de Divinópolis",
  "Escritório Regional de Varginha",
  "Escritório Regional de Poços de Caldas",
  "Escritório Regional de Pouso Alegre",
  "Escritório Regional de Teófilo Otoni",
  "Escritório Regional de Patos de Minas",
  "Escritório Local de Alfenas",
  "Escritório Local de Araguari",
  "Escritório Local de Araçuaí",
  "Escritório Local de Barbacena",
  "Escritório Local de Caratinga",
  "Escritório Local de Curvelo",
  "Escritório Local de Diamantina",
  "Escritório Local de Formiga",
  "Escritório Local de Ituiutaba",
  "Escritório Local de Janaúba",
  "Escritório Local de Januária",
  "Escritório Local de Lavras",
  "Escritório Local de Muriaé",
  "Escritório Local de Passos",
  "Escritório Local de Paracatu",
  "Escritório Local de Pirapora",
  "Escritório Local de São João del-Rei",
  "Escritório Local de Sete Lagoas",
  "Escritório Local de Unaí",
  "Escritório Local de Viçosa"
];

// =====================================================================
// Planilha de Cálculo IMA/GCA
// =====================================================================
const fmtBRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const fmtBRL6 = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 6, maximumFractionDigits: 6 });
const fmtBRLSmart = v => Math.round(v * 1e6) % 10000 === 0 ? fmtBRL.format(v) : fmtBRL6.format(v);
const fmtInt = new Intl.NumberFormat("pt-BR");

const hoje = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const iso = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const deISO = s => { const [a,m,d] = s.split("-").map(Number); return new Date(a, m-1, d); };
const dataBR = s => { const [a,m,d] = s.split("-"); return `${d}/${m}/${a}`; };
const MESES_EXTENSO = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const dataExtenso = s => { const [a,m,d] = s.split("-").map(Number); return `${d} de ${MESES_EXTENSO[m-1]} de ${a}`; };
const _PREP_MINUSCULAS = new Set(["de","da","do","das","dos","e"]);
const capitalizaNome = nome => nome.trim().split(/\s+/).map(p => {
  const min = p.toLowerCase();
  return _PREP_MINUSCULAS.has(min) ? min : min.charAt(0).toUpperCase() + min.slice(1);
}).join(" ");
const ymDe = s => s.slice(0,7);
const ymHoje = () => iso(hoje()).slice(0,7);
function addMes(ym, n){ let [a,m] = ym.split("-").map(Number); m += n;
  a += Math.floor((m-1)/12); m = ((m-1) % 12 + 12) % 12 + 1;
  return `${a}-${String(m).padStart(2,"0")}`; }
function diffMeses(ymA, ymB){ const [a1,m1]=ymA.split("-").map(Number), [a2,m2]=ymB.split("-").map(Number);
  return (a2-a1)*12 + (m2-m1); }
const diffDias = (dA, dB) => Math.round((dB - dA) / 86400000);
const mesAnoBR = ym => { const [a,m] = ym.split("-"); return `${m}/${a}`; };

// ---------- SELIC ----------
let SELIC = { ...SELIC_SNAPSHOT };
let selicOnline = false;

async function carregaSelic(){
  // Compõe a SELIC diária (série 11) em vez de usar a mensal (série 4390),
  // que vem arredondada demais e diverge do valor oficial da SEF-MG.
  try{
    const h = hoje();
    const anoAtual = h.getFullYear();
    const diasPorMes = {};
    for(let anoIni = 2000; anoIni <= anoAtual; anoIni += 9){
      const anoFim = Math.min(anoIni + 9, anoAtual);
      const dataInicial = `01/01/${anoIni}`;
      const dataFinal = anoFim === anoAtual
        ? `${String(h.getDate()).padStart(2,"0")}/${String(h.getMonth()+1).padStart(2,"0")}/${anoFim}`
        : `31/12/${anoFim}`;
      const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
      const r = await fetch(url);
      if(!r.ok) throw new Error(r.status);
      const lista = await r.json();
      for(const o of lista){
        const [d, m, a] = o.data.split("/");
        const ym = `${a}-${m}`;
        (diasPorMes[ym] = diasPorMes[ym] || []).push(parseFloat(o.valor));
      }
    }
    const novo = {};
    for(const ym in diasPorMes){
      const fator = diasPorMes[ym].reduce((acc, v) => acc * (1 + v / 100), 1);
      novo[ym] = (fator - 1) * 100;
    }
    if(Object.keys(novo).length < 100) throw new Error("retorno inesperado");
    SELIC = novo; selicOnline = true;
  }catch(e){ selicOnline = false; }
  pintaStatusSelic(); montaTabelasRef();
}

function selicMes(ym){
  if(ym >= ymHoje()) return null;
  return (ym in SELIC) ? SELIC[ym] : null;
}

function somaIndice(ymBase, ymAtualizacao){
  let soma = 0;
  for(let m = addMes(ymBase,1); m < ymAtualizacao; m = addMes(m,1)){
    const v = selicMes(m);
    soma += (v === null ? 1 : v);
  }
  return soma + 1;
}

// ---------- feriados / dias úteis ----------
const FERIADOS = new Set(FERIADOS_FIXOS);
const FERIADOS_NOMES = new Map();

// nomes dos feriados de data fixa (fallback offline)
const _NOMES_FIXOS = {
  "01-01":"Ano Novo","04-21":"Tiradentes","05-01":"Dia do Trabalho",
  "09-07":"Independência do Brasil","10-12":"Nossa Senhora Aparecida",
  "11-02":"Finados","11-15":"Proclamação da República","12-25":"Natal"
};

async function carregaFeriadosBrasil(){
  const anoAtual = hoje().getFullYear();
  for(const ano of [anoAtual, anoAtual + 1, anoAtual + 2]){
    try{
      const r = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
      if(!r.ok) continue;
      const lista = await r.json();
      for(const f of lista){
        FERIADOS.add(f.date);
        FERIADOS_NOMES.set(f.date, f.name);
      }
    }catch(e){}
  }
  _exibeFeriados();
}

function _nomeFeriado(iso){
  return FERIADOS_NOMES.get(iso) || _NOMES_FIXOS[iso.slice(5)] || "";
}

function _exibeFeriados(){
  const hISO = iso(hoje());
  const proximos = [...FERIADOS].filter(f => f >= hISO).sort().slice(0, 6);
  const linhas = proximos.map(f => {
    const nome = _nomeFeriado(f);
    return dataBR(f) + (nome ? " &mdash; " + nome : "");
  });
  const el = document.getElementById("info-feriados");
  if(el) el.innerHTML = "Próximos:<br>" + linhas.join("<br>");
}

const diaUtil = d => d.getDay() !== 0 && d.getDay() !== 6 && !FERIADOS.has(iso(d));
function validadePorDias(dias){
  const d = hoje(); d.setDate(d.getDate() + Number(dias));
  const alvo = iso(d);
  while(!diaUtil(d)) d.setDate(d.getDate() - 1);
  return { data: iso(d), ajustada: iso(d) !== alvo };
}
function mostraValidade(prefixo){
  const dias = document.getElementById(`${prefixo}-dias`).value;
  const alvo = document.getElementById(`${prefixo}-validade`);
  if(dias === "" || Number(dias) < 0){ alvo.textContent = ""; return; }
  const v = validadePorDias(dias);
  alvo.textContent = `Val.: ${dataBR(v.data)}` + (v.ajustada ? " (*data ajustada para dia útil*)" : "");
}

// ---------- CPF / MASP ----------
function validaCPF(cpf){
  if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let s = 0;
  for(let i=0; i<9; i++) s += +cpf[i] * (10-i);
  let d1 = 11 - s%11; if(d1>=10) d1=0;
  if(d1 !== +cpf[9]) return false;
  s = 0;
  for(let i=0; i<10; i++) s += +cpf[i] * (11-i);
  let d2 = 11 - s%11; if(d2>=10) d2=0;
  return d2 === +cpf[10];
}

function validaIdentificador(input){
  const n = input.value.replace(/\D/g,"");
  const hint = document.getElementById("em-masp-hint");
  if(!n){ hint.textContent=""; hint.className=""; return; }
  if(n.length === 11){
    if(validaCPF(n)){ hint.textContent="CPF válido"; hint.className="hint-ok"; }
    else { hint.textContent="CPF inválido — verifique os dígitos"; hint.className="hint-erro"; }
  } else {
    hint.textContent = n.length <= 8 ? "MASP" : "";
    hint.className = n.length <= 8 ? "hint-ok" : "";
  }
}

function maspFormatado(s){
  const n = s.replace(/\D/g,"");
  if(n.length === 11) return `${n.slice(0,3)}.${n.slice(3,6)}.${n.slice(6,9)}-${n.slice(9,11)}`;
  if(n.length > 1) return `${n.slice(0,-1)}-${n.slice(-1)}`;
  return n;
}

// ---------- emissor(es) ----------
const CHAVE_EMISSOR = "pc_emissor_v1";
const CHAVE_EMISSORES = "pc_emissores_v1";
const CHAVE_EMISSOR_ATIVO = "pc_emissor_ativo_v1";
function _migraEmissorAntigo(){
  if(localStorage.getItem(CHAVE_EMISSORES)) return;
  try{
    const e = JSON.parse(localStorage.getItem(CHAVE_EMISSOR));
    if(e && e.masp){
      localStorage.setItem(CHAVE_EMISSORES, JSON.stringify([e]));
      localStorage.setItem(CHAVE_EMISSOR_ATIVO, e.masp);
    }
  }catch(err){}
  localStorage.removeItem(CHAVE_EMISSOR);
}
function _uaValida(ua, local){
  if([...GERENCIAS_SEDE, ...UNIDADES_IMA].includes(ua)) return true;
  const info = _MAPA_UPPER[(local || "").trim().toUpperCase()];
  return !!info && (ua === info.esec || ua === info.cr);
}
function listaEmissores(){
  let lista;
  try{ lista = JSON.parse(localStorage.getItem(CHAVE_EMISSORES)) || []; }catch(err){ lista = []; }
  const validos = lista.filter(e => _uaValida(e.ua, e.local));
  if(validos.length !== lista.length) localStorage.setItem(CHAVE_EMISSORES, JSON.stringify(validos));
  return validos;
}
function emissor(){
  const lista = listaEmissores();
  if(!lista.length) return null;
  const ativo = localStorage.getItem(CHAVE_EMISSOR_ATIVO);
  return lista.find(e => e.masp === ativo) || lista[0];
}
const abreviaUA = ua => ua.includes(" — ") ? ua.split(" — ")[0] : ua;
// na impressão, gerências (armazenadas como "SIGLA — Nome") saem como "Nome — SIGLA"
const formataUAImpressao = ua => ua.includes(" — ") ? ua.split(" — ").reverse().join(" — ") : ua;
const primeiroNome = nome => capitalizaNome(nome).split(" ")[0];
// primeiros 2 nomes (inclui o 3º se o 2º for preposição, ex.: "Maria de Fátima")
function doisPrimeirosNomes(nome){
  const partes = capitalizaNome(nome).split(" ");
  let fim = Math.min(2, partes.length);
  while(fim < partes.length && _PREP_MINUSCULAS.has(partes[fim - 1].toLowerCase())) fim++;
  return partes.slice(0, fim).join(" ");
}
// abrevia sobrenomes do meio (mantém primeiro nome e último sobrenome completos)
function abreviaNomeMeio(nome){
  const partes = capitalizaNome(nome).split(" ");
  if(partes.length <= 2) return partes.join(" ");
  return partes.map((p, i) => {
    if(i === 0 || i === partes.length - 1) return p;
    if(_PREP_MINUSCULAS.has(p.toLowerCase())) return p;
    return p.charAt(0) + ".";
  }).join(" ");
}
function pintaChip(){
  const e = emissor();
  document.getElementById("chipNome").textContent = e ? abreviaNomeMeio(e.nome) : "Identificar emissor";
  document.getElementById("chipMunicipio").textContent = e ? capitalizaNome(e.local) : "clique para preencher";
  document.getElementById("chipUA").textContent = e ? abreviaUA(e.ua) : "";
  const bv = document.getElementById("boasvindas");
  if(bv) bv.textContent = e ? `Bem-vindo(a), ${doisPrimeirosNomes(e.nome)}` : "Bem-vindo(a) à Planilha de Cálculo";
}
function preencheCamposEmissor(e){
  document.getElementById("em-masp").value = e.masp || "";
  document.getElementById("em-nome").value = e.nome || "";
  document.getElementById("em-local").value = e.local || "";
  document.getElementById("em-masp-hint").textContent = "";
  if(e.local){
    filtraUA(e.local);
  } else {
    document.getElementById("em-ua").disabled = true;
    document.getElementById("em-ua").placeholder = "Selecione o município primeiro…";
    document.getElementById("ua-hint").textContent = "";
  }
  document.getElementById("em-ua").value = e.ua || "";
  document.getElementById("erro-em").style.display = "none";
}
function limpaCamposEmissor(){
  preencheCamposEmissor({});
}
function selecionaEmissor(masp){
  if(masp === "__novo__"){ limpaCamposEmissor(); return; }
  const e = listaEmissores().find(x => x.masp === masp);
  if(e) preencheCamposEmissor(e);
}
function abreModalEmissor(){
  const lista = listaEmissores();
  const ativo = emissor();
  const sel = document.getElementById("em-selecionar");
  const campoSel = document.getElementById("em-campo-selecionar");
  if(lista.length){
    sel.innerHTML = lista.map(e => `<option value="${e.masp}">${e.nome}</option>`).join("") +
      `<option value="__novo__">+ Novo emissor</option>`;
    sel.value = ativo ? ativo.masp : "__novo__";
    campoSel.style.display = "flex";
  } else {
    sel.innerHTML = "";
    campoSel.style.display = "none";
  }
  preencheCamposEmissor(ativo || {});
  document.getElementById("modalEmissor").classList.add("aberto");
}
function salvaEmissor(){
  const masp = document.getElementById("em-masp").value.replace(/\D/g,"");
  const nome = document.getElementById("em-nome").value.trim();
  const ua = document.getElementById("em-ua").value.trim();
  const local = document.getElementById("em-local").value.trim();
  const erro = document.getElementById("erro-em");

  if(!masp || !nome || !ua || !local){
    erro.textContent = "Preencha todos os campos obrigatórios.";
    erro.style.display = "block"; return;
  }
  if(masp.length === 11 && !validaCPF(masp)){
    erro.textContent = "CPF inválido — verifique os dígitos.";
    erro.style.display = "block"; return;
  }
  const novo = { masp, nome: capitalizaNome(nome), ua, local: capitalizaNome(local) };
  const jaExistia = listaEmissores().some(e => e.masp === masp);
  const lista = listaEmissores().filter(e => e.masp !== masp);
  lista.push(novo);
  localStorage.setItem(CHAVE_EMISSORES, JSON.stringify(lista));
  localStorage.setItem(CHAVE_EMISSOR_ATIVO, masp);
  erro.style.display = "none";
  document.getElementById("modalEmissor").classList.remove("aberto");
  pintaChip();
  if(!jaExistia){
    document.getElementById("popup-bv-titulo").textContent = `Bem-vindo(a), ${doisPrimeirosNomes(novo.nome)}`;
    document.getElementById("popup-boasvindas").classList.add("aberto");
  }
}

// ---------- municípios e unidades ----------
async function carregaMunicipiosMG(){
  const status = document.getElementById("municipios-status");
  try{
    const r = await fetch("https://brasilapi.com.br/api/ibge/municipios/v1/MG");
    if(!r.ok) throw new Error();
    const lista = await r.json();
    const dl = document.getElementById("lista-municipios-mg");
    dl.innerHTML = lista.map(m => `<option value="${m.nome}">`).join("");
    status.textContent = `${lista.length} municípios carregados`;
    setTimeout(()=>{ status.textContent=""; }, 3000);
  }catch(e){
    status.textContent = "Lista offline — digite o município manualmente";
  }
}

function populaUnidades(){
  const dl = document.getElementById("lista-ua");
  dl.innerHTML = [...GERENCIAS_SEDE, ...UNIDADES_IMA].map(u => `<option value="${u}">`).join("");
}

// índice case-insensitive construído uma vez
const _MAPA_UPPER = Object.fromEntries(
  Object.entries(MAPA_MUN_UA).map(([k,v]) => [k.toUpperCase(), v])
);

function filtraUA(mun){
  const uaEl = document.getElementById("em-ua");
  const dl   = document.getElementById("lista-ua");
  const hint = document.getElementById("ua-hint");
  const ehSede = mun.trim().toUpperCase() === "BELO HORIZONTE";
  const info = _MAPA_UPPER[mun.trim().toUpperCase()];
  if(info){
    const opcoes = ehSede ? [info.esec, info.cr, ...GERENCIAS_SEDE] : [info.esec, info.cr];
    dl.innerHTML = opcoes.map(u => `<option value="${u}">`).join("");
    hint.textContent = ehSede ? `${info.esec} · ${info.cr} · Gerências da Sede` : `${info.esec} · ${info.cr}`;
    uaEl.disabled = false;
    uaEl.placeholder = "Digite ou selecione…";
  } else {
    dl.innerHTML = [...GERENCIAS_SEDE, ...UNIDADES_IMA].map(u => `<option value="${u}">`).join("");
    hint.textContent = "";
    uaEl.disabled = true;
    uaEl.value = "";
    uaEl.placeholder = "Selecione o município primeiro…";
  }
}

// ---------- infra de telas ----------
function trocaAba(id){
  document.querySelectorAll("section.aba").forEach(s => s.classList.remove("ativa"));
  document.getElementById(`aba-${id}`).classList.add("ativa");
  document.querySelectorAll("nav.abas button").forEach(b => b.classList.toggle("ativa", b.dataset.aba === id));
}
function mostraErro(aba, texto){
  const el = document.getElementById(`erro-${aba}`);
  el.textContent = texto; el.style.display = texto ? "block" : "none";
}
function mostraAviso(aba, texto){
  const el = document.getElementById(`aviso-${aba}`);
  if(el){ el.textContent = texto; el.style.display = texto ? "block" : "none"; }
}
function limpaAba(aba){
  document.getElementById(`form-${aba}`).reset();
  if(aba === "ai") document.getElementById("ai-atual").value = iso(hoje());
  document.querySelector(`#${aba}-tabela tbody`).innerHTML = "";
  document.getElementById(`${aba}-res-cartao`).style.display = "none";
  mostraErro(aba, ""); mostraAviso(aba, "");
  linhas[aba] = [];
}
const DATA_MINIMA = "2010-01-01";
const MES_MINIMO = "2010-01";
const ANO_MINIMO = 2010;
// só valida quando o ano já tem 4 dígitos significativos — evita disparo a
// cada tecla enquanto o usuário digita o ano (ex.: "2", "20", "202" no <input type=date>)
const _anoPleno = s => !!s && Number(s.slice(0,4)) >= 1000;
function validaDataFutura(el, aba){
  if(_anoPleno(el.value) && el.value > iso(hoje())){
    el.value = "";
    mostraErro(aba, "Não é permitido informar data posterior à data atual. O campo foi limpo.");
  }
}
function validaDataMinima(el, aba){
  if(_anoPleno(el.value) && el.value < DATA_MINIMA){
    el.value = "";
    mostraErro(aba, "Não é permitido informar data anterior a 2010. O campo foi limpo.");
  }
}
function validaAnoFuturo(el, aba){
  if(el.value && Number(el.value) > hoje().getFullYear()){
    el.value = "";
    mostraErro(aba, "Não é permitido informar ano posterior ao ano atual. O campo foi limpo.");
  }
}
function validaAnoMinimo(el, aba){
  if(el.value && el.value.length >= 4 && Number(el.value) < ANO_MINIMO){
    el.value = "";
    mostraErro(aba, "Não é permitido informar ano anterior a 2010. O campo foi limpo.");
  }
}
function validaMesFuturo(el, aba){
  if(_anoPleno(el.value) && el.value >= ymHoje()){
    el.value = "";
    mostraErro(aba, "Não é permitido informar mês/ano igual ou posterior ao mês atual. O campo foi limpo.");
  }
}
function validaMesMinimo(el, aba){
  if(_anoPleno(el.value) && el.value < MES_MINIMO){
    el.value = "";
    mostraErro(aba, "Não é permitido informar mês/ano anterior a 2010. O campo foi limpo.");
  }
}
function validaVsAnoEmissao(el, aba){
  const ano = document.getElementById("ai-ano").value.trim();
  if(!ano || !_anoPleno(el.value)) return;
  const anoData = Number(el.value.slice(0,4));
  if(anoData < Number(ano)){
    el.value = "";
    mostraErro(aba, "A data não pode ser anterior ao Ano de Emissão. O campo foi limpo.");
  } else if(anoData === Number(ano)){
    mostraAviso(aba, "A data informada é do mesmo ano do Ano de Emissão — confirme se é posterior à emissão do A.I.");
  }
}
function validaAtualVsNotif(){
  const notif = document.getElementById("ai-notif").value;
  const atualEl = document.getElementById("ai-atual");
  if(_anoPleno(notif) && _anoPleno(atualEl.value) && atualEl.value < notif){
    atualEl.value = "";
    mostraErro("ai", "A Data de Atualização não pode ser anterior à Data de Notificação. O campo foi limpo.");
  }
}
function validaCampoNotif(el){
  mostraErro("ai", ""); mostraAviso("ai", "");
  validaDataFutura(el, "ai");
  validaDataMinima(el, "ai");
  validaVsAnoEmissao(el, "ai");
  validaAtualVsNotif();
}
function validaCampoAtual(el){
  mostraErro("ai", ""); mostraAviso("ai", "");
  validaDataFutura(el, "ai");
  validaDataMinima(el, "ai");
  validaVsAnoEmissao(el, "ai");
  validaAtualVsNotif();
}
function validaCampoMesLT(el){
  mostraErro("lt", "");
  validaMesFuturo(el, "lt");
  validaMesMinimo(el, "lt");
}
function validaNaoFimDeSemana(el, aba){
  if(_anoPleno(el.value)){
    const dia = deISO(el.value).getDay();
    if(dia === 0 || dia === 6){
      el.value = "";
      mostraErro(aba, "A validade não pode cair em um final de semana. O campo foi limpo.");
    }
  }
}
function validaCampoValidadeLT(el){
  mostraErro("lt", "");
  validaDataMinima(el, "lt");
  validaNaoFimDeSemana(el, "lt");
}
function validaCampoValidadeOrigDAE(el){
  mostraErro("dae", "");
  validaDataFutura(el, "dae");
  validaDataMinima(el, "dae");
}
function validaCampoValidadeNovaDAE(el){
  mostraErro("dae", "");
  validaDataMinima(el, "dae");
  validaNaoFimDeSemana(el, "dae");
}
function limpaDatasAI(){
  const ano = document.getElementById("ai-ano").value.trim();
  const notifPreenchida = document.getElementById("ai-notif").value;
  document.getElementById("ai-notif").value = "";
  document.getElementById("ai-atual").value = iso(hoje());
  const minAno = ano ? `${ano}-01-01` : DATA_MINIMA;
  document.getElementById("ai-notif").min = minAno;
  document.getElementById("ai-atual").min = minAno;
  mostraErro("ai", "");
  mostraAviso("ai", (ano && notifPreenchida) ? "O Ano de Emissão foi alterado: redigite a Data de Notificação." : "");
}
const linhas = { ai: [], lt: [], dae: [] };
const pct = v => v.toFixed(6).replace(".", ",") + "%";

// =====================================================================
// AUTO DE INFRAÇÃO
// =====================================================================
function calculaAI(ev){
  ev.preventDefault(); mostraErro("ai",""); mostraAviso("ai","");
  const valor = Number(document.getElementById("ai-valor").value);
  const tipo = document.getElementById("ai-tipo").value;
  let ano = document.getElementById("ai-ano").value.trim();
  const notifISO = document.getElementById("ai-notif").value;
  const atualISO = document.getElementById("ai-atual").value;
  const h = iso(hoje());

  if(!(valor > 0)) return mostraErro("ai","Digite um Valor Original maior que zero."), false;
  if(notifISO < DATA_MINIMA) return mostraErro("ai","Data de Notificação não pode ser anterior a 2010."), false;
  if(notifISO > h) return mostraErro("ai","A Data de Notificação não pode ser posterior à data atual."), false;
  if(atualISO > h) return mostraErro("ai","A Data de Atualização não pode ser posterior à data de hoje."), false;
  if(atualISO < notifISO) return mostraErro("ai","A Data de Atualização não pode ser anterior à Data de Notificação."), false;

  let anoUfemg = null, valorConvertido = valor, subConversao = "Valor Original já foi informado em Reais";
  if(tipo === "UFEMG"){
    if(ano){
      if(ano.length === 2) ano = "20" + ano;
      if(ano.length !== 4 || isNaN(Number(ano))) return mostraErro("ai","O Ano de Emissão deve ter 4 dígitos (ex.: 2023)."), false;
      if(Number(ano) > hoje().getFullYear()) return mostraErro("ai",`O Ano de Emissão (${ano}) não pode ser maior que o ano atual.`), false;
      if(Number(notifISO.slice(0,4)) < Number(ano)) return mostraErro("ai","A Data de Notificação não pode ser anterior ao Ano de Emissão."), false;
      anoUfemg = Number(ano);
    } else {
      anoUfemg = Number(notifISO.slice(0,4));
    }
    const u = UFEMG[anoUfemg];
    if(u === undefined) return mostraErro("ai",`Não há UFEMG cadastrada para o ano ${anoUfemg}. Anos disponíveis: ${anosUfemgDisponiveis()}.`), false;
    valorConvertido = valor * u;
    subConversao = `Valor convertido em Reais pela UFEMG ${anoUfemg} (R$ ${u.toFixed(4).replace(".",",")})`;
  }

  const ymN = ymDe(notifISO), ymA = ymDe(atualISO);
  const meses = diffMeses(ymN, ymA);
  let indice = null, correcao = 0;
  if(meses >= 1){ indice = somaIndice(ymN, ymA); correcao = valorConvertido * indice / 100; }
  const atualizado = valorConvertido + correcao;
  if(ymA < ymHoje()) mostraAviso("ai","Cálculo retroativo aplicado: o resultado equivale ao preenchimento na data informada.");

  const linha = { valor, tipo, anoUfemg, anoExplicito: !!ano, notifISO, atualISO, valorConvertido, subConversao, meses, indice, correcao, atualizado, emitidoISO: iso(hoje()) };
  linhas.ai.push(linha);
  const idx_ai = linhas.ai.length - 1;
  const tb = document.querySelector("#ai-tabela tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td class="dinheiro">${tipo==="REAL" ? fmtBRLSmart(valor) : fmtInt.format(valor)+" UFEMG"}</td>
    <td>${tipo}</td><td>${anoUfemg ?? "—"}</td><td>${dataBR(notifISO)}</td><td>${dataBR(atualISO)}</td>
    <td class="dinheiro">${fmtBRLSmart(valorConvertido)}</td><td>${indice===null ? "—" : pct(indice)}</td>
    <td class="dinheiro">${indice===null ? "—" : fmtBRLSmart(correcao)}</td>
    <td class="dinheiro"><b>${fmtBRL.format(atualizado)}</b></td>
    <td>${dataBR(linha.emitidoISO)}</td>
    <td style="white-space:nowrap"><button class="mini" onclick="imprimeAI(${idx_ai})">🖨</button> <button class="mini apaga" onclick="apagaLinha('ai',${idx_ai},this)" title="Apagar">✕</button></td>`;
  tb.appendChild(tr);
  document.getElementById("ai-res-cartao").style.display = "block";
  return false;
}

function apagaLinha(tipo, idx, btn){
  linhas[tipo][idx] = null;
  const tr = btn.closest("tr");
  const tb = tr.parentElement;
  tr.remove();
  if(!tb.children.length){
    const ids = {ai:"ai-res-cartao", lt:"lt-res-cartao", dae:"dae-res-cartao"};
    document.getElementById(ids[tipo]).style.display = "none";
  }
}

function imprimeAI(i){
  const r = linhas.ai[i];
  if(!r) return;
  const dtIniIndice = r.meses >= 1 ? dataBR(addMes(ymDe(r.notifISO),1) + "-01") : null;
  const semCorrecao = "Não há correção no mesmo mês da Notificação";
  imprimeDocumento(
    "AUTO DE INFRAÇÃO — Crédito Não Tributário (correção monetária pela taxa SELIC)",
    [
      { t:"Valor Original",
        s: r.tipo==="REAL" ? "Tipo de valor: REAL (R$)" :
           r.anoExplicito ? `Tipo de valor: Vide A.I. — UFEMG (${r.anoUfemg})` :
                            `Tipo de valor: UFEMG (${r.anoUfemg})`,
        v: r.tipo==="REAL" ? fmtBRLSmart(r.valor) : fmtInt.format(r.valor) + " UFEMG" },
      { t:"Valor de Cálculo", s:r.subConversao, v: fmtBRLSmart(r.valorConvertido) },
      { t:"Data da Notificação", s:"Data em que o crédito tornou-se exigível - DEC 46668/14", v: dataBR(r.notifISO) },
      { t:"Data Inicial do Índice de Correção", s: r.indice===null ? semCorrecao : "Primeiro dia do mês seguinte à Data de Notificação", v: r.indice===null ? "—" : dtIniIndice },
      { t:"Data Final do Índice de Correção", s: r.indice===null ? semCorrecao : "Data informada. Poderá divergir da data de emissão desta Planilha", v: r.indice===null ? "—" : dataBR(r.atualISO) },
      { t:"Índice de Correção", s: r.indice===null ? semCorrecao : `SELIC acumulada: ${mesAnoBR(addMes(ymDe(r.notifISO),1))} a ${mesAnoBR(ymDe(r.atualISO))}`, v: r.indice===null ? "—" : pct(r.indice) },
      { t:"Valor Correção", s: r.indice===null ? semCorrecao : "Valor de Cálculo × Índice de Correção", v: r.indice===null ? "—" : fmtBRLSmart(r.correcao) },
      { t:"VALOR ATUALIZADO", s: r.indice===null ? "Valor de Cálculo (sem correção)" : "Valor de Cálculo + Valor Correção", v: fmtBRL.format(r.atualizado), destaque:true },
    ]);
}

// =====================================================================
// CAPTAÇÃO DE LEITE
// =====================================================================
function calculaLT(ev){
  ev.preventDefault(); mostraErro("lt","");
  const mesano = document.getElementById("lt-mesano").value;
  const litros = Number(document.getElementById("lt-litros").value);
  const validadeISO = document.getElementById("lt-validade").value;

  if(!mesano || !(litros > 0) || !validadeISO) return mostraErro("lt","Preencha Mês/Ano, Litros e Validade do DAE."), false;
  if(mesano < MES_MINIMO) return mostraErro("lt","Mês/Ano de Captação não pode ser anterior a 2010."), false;
  if(mesano >= ymHoje()) return mostraErro("lt","Mês/Ano de Captação não pode ser maior nem igual ao mês atual."), false;
  if(validadeISO < DATA_MINIMA) return mostraErro("lt","Validade do DAE não pode ser anterior a 2010."), false;
  if([0,6].includes(deISO(validadeISO).getDay())) return mostraErro("lt","A validade não pode cair em um final de semana."), false;

  const ymVenc = addMes(mesano, 1);
  const vencISO = ymVenc + "-15";
  const anoUfemg = Number(ymVenc.slice(0,4));
  const u = UFEMG[anoUfemg];
  if(u === undefined) return mostraErro("lt",`Não há UFEMG cadastrada para o ano ${anoUfemg}. Anos disponíveis: ${anosUfemgDisponiveis()}.`), false;

  const valorCaptacao = Math.round((litros * (u * PARAMS.leiteFracaoUfemg) / 1000) * 1e6) / 1e6;
  const atraso = diffDias(deISO(vencISO), deISO(validadeISO));
  const ymVal = ymDe(validadeISO);

  let multaRotulo = "—", multaValor = 0, indice = null, correcao = 0;
  if(atraso > 0){
    if(atraso < 31){ multaRotulo = "0,15%/dia"; multaValor = PARAMS.multaAte30PorDia * atraso * valorCaptacao; }
    else if(atraso <= 60){ multaRotulo = "9%"; multaValor = PARAMS.multa31a60 * valorCaptacao; }
    else { multaRotulo = "12%"; multaValor = PARAMS.multaApos60 * valorCaptacao; }
    if(!(atraso < 31 && ymVal === ymVenc)){
      indice = somaIndice(ymVenc, ymVal);
      correcao = (valorCaptacao + multaValor) * indice / 100;
    }
  }
  const atualizado = valorCaptacao + multaValor + correcao;

  const linha = { mesano, litros, validadeISO, vencISO, anoUfemg, ufemgValor:u, valorCaptacao, atraso, multaRotulo, multaValor, indice, correcao, atualizado, emitidoISO: iso(hoje()) };
  linhas.lt.push(linha);
  const idx_lt = linhas.lt.length - 1;
  const tb = document.querySelector("#lt-tabela tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${mesAnoBR(mesano)}</td><td>${fmtInt.format(litros)}</td><td>${dataBR(validadeISO)}</td>
    <td class="dinheiro">${fmtBRLSmart(valorCaptacao)}</td><td>${atraso > 0 ? atraso : 0}</td>
    <td>${atraso > 0 ? multaRotulo : "—"}</td><td class="dinheiro">${atraso > 0 ? fmtBRLSmart(multaValor) : "—"}</td>
    <td>${indice===null ? "—" : pct(indice)}</td><td class="dinheiro">${indice===null ? "—" : fmtBRLSmart(correcao)}</td>
    <td class="dinheiro"><b>${fmtBRL.format(atualizado)}</b></td>
    <td>${dataBR(linha.emitidoISO)}</td>
    <td style="white-space:nowrap"><button class="mini" onclick="imprimeLT(${idx_lt})">🖨</button> <button class="mini apaga" onclick="apagaLinha('lt',${idx_lt},this)" title="Apagar">✕</button></td>`;
  tb.appendChild(tr);
  document.getElementById("lt-res-cartao").style.display = "block";
  return false;
}

function imprimeLT(i){
  const r = linhas.lt[i];
  if(!r) return;
  const semCor = "Não há correção no mês seguinte à captação";
  imprimeDocumento(
    "CAPTAÇÃO DE LEITE — Crédito Tributário (multa + correção monetária pela taxa SELIC)",
    [
      { t:"Mês/Ano da Captação", s:"", v: mesAnoBR(r.mesano) },
      { t:"Data de Atualização do Valor", s:"", v: dataBR(r.validadeISO) },
      { t:"Quantidade de litros informada", s:"", v: fmtInt.format(r.litros) },
      { t:"Valor da Captação", s:`${PARAMS.leiteFracaoUfemg.toString().replace(".",",")} UFEMG (${r.anoUfemg}) por MIL litros ou fração`, v: fmtBRLSmart(r.valorCaptacao) },
      { t:"Valor da Multa", s: r.atraso > 0 ? `Atraso: ${r.atraso} dias = ${r.multaRotulo}` : `No prazo até ${dataBR(r.vencISO)}`, v: r.atraso > 0 ? fmtBRLSmart(r.multaValor) : "—" },
      { t:"Índice de Correção", s: r.indice===null ? semCor : `Período: ${dataBR(r.vencISO)} a ${dataBR(r.validadeISO)}`, v: r.indice===null ? "—" : pct(r.indice) },
      { t:"Valor Correção", s: r.indice===null ? semCor : "(Valor da Captação + Valor da Multa) × Índice de Correção", v: r.indice===null ? "—" : fmtBRLSmart(r.correcao) },
      { t:"VALOR ATUALIZADO", s:"Valor da Captação + Valor da Multa + Valor Correção", v: fmtBRL.format(r.atualizado), destaque:true },
    ]);
}

// =====================================================================
// ATUALIZAÇÃO DE DAE
// =====================================================================
function calculaDAE(ev){
  ev.preventDefault(); mostraErro("dae","");
  const valor = Number(document.getElementById("dae-valor").value);
  const origISO = document.getElementById("dae-validade-orig").value;
  const novaISO = document.getElementById("dae-validade-nova").value;
  const h = iso(hoje());

  if(!(valor > 0)) return mostraErro("dae","Digite um valor maior que 0 (zero)."), false;
  if(origISO < DATA_MINIMA) return mostraErro("dae","Validade do DAE devido não pode ser anterior a 2010."), false;
  if(origISO > h) return mostraErro("dae","A validade do DAE devido deve ser menor ou igual a hoje."), false;
  if(novaISO < DATA_MINIMA) return mostraErro("dae","Validade do NOVO DAE não pode ser anterior a 2010."), false;
  if(novaISO < h) return mostraErro("dae","A validade do NOVO DAE deve ser maior ou igual a hoje."), false;
  if([0,6].includes(deISO(novaISO).getDay())) return mostraErro("dae","A validade do NOVO DAE não pode cair em um final de semana."), false;
  if(origISO === novaISO) return mostraErro("dae","Validade do NOVO DAE não pode ser a mesma do DAE DEVIDO."), false;

  const atraso = diffDias(deISO(origISO), deISO(novaISO));
  const ymO = ymDe(origISO), ymN = ymDe(novaISO);
  let multaRotulo = "—", multaValor = 0, indice = null, correcao = 0;
  if(atraso > 0){
    if(atraso < 31){ multaRotulo = "0,15%/dia"; multaValor = PARAMS.multaAte30PorDia * atraso * valor; }
    else if(atraso <= 60){ multaRotulo = "9%"; multaValor = PARAMS.multa31a60 * valor; }
    else { multaRotulo = "12%"; multaValor = PARAMS.multaApos60 * valor; }
    if(ymO !== ymN){ indice = somaIndice(ymO, ymN); correcao = (valor + multaValor) * indice / 100; }
  }
  const atualizado = valor + multaValor + correcao;

  const linha = { valor, origISO, novaISO, atraso, multaRotulo, multaValor, indice, correcao, atualizado, emitidoISO: iso(hoje()) };
  linhas.dae.push(linha);
  const idx_dae = linhas.dae.length - 1;
  const tb = document.querySelector("#dae-tabela tbody");
  const tr = document.createElement("tr");
  tr.innerHTML = `<td class="dinheiro">${fmtBRLSmart(valor)}</td><td>${dataBR(origISO)}</td><td>${dataBR(novaISO)}</td>
    <td>${atraso > 0 ? atraso : 0}</td><td>${atraso > 0 ? multaRotulo : "—"}</td>
    <td class="dinheiro">${atraso > 0 ? fmtBRLSmart(multaValor) : "—"}</td>
    <td>${indice===null ? "—" : pct(indice)}</td><td class="dinheiro">${indice===null ? "—" : fmtBRLSmart(correcao)}</td>
    <td class="dinheiro"><b>${fmtBRL.format(atualizado)}</b></td>
    <td>${dataBR(linha.emitidoISO)}</td>
    <td style="white-space:nowrap"><button class="mini" onclick="imprimeDAE(${idx_dae})">🖨</button> <button class="mini apaga" onclick="apagaLinha('dae',${idx_dae},this)" title="Apagar">✕</button></td>`;
  tb.appendChild(tr);
  document.getElementById("dae-res-cartao").style.display = "block";
  return false;
}

function imprimeDAE(i){
  const r = linhas.dae[i];
  if(!r) return;
  const semCor = "Não há correção no mesmo mês do vencimento";
  imprimeDocumento(
    "GTA / PTV VENCIDOS — Crédito Tributário (multa + correção monetária pela taxa SELIC)",
    [
      { t:"Valor do DAE devido", s:"", v: fmtBRLSmart(r.valor) },
      { t:"Validade do DAE devido", s:"", v: dataBR(r.origISO) },
      { t:"Validade do novo DAE", s:"", v: dataBR(r.novaISO) },
      { t:"Valor da Multa", s: r.atraso > 0 ? `Atraso: ${r.atraso} dias = ${r.multaRotulo}` : "Sem atraso", v: r.atraso > 0 ? fmtBRLSmart(r.multaValor) : "—" },
      { t:"Índice de Correção", s: r.indice===null ? semCor : `Período: ${dataBR(r.origISO)} a ${dataBR(r.novaISO)}`, v: r.indice===null ? "—" : pct(r.indice) },
      { t:"Valor Correção", s: r.indice===null ? semCor : "(Valor do DAE + Valor da Multa) × Índice de Correção", v: r.indice===null ? "—" : fmtBRLSmart(r.correcao) },
      { t:"VALOR ATUALIZADO", s:"Valor do DAE + Valor da Multa + Valor Correção", v: fmtBRL.format(r.atualizado), destaque:true },
    ]);
}

// =====================================================================
// DOCUMENTO DE IMPRESSÃO
// =====================================================================
const BRASAO_FALLBACK = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Bras%C3%A3o_de_Minas_Gerais.svg/100px-Bras%C3%A3o_de_Minas_Gerais.svg.png";

function imprimeDocumento(subtitulo, itens){
  const e = emissor();
  if(!e){ abreModalEmissor(); return; }
  const linhasHTML = itens.map(it => `
    <tr${it.destaque ? ' class="destaque"' : ""}>
      <td class="rotulo"><div class="l1">${it.t}</div>${it.s ? `<div class="l2">${it.s}</div>` : ""}</td>
      <td class="valor">${it.v}</td>
    </tr>`).join("");
  document.getElementById("printheader").innerHTML = `
    <img class="doc-brasao" id="img-brasao" src="img/brasao-mg.png" alt="Brasão de Minas Gerais">
    <div class="doc-inst">
      <div class="inst1">GOVERNO DO ESTADO DE MINAS GERAIS</div>
      <div class="inst2">INSTITUTO MINEIRO DE AGROPECUÁRIA - IMA</div>
      <div class="inst3">GERÊNCIA DE CONTROLE DA ARRECADAÇÃO - GCA</div>
    </div>
    <img class="doc-carimbo" src="img/carimbo-pagina.png" alt="Carimbo IMA">`;
  document.getElementById("printdoc").innerHTML = `
    <div class="doc-titulo">Planilha de Cálculo</div>
    <div class="doc-subtitulo">${subtitulo}</div>
    <table>${linhasHTML}</table>
    <div class="doc-local-data">${capitalizaNome(e.local)}/MG, ${dataExtenso(iso(hoje()))}</div>
    <div class="doc-rodape">
      ${capitalizaNome(e.nome)} — ${maspFormatado(e.masp)}<br>
      ${formataUAImpressao(e.ua)}
    </div>`;

  const imgBrasao = document.getElementById("img-brasao");
  imgBrasao.onerror = () => { imgBrasao.onerror = null; imgBrasao.src = BRASAO_FALLBACK; };
  const imagens = [...document.querySelectorAll("#printheader img")];
  Promise.all(imagens.map(img => (img.complete && img.naturalWidth > 0) ? Promise.resolve() :
    new Promise(resolve => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); })
  )).then(() => window.print());
}

// =====================================================================
// ABA DADOS DE REFERÊNCIA
// =====================================================================
function pintaStatusSelic(){
  const el = document.getElementById("selic-status");
  if(selicOnline){ el.textContent = "API do Banco Central · ao vivo"; el.className = "status-selic online"; }
  else { el.textContent = "sem conexão — usando cópia local embutida"; el.className = "status-selic offline"; }
}
function montaTabelasRef(){
  const ymH = ymHoje();
  let html = "<tr><th>Mês</th><th>SELIC (%)</th></tr>";
  for(let k = 13; k >= 1; k--){
    const m = addMes(ymH, -k);
    const v = SELIC[m];
    html += `<tr><td>${mesAnoBR(m)}</td><td>${v === undefined ? "—" : v.toFixed(6).replace(".",",")}</td></tr>`;
  }
  html += `<tr><td>${mesAnoBR(ymH)}</td><td><i>em aberto (vale 1%)</i></td></tr>`;
  document.getElementById("tab-selic").innerHTML = html;

  let hu = "<tr><th>Ano</th><th>UFEMG (R$)</th></tr>";
  Object.keys(UFEMG).sort().reverse().forEach(a => {
    hu += `<tr><td>${a}</td><td>${UFEMG[a].toFixed(4).replace(".",",")}</td></tr>`;
  });
  document.getElementById("tab-ufemg").innerHTML = hu;

  document.getElementById("tab-params").innerHTML = `
    <tr><th>Parâmetro</th><th>Valor</th></tr>
    <tr><td>Multa até 30 dias</td><td>0,15% por dia</td></tr>
    <tr><td>Multa 31 a 60 dias</td><td>9%</td></tr>
    <tr><td>Multa acima de 60 dias</td><td>12%</td></tr>
    <tr><td>Leite: por 1000 L (ou fração)</td><td>${PARAMS.leiteFracaoUfemg.toString().replace(".",",")} UFEMG</td></tr>`;

  // exibição inicial com dados fixos; _exibeFeriados() atualiza após fetch
  _exibeFeriados();
}

// ---------- limites de data (não permitir futuro nem anterior a 2010) ----------
document.getElementById("ai-notif").max = iso(hoje());
document.getElementById("ai-notif").min = DATA_MINIMA;
document.getElementById("ai-atual").max = iso(hoje());
document.getElementById("ai-atual").min = DATA_MINIMA;
document.getElementById("ai-atual").value = iso(hoje());
document.getElementById("ai-ano").max = hoje().getFullYear();
document.getElementById("ai-ano").min = ANO_MINIMO;
document.getElementById("lt-mesano").max = addMes(ymHoje(), -1);
document.getElementById("lt-mesano").min = MES_MINIMO;
document.getElementById("lt-validade").min = DATA_MINIMA;
document.getElementById("dae-validade-orig").max = iso(hoje());
document.getElementById("dae-validade-orig").min = DATA_MINIMA;
document.getElementById("dae-validade-nova").min = DATA_MINIMA;

// ---------- inicialização ----------
_migraEmissorAntigo();
populaUnidades();
pintaChip();
if(!emissor()) abreModalEmissor();
montaTabelasRef();
carregaSelic();
verificaUFEMG();
carregaFeriadosBrasil();
carregaMunicipiosMG();
document.getElementById("app-version").textContent = `Versão ${APP_VERSION}`;

// ---------- checagem periódica de nova versão publicada ----------
async function verificaNovaVersao(){
  try{
    const r = await fetch(`version.json?t=${Date.now()}`, { cache: "no-store" });
    if(!r.ok) return;
    const dados = await r.json();
    if(dados.version && dados.version !== APP_VERSION){
      document.getElementById("version-banner").style.display = "block";
    }
  }catch(e){}
}
verificaNovaVersao();
setInterval(verificaNovaVersao, 10 * 60 * 1000);

// Avisa se a UFEMG do ano atual ainda não foi cadastrada
function verificaUFEMG(){
  const anoAtual = hoje().getFullYear();
  if(UFEMG[anoAtual] !== undefined) return;

  if(sessionStorage.getItem("ufemg-popup-visto")) return;
  sessionStorage.setItem("ufemg-popup-visto", "1");

  let ultimoAno = anoAtual - 1;
  while(ultimoAno >= 2002 && UFEMG[ultimoAno] === undefined) ultimoAno--;

  document.getElementById("popup-ufemg-ano-atual").textContent = anoAtual;
  document.getElementById("popup-ufemg-ultimo").textContent   = ultimoAno >= 2002 ? ultimoAno : "—";
  document.getElementById("popup-ufemg").classList.add("aberto");
}
