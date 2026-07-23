
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
  "2005-01":1.38,"2005-02":1.22,"2005-03":1.53,"2005-04":1.41,"2005-05":1.50,"2005-06":1.59,
  "2005-07":1.51,"2005-08":1.66,"2005-09":1.50,"2005-10":1.41,"2005-11":1.38,"2005-12":1.47,
  "2006-01":1.43,"2006-02":1.15,"2006-03":1.42,"2006-04":1.08,"2006-05":1.28,"2006-06":1.18,
  "2006-07":1.17,"2006-08":1.26,"2006-09":1.06,"2006-10":1.09,"2006-11":1.02,"2006-12":0.99,
  "2007-01":1.08,"2007-02":0.87,"2007-03":1.05,"2007-04":0.94,"2007-05":1.03,"2007-06":0.91,
  "2007-07":0.97,"2007-08":0.99,"2007-09":0.80,"2007-10":0.93,"2007-11":0.84,"2007-12":0.84,
  "2008-01":0.93,"2008-02":0.80,"2008-03":0.84,"2008-04":0.90,"2008-05":0.88,"2008-06":0.96,
  "2008-07":1.07,"2008-08":1.02,"2008-09":1.10,"2008-10":1.18,"2008-11":1.02,"2008-12":1.12,
  "2009-01":1.05,"2009-02":0.86,"2009-03":0.97,"2009-04":0.84,"2009-05":0.77,"2009-06":0.76,
  "2009-07":0.79,"2009-08":0.69,"2009-09":0.69,"2009-10":0.69,"2009-11":0.66,"2009-12":0.73,
  "2010-01":0.66,"2010-02":0.59,"2010-03":0.76,"2010-04":0.67,"2010-05":0.75,"2010-06":0.79,
  "2010-07":0.86,"2010-08":0.89,"2010-09":0.85,"2010-10":0.81,"2010-11":0.81,"2010-12":0.93,
  "2011-01":0.86,"2011-02":0.84,"2011-03":0.92,"2011-04":0.84,"2011-05":0.99,"2011-06":0.96,
  "2011-07":0.97,"2011-08":1.07,"2011-09":0.94,"2011-10":0.88,"2011-11":0.86,"2011-12":0.91,
  "2012-01":0.89,"2012-02":0.75,"2012-03":0.82,"2012-04":0.71,"2012-05":0.74,"2012-06":0.64,
  "2012-07":0.68,"2012-08":0.69,"2012-09":0.54,"2012-10":0.61,"2012-11":0.55,"2012-12":0.55,
  "2013-01":0.60,"2013-02":0.49,"2013-03":0.55,"2013-04":0.61,"2013-05":0.60,"2013-06":0.61,
  "2013-07":0.72,"2013-08":0.71,"2013-09":0.71,"2013-10":0.81,"2013-11":0.72,"2013-12":0.79,
  "2014-01":0.85,"2014-02":0.79,"2014-03":0.77,"2014-04":0.82,"2014-05":0.87,"2014-06":0.82,
  "2014-07":0.95,"2014-08":0.87,"2014-09":0.91,"2014-10":0.95,"2014-11":0.84,"2014-12":0.96,
  "2015-01":0.94,"2015-02":0.82,"2015-03":1.04,"2015-04":0.95,"2015-05":0.99,"2015-06":1.07,
  "2015-07":1.18,"2015-08":1.11,"2015-09":1.11,"2015-10":1.11,"2015-11":1.06,"2015-12":1.16,
  "2016-01":1.06,"2016-02":1.00,"2016-03":1.16,"2016-04":1.06,"2016-05":1.11,"2016-06":1.16,
  "2016-07":1.11,"2016-08":1.22,"2016-09":1.11,"2016-10":1.05,"2016-11":1.04,"2016-12":1.12,
  "2017-01":1.09,"2017-02":0.87,"2017-03":1.05,"2017-04":0.79,"2017-05":0.93,"2017-06":0.81,
  "2017-07":0.80,"2017-08":0.80,"2017-09":0.64,"2017-10":0.64,"2017-11":0.57,"2017-12":0.54,
  "2018-01":0.58,"2018-02":0.47,"2018-03":0.53,"2018-04":0.52,"2018-05":0.52,"2018-06":0.52,
  "2018-07":0.54,"2018-08":0.57,"2018-09":0.47,"2018-10":0.54,"2018-11":0.49,"2018-12":0.49,
  "2019-01":0.54,"2019-02":0.49,"2019-03":0.47,"2019-04":0.52,"2019-05":0.54,"2019-06":0.47,
  "2019-07":0.57,"2019-08":0.50,"2019-09":0.46,"2019-10":0.48,"2019-11":0.38,"2019-12":0.37,
  "2020-01":0.38,"2020-02":0.29,"2020-03":0.34,"2020-04":0.28,"2020-05":0.24,"2020-06":0.21,
  "2020-07":0.19,"2020-08":0.16,"2020-09":0.16,"2020-10":0.16,"2020-11":0.15,"2020-12":0.16,
  "2021-01":0.15,"2021-02":0.13,"2021-03":0.20,"2021-04":0.21,"2021-05":0.27,"2021-06":0.31,
  "2021-07":0.36,"2021-08":0.43,"2021-09":0.44,"2021-10":0.49,"2021-11":0.59,"2021-12":0.77,
  "2022-01":0.73,"2022-02":0.76,"2022-03":0.93,"2022-04":0.83,"2022-05":1.03,"2022-06":1.02,
  "2022-07":1.03,"2022-08":1.17,"2022-09":1.07,"2022-10":1.02,"2022-11":1.02,"2022-12":1.12,
  "2023-01":1.12,"2023-02":0.92,"2023-03":1.17,"2023-04":0.92,"2023-05":1.12,"2023-06":1.07,
  "2023-07":1.07,"2023-08":1.14,"2023-09":0.97,"2023-10":1.00,"2023-11":0.92,"2023-12":0.89,
  "2024-01":0.97,"2024-02":0.80,"2024-03":0.83,"2024-04":0.89,"2024-05":0.83,"2024-06":0.79,
  "2024-07":0.91,"2024-08":0.87,"2024-09":0.84,"2024-10":0.93,"2024-11":0.79,"2024-12":0.93,
  "2025-01":1.01,"2025-02":0.99,"2025-03":0.96,"2025-04":1.06,"2025-05":1.14,"2025-06":1.10,
  "2025-07":1.28,"2025-08":1.16,"2025-09":1.22,"2025-10":1.28,"2025-11":1.05,"2025-12":1.22,
  "2026-01":1.16,"2026-02":1.00,"2026-03":1.21,"2026-04":1.09,"2026-05":1.07,"2026-06":1.12
};

// Unidades administrativas do IMA
// TODO: confirmar lista completa com a GCA


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
const _SIGLAS = new Set(["LTDA","ME","EPP","EIRELI","SA","S/A","MEI","CIA","SS"]);
// Numeral romano "de verdade": só I/V/X/L/C/D/M — evita capitalizar errado
// nomes/logradouros com "II", "III", "IV" etc. (ex.: "Papa João Paulo II").
const _ROMANO = /^[IVXLCDM]+$/;
const capitalizaNome = nome => nome.trim().split(/\s+/).map(p => {
  const min = p.toLowerCase();
  const maiuscula = p.toUpperCase();
  if(_SIGLAS.has(maiuscula) || _ROMANO.test(maiuscula)) return maiuscula;
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
let selicCarregando = true;

async function carregaSelic(){
  // Busca apenas os meses ausentes no snapshot (muito mais rápido).
  try{
    const h = hoje();
    const dd = String(h.getDate()).padStart(2,"0");
    const mm = String(h.getMonth()+1).padStart(2,"0");
    const aaaa = h.getFullYear();

    // Primeiro mês a buscar = mês seguinte ao último do snapshot
    const ultimoYm = Object.keys(SELIC_SNAPSHOT).sort().pop();
    const proximoYm = addMes(ultimoYm, 1);
    const [anoIni, mesIni] = proximoYm.split("-").map(Number);

    const novo = { ...SELIC_SNAPSHOT };

    // Só busca meses fechados anteriores ao mês atual (o mês corrente vale sempre 1%)
    const ultimoMesFechado = addMes(`${aaaa}-${mm}`, -1);
    if(proximoYm <= ultimoMesFechado){
      // Série 4390 = SELIC acumulada no mês (% a.m., 2 casas) — valor usado
      // exatamente como o BC publica, sem recompor a partir da série diária
      // (decisão de 2026-07-20, mesma reversão aplicada no DAE Web).
      const dataInicial = `01/${String(mesIni).padStart(2,"0")}/${anoIni}`;
      const [aF, mF] = ultimoMesFechado.split("-");
      const dataFinal = `${new Date(Number(aF), Number(mF), 0).getDate()}/${mF}/${aF}`;
      const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4390/dados?formato=json&dataInicial=${dataInicial}&dataFinal=${dataFinal}`;
      const r = await fetch(url);
      if(!r.ok) throw new Error(r.status);
      const lista = await r.json();
      for(const o of lista){
        const [d, m, a] = o.data.split("/");
        novo[`${a}-${m}`] = parseFloat(o.valor);
      }
    }
    SELIC = novo; selicOnline = true;
  }catch(e){ selicOnline = false; }
  selicCarregando = false;
  pintaStatusSelic(); montaTabelasRef();
}

function selicMes(ym){
  if(ym >= ymHoje()) return null;
  return (ym in SELIC) ? SELIC[ym] : null;
}

function selicErroSeFaltando(ymBase, ymAtualizacao){
  const faltando = [];
  for(let m = addMes(ymBase,1); m < ymAtualizacao; m = addMes(m,1)){
    if(m < ymHoje() && !(m in SELIC)) faltando.push(mesAnoBR(m));
  }
  if(faltando.length === 0) return null;
  if(selicCarregando) return "Aguarde: carregando taxas SELIC do Banco Central…";
  return `Não foi possível conectar à API do Banco Central. SELIC não disponível para: ${faltando.join(", ")}.`;
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
  const info = _MAPA_UPPER[(local || "").trim().toUpperCase()];
  if(!info) return false;
  return ua === info.esec || ua === info.cr || (info.sede || []).includes(ua);
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
const abreviaUA = ua => ua.includes(" — ") ? ua.split(" — ")[1] : ua;
const formataUAImpressao = ua => ua;
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
  // datalist vazio — opções são populadas dinamicamente por filtraUA ao selecionar município
  document.getElementById("lista-ua").innerHTML = "";
}

// índice case-insensitive construído uma vez
const _MAPA_UPPER = Object.fromEntries(
  Object.entries(MAPA_MUN_UA).map(([k,v]) => [k.toUpperCase(), v])
);

function filtraUA(mun){
  const uaEl = document.getElementById("em-ua");
  const dl   = document.getElementById("lista-ua");
  const hint = document.getElementById("ua-hint");
  const info = _MAPA_UPPER[mun.trim().toUpperCase()];
  if(info){
    const opcoes = [info.esec, info.cr, ...(info.sede || [])];
    dl.innerHTML = opcoes.map(u => `<option value="${u}">`).join("");
    hint.textContent = info.sede ? `${info.esec} · ${info.cr} · Gerências da Sede` : `${info.esec} · ${info.cr}`;
    uaEl.disabled = false;
    uaEl.placeholder = "Digite ou selecione…";
  } else {
    dl.innerHTML = "";
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

// Modos da aplicação: home (tela inicial de escolha), pc (Planilha de Cálculo)
// e form (Formulário de Emissão de DAE). O CSS esconde os botões de aba que
// não pertencem ao modo atual (body[data-modo]).
const TITULO_POR_MODO = {
  home: "Planilha de Cálculo & Formulário DAE",
  pc: "Planilha de Cálculo",
  form: "Formulário de Encaminhamento de Processos à GCA",
};
function trocaModo(modo){
  document.body.dataset.modo = modo;
  document.getElementById("titulo-app").textContent = TITULO_POR_MODO[modo];
  trocaAba(modo === "pc" ? "inicio" : modo === "form" ? "form" : "home");
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
function validaDataPassada(el, aba){
  if(_anoPleno(el.value) && el.value < iso(hoje())){
    el.value = "";
    mostraErro(aba, "A nova validade do DAE deve ser maior ou igual a hoje. O campo foi limpo.");
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
  validaDataPassada(el, "lt");
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
  validaDataPassada(el, "dae");
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
const pct = v => v.toFixed(2).replace(".", ",") + "%";

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
  { const _e = selicErroSeFaltando(ymDe(notifISO), ymDe(atualISO)); if(_e) return mostraErro("ai", _e), false; }

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
    <td class="dinheiro">${indice===null ? "—" : fmtBRL.format(correcao)}</td>
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
      { t:"Data da Notificação", s:"Data de exigibilidade do crédito — Dec. nº 46.668/14", v: dataBR(r.notifISO) },
      { t:"Data Inicial do Índice de Correção", s: r.indice===null ? semCorrecao : "Primeiro dia do mês seguinte à Data de Notificação", v: r.indice===null ? "—" : dtIniIndice },
      { t:"Data Final do Índice de Correção", s: r.indice===null ? semCorrecao : "Data informada. Poderá divergir da data de emissão desta Planilha", v: r.indice===null ? "—" : dataBR(r.atualISO) },
      { t:"Índice de Correção", s: r.indice===null ? semCorrecao : `SELIC acumulada: ${mesAnoBR(addMes(ymDe(r.notifISO),1))} a ${mesAnoBR(ymDe(r.atualISO))}`, v: r.indice===null ? "—" : pct(r.indice) },
      { t:"Valor Correção", s: r.indice===null ? semCorrecao : "Valor de Cálculo × Índice de Correção", v: r.indice===null ? "—" : fmtBRL.format(r.correcao) },
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
  if(validadeISO < iso(hoje())) return mostraErro("lt","A validade do DAE deve ser maior ou igual a hoje."), false;
  if([0,6].includes(deISO(validadeISO).getDay())) return mostraErro("lt","A validade não pode cair em um final de semana."), false;
  { const _e = selicErroSeFaltando(addMes(mesano,1), ymDe(validadeISO)); if(_e) return mostraErro("lt", _e), false; }

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
    <td>${indice===null ? "—" : pct(indice)}</td><td class="dinheiro">${indice===null ? "—" : fmtBRL.format(correcao)}</td>
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
      { t:"Valor Correção", s: r.indice===null ? semCor : "(Valor da Captação + Valor da Multa) × Índice de Correção", v: r.indice===null ? "—" : fmtBRL.format(r.correcao) },
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
    <td>${indice===null ? "—" : pct(indice)}</td><td class="dinheiro">${indice===null ? "—" : fmtBRL.format(correcao)}</td>
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
      { t:"Valor Correção", s: r.indice===null ? semCor : "(Valor do DAE + Valor da Multa) × Índice de Correção", v: r.indice===null ? "—" : fmtBRL.format(r.correcao) },
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
// FORMULÁRIO DE EMISSÃO DE DAE (modelo oficial 13/10/2022)
// Mesmas regras de SEI/Processo/CPF-CNPJ/CEP/País/ESEC do DAE Web
// (GCA_DAE/web/js/app.js), pra manter os dois formulários de emissão
// consistentes (decisão de 2026-07-20).
// =====================================================================

function setStatusCampo(el, msg, ok){
  el.textContent = ok ? "" : msg;
  el.className = "status " + (ok ? "ok" : "err");
}
function marcaInvalidoCampo(input, invalido){
  input.classList.toggle("invalido", !!invalido);
}
function _normalizaTextoForm(s){
  return (s || "").normalize("NFD").replace(/\p{Mn}/gu, "").toLowerCase();
}

// --- Infração à legislação -> Receita/Gerência Técnica (equivalente à "Receita" do DAE Web) ---
const GT_POR_INFRACAO_FORM = {
  "Agrotóxico": "GDV",
  "Defesa Animal": "GDA",
  "Inspeção Sanitária Industrial": "GIP",
  "Defesa Vegetal / Sementes e Mudas": "GDV",
};
const RECEITA_POR_INFRACAO_FORM = {
  "Agrotóxico": "57",
  "Defesa Animal": "58",
  "Inspeção Sanitária Industrial": "59",
  "Defesa Vegetal / Sementes e Mudas": "60",
};
// Nomes completos confirmados pelo usuário em 2026-07-20 (GDV pelo modelo oficial
// "Formulário para emissão de DAE WEB.docx"; GDA por padrão análogo; GIP pelo
// nome corrigido no banco do SiGA em 10/07/2026).
const GERENCIA_NOME_POR_GT = {
  GDV: "Gerência de Defesa Sanitária Vegetal",
  GDA: "Gerência de Defesa Sanitária Animal",
  GIP: "Gerência de Inspeção de Produtos de Origem Animal",
};
const CRS_GDA_FORM = ["CRAL","CRBD","CRBH","CRCV","CRGV","CRGN","CRJN","CRJF","CRMC","CROL","CRPS","CRPM","CRPN","CRPC","CRPA","CRTF","CRURA","CRUDI","CRUN","CRVG","CRVC"];
function gtDoFormulario(){
  return GT_POR_INFRACAO_FORM[document.getElementById("fd-infracao").value] || null;
}

// --- SEI (validação de dígito verificador, mesma regra do DAE Web) ---
function validarSeiForm(valorBruto){
  const v = (valorBruto || "").replace(/[.\-\s/]/g, "");
  if(v.length === 0) return { valido: null, formatado: "", erro: null };
  if(v.length !== 19 || !/^\d{19}$/.test(v)){
    return { valido: false, formatado: valorBruto,
      erro: "Digite os 19 números (sem pontos, barra ou traço) ou os 23 caracteres formatados. Ex.: NNNN.01.NNNNNNN/AAAA-NN" };
  }
  const formatado = `${v.slice(0,4)}.${v.slice(4,6)}.${v.slice(6,13)}/${v.slice(13,17)}-${v.slice(17,19)}`;
  const semDV = v.slice(0, 17);
  const dv = parseInt(v.slice(17, 19), 10);
  const parteA = parseInt(semDV.slice(0, 6), 10);
  const parteB = parseInt(semDV.slice(6, 10), 10);
  const parteC = parseInt(semDV.slice(10, 17), 10);
  const va = parteA * 10000 + parteB;
  const vb = va % 97;
  const vc = vb * 1000000000 + parteC * 100;
  const vd = vc % 97;
  const checkDv = 98 - vd;
  if(checkDv !== dv) return { valido: false, formatado, erro: `${formatado} não é um número válido do SEI.` };
  return { valido: true, formatado, erro: null };
}
function aoMudarSeiForm(){
  const input = document.getElementById("fd-sei");
  const statusEl = document.getElementById("status-fd-sei");
  const r = validarSeiForm(input.value);
  marcaInvalidoCampo(input, r.valido === false);
  if(r.valido === null){ setStatusCampo(statusEl, "", true); }
  else if(r.valido){ input.value = r.formatado; setStatusCampo(statusEl, "SEI válido", true); }
  else { setStatusCampo(statusEl, r.erro, false); }
  revalidaProcessoForm();
}
document.getElementById("fd-sei").addEventListener("blur", aoMudarSeiForm);

// --- Processo (autopreenchimento via "sei" + validação cruzada da GT) ---
function preencherProcessoViaSeiForm(){
  const input = document.getElementById("fd-processo");
  const statusEl = document.getElementById("status-fd-processo");
  const gt = gtDoFormulario();
  const seiValidado = validarSeiForm(document.getElementById("fd-sei").value);

  const faltando = [];
  if(!gt) faltando.push("Infração à legislação");
  if(!seiValidado.valido) faltando.push("SEI válido");
  if(faltando.length){
    input.value = "";
    setStatusCampo(statusEl, `Preencha antes: ${faltando.join(" e ")}.`, false);
    marcaInvalidoCampo(input, false);
    return;
  }
  input.value = `${gt} ${seiValidado.formatado}`;
  setStatusCampo(statusEl, "", true);
  marcaInvalidoCampo(input, false);
}
document.getElementById("btn-atalho-fd-sei").addEventListener("click", preencherProcessoViaSeiForm);

function revalidaProcessoForm(){
  const input = document.getElementById("fd-processo");
  const statusEl = document.getElementById("status-fd-processo");
  const gt = gtDoFormulario();
  const valor = input.value.trim();

  if(!valor){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(input, false); return; }
  if(valor.toUpperCase() === "SEI"){ preencherProcessoViaSeiForm(); return; }
  if(!gt){
    setStatusCampo(statusEl, "Selecione a Infração à legislação antes de preencher o Processo.", false);
    marcaInvalidoCampo(input, true);
    return;
  }
  const contemGT = valor.toUpperCase().includes(gt);
  if(contemGT){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(input, false); return; }
  if(gt === "GDA"){
    const cr = CRS_GDA_FORM.find(c => valor.toUpperCase().includes(c));
    if(cr){
      const idx = valor.toUpperCase().indexOf(cr);
      input.value = valor.slice(0, idx + cr.length) + "-GDA" + valor.slice(idx + cr.length);
      setStatusCampo(statusEl, "Sufixo -GDA adicionado automaticamente", true);
      marcaInvalidoCampo(input, false);
      return;
    }
  }
  setStatusCampo(statusEl, `O Processo precisa conter a sigla da Gerência Técnica (${gt}).`, false);
  marcaInvalidoCampo(input, true);
}
document.getElementById("fd-processo").addEventListener("blur", revalidaProcessoForm);

// --- Datas: Data de emissão (AI) não pode ser hoje/futura; Data de Notificação
// não pode ser anterior à Data de emissão, nem hoje/futura (mesma regra do DAE Web). ---
const _ontemFormISO = iso(new Date(hoje().getTime() - 86400000));
function validaFdAiData(){
  const input = document.getElementById("fd-ai-data");
  const statusEl = document.getElementById("status-fd-ai-data");
  const v = input.value;
  if(!v){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(input, false); document.getElementById("fd-notif").min = ""; return; }
  if(v >= iso(hoje())){
    setStatusCampo(statusEl, "Data de emissão não pode ser hoje nem futura.", false);
    marcaInvalidoCampo(input, true);
    return;
  }
  setStatusCampo(statusEl, "", true);
  marcaInvalidoCampo(input, false);
  document.getElementById("fd-notif").min = v;
  validaFdNotif();
  atualizaPreviaValorForm();
}
function validaFdNotif(){
  const input = document.getElementById("fd-notif");
  const statusEl = document.getElementById("status-fd-notif");
  const v = input.value;
  if(!v){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(input, false); return; }
  const dataAi = document.getElementById("fd-ai-data").value;
  if(v >= iso(hoje()) || (dataAi && v < dataAi)){
    setStatusCampo(statusEl, "Não pode ser anterior à Data de emissão, nem hoje e nem futura.", false);
    marcaInvalidoCampo(input, true);
    return;
  }
  setStatusCampo(statusEl, "", true);
  marcaInvalidoCampo(input, false);
  atualizaPreviaValorForm();
}
document.getElementById("fd-ai-data").addEventListener("blur", validaFdAiData);
document.getElementById("fd-notif").addEventListener("blur", validaFdNotif);
document.getElementById("fd-ai-data").max = _ontemFormISO;
document.getElementById("fd-notif").max = _ontemFormISO;

// --- CPF/CNPJ — validação de dígitos + consulta automática de Razão Social (CNPJ) ---
function validarCNPJForm(cnpj){
  const d = (cnpj || "").replace(/\D/g, "");
  if(d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const n = d.split("").map(Number);
  const pesos1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const pesos2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  let soma = n.slice(0,12).reduce((acc,x,i) => acc + x*pesos1[i], 0);
  let dv1 = 11 - (soma % 11); if(dv1 >= 10) dv1 = 0;
  soma = n.slice(0,13).reduce((acc,x,i) => acc + x*pesos2[i], 0);
  let dv2 = 11 - (soma % 11); if(dv2 >= 10) dv2 = 0;
  return n[12] === dv1 && n[13] === dv2;
}
function formatarDocumentoForm(v){
  const d = (v || "").replace(/\D/g, "");
  if(d.length === 11) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9,11)}`;
  if(d.length === 14) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12,14)}`;
  return v;
}
function validarDocumentoForm(v){
  const d = (v || "").replace(/\D/g, "");
  if(d.length === 11) return { tipo: "CPF", valido: validaCPF(d), formatado: formatarDocumentoForm(d) };
  if(d.length === 14) return { tipo: "CNPJ", valido: validarCNPJForm(d), formatado: formatarDocumentoForm(d) };
  return { tipo: null, valido: false, formatado: v };
}
async function consultarRazaoSocialForm(cnpjDigitos){
  try{
    const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjDigitos}`);
    if(r.ok){ const d = await r.json(); if(d.razao_social) return d.razao_social; }
  }catch(e){ /* tenta fallback */ }
  try{
    const r = await fetch(`https://api.opencnpj.org/${cnpjDigitos}?dataset=receita`);
    if(r.ok){ const d = await r.json(); if(d.razao_social) return d.razao_social; }
  }catch(e){ /* nenhuma fonte respondeu */ }
  return null;
}
document.getElementById("fd-doc").addEventListener("blur", async () => {
  const statusEl = document.getElementById("status-fd-doc");
  const input = document.getElementById("fd-doc");
  if(!input.value.trim()){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(input, false); return; }
  const dados = validarDocumentoForm(input.value);
  if(!dados.tipo){ setStatusCampo(statusEl, "Documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos", false); marcaInvalidoCampo(input, true); return; }
  if(!dados.valido){ setStatusCampo(statusEl, `${dados.tipo} com dígito verificador inválido`, false); marcaInvalidoCampo(input, true); return; }
  input.value = dados.formatado;
  setStatusCampo(statusEl, `${dados.tipo} válido`, true);
  marcaInvalidoCampo(input, false);
  if(dados.tipo === "CNPJ" && !document.getElementById("fd-nome").value.trim()){
    setStatusCampo(statusEl, "CNPJ válido — consultando Razão Social…", true);
    const razaoSocial = await consultarRazaoSocialForm(input.value.replace(/\D/g, ""));
    setStatusCampo(statusEl, "CNPJ válido", true);
    if(razaoSocial) document.getElementById("fd-nome").value = capitalizaNome(razaoSocial);
  }
});

// --- País (mesma lógica do DAE Web: fora do Brasil, o CEP busca no GeoNames) ---
function definirPaisForm(codigo){
  const p = PAISES.find(x => x.codigo === codigo) || PAISES.find(x => x.codigo === "BR");
  const input = document.getElementById("fd-pais");
  input.value = p.sigla;
  input.dataset.codigo = p.codigo;
  document.getElementById("fd-pais-sugestoes").classList.remove("aberta");
  aoMudarPaisForm();
}
function buscarPaisForm(filtro){
  if(!filtro) return [];
  const alvo = _normalizaTextoForm(filtro);
  return PAISES.filter(p => _normalizaTextoForm(p.nome).includes(alvo)).slice(0, 20);
}
function renderSugestoesPaisForm(itens){
  const lista = document.getElementById("fd-pais-sugestoes");
  lista.innerHTML = "";
  if(!itens.length){ lista.classList.remove("aberta"); return; }
  itens.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.nome;
    li.addEventListener("mousedown", e => { e.preventDefault(); definirPaisForm(p.codigo); });
    lista.appendChild(li);
  });
  lista.classList.add("aberta");
}
document.getElementById("fd-pais").addEventListener("input", e => renderSugestoesPaisForm(buscarPaisForm(e.target.value)));
document.getElementById("fd-pais").addEventListener("blur", () => {
  setTimeout(() => {
    document.getElementById("fd-pais-sugestoes").classList.remove("aberta");
    const valorAtual = document.getElementById("fd-pais").value.trim().toUpperCase();
    const porSiglaOuCodigo = PAISES.find(p => p.sigla.toUpperCase() === valorAtual || p.codigo === valorAtual);
    if(porSiglaOuCodigo){ definirPaisForm(porSiglaOuCodigo.codigo); return; }
    const opcoes = buscarPaisForm(document.getElementById("fd-pais").value.trim());
    if(opcoes.length === 1){ definirPaisForm(opcoes[0].codigo); return; }
    definirPaisForm(document.getElementById("fd-pais").dataset.codigo || "BR");
  }, 150);
});

// --- CEP (ViaCEP com fallback BrasilAPI; internacional via GeoNames) ---
function limparEnderecoForm(){
  ["fd-logradouro","fd-numero","fd-complemento","fd-bairro","fd-mun"].forEach(id => { document.getElementById(id).value = ""; });
}
function aoMudarPaisForm(){
  const intl = document.getElementById("fd-pais").dataset.codigo !== "BR";
  const cepInput = document.getElementById("fd-cep");
  marcaInvalidoCampo(cepInput, false);
  cepInput.value = "";
  cepInput.placeholder = intl ? "Postal code" : "00000-000";
  limparEnderecoForm();
  const lblBairro = document.getElementById("lbl-fd-bairro");
  lblBairro.firstChild.textContent = intl ? "Bairro " : "Bairro * ";
}
async function buscarCepNacionalForm(cep){
  const cepInput = document.getElementById("fd-cep");
  const logradouroEl = document.getElementById("fd-logradouro");
  let logradouro = null, bairro = "", municipio = "", uf = "";
  try{
    const r1 = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const d1 = await r1.json();
    if(!d1.erro){ logradouro = d1.logradouro || ""; bairro = d1.bairro || ""; municipio = d1.localidade; uf = d1.uf; }
  }catch(e){ /* tenta fallback */ }
  if(logradouro === null){
    try{
      const r2 = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      if(r2.ok){ const d2 = await r2.json(); logradouro = d2.street || ""; bairro = d2.neighborhood || ""; municipio = d2.city; uf = d2.state; }
    }catch(e){ /* nenhuma fonte respondeu */ }
  }
  if(logradouro === null){ marcaInvalidoCampo(cepInput, true); return; }
  marcaInvalidoCampo(cepInput, false);
  document.getElementById("fd-bairro").value = bairro ? capitalizaNome(bairro) : "";
  document.getElementById("fd-mun").value = `${municipio}/${uf}`;
  if(logradouro.length > 1){ logradouroEl.value = capitalizaNome(logradouro); document.getElementById("fd-numero").focus(); }
  else { logradouroEl.value = ""; }
}
async function buscarCepInternacionalForm(codigo, paisISO){
  const cepInput = document.getElementById("fd-cep");
  try{
    const url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${encodeURIComponent(codigo)}&country=${paisISO}&maxRows=1&username=diquintino`;
    const r = await fetch(url);
    const d = await r.json();
    const item = d.postalCodes && d.postalCodes[0];
    if(!item){ marcaInvalidoCampo(cepInput, true); document.getElementById("fd-mun").value = ""; return; }
    marcaInvalidoCampo(cepInput, false);
    const local = [item.placeName, item.adminName1].filter(Boolean).join(", ");
    document.getElementById("fd-mun").value = `${local} - ${item.countryCode}`;
  }catch(e){ marcaInvalidoCampo(cepInput, true); }
}
document.getElementById("fd-cep").addEventListener("blur", async () => {
  const cepInput = document.getElementById("fd-cep");
  const codigo = cepInput.value.trim();
  if(!codigo){ marcaInvalidoCampo(cepInput, false); limparEnderecoForm(); return; }
  limparEnderecoForm();
  const paisCodigo = document.getElementById("fd-pais").dataset.codigo || "BR";
  if(paisCodigo !== "BR"){ await buscarCepInternacionalForm(codigo, paisCodigo); return; }
  const cep = codigo.replace(/\D/g, "");
  if(cep.length !== 8){ marcaInvalidoCampo(cepInput, true); return; }
  await buscarCepNacionalForm(cep);
});

// --- ESEC (autocomplete a partir do MAPA_MUN_UA já usado no cadastro de emissor) ---
const ESEC_UNICOS_FORM = [...new Set(Object.values(MAPA_MUN_UA).map(i => i.esec))].sort();
function buscarEsecForm(filtro){
  if(!filtro) return [];
  const alvo = _normalizaTextoForm(filtro);
  return ESEC_UNICOS_FORM.filter(e => _normalizaTextoForm(e).includes(alvo)).slice(0, 30);
}
function renderSugestoesEsecForm(itens){
  const lista = document.getElementById("fd-esec-sugestoes");
  lista.innerHTML = "";
  if(!itens.length){ lista.classList.remove("aberta"); return; }
  itens.forEach(esec => {
    const li = document.createElement("li");
    li.textContent = esec;
    li.addEventListener("mousedown", e => {
      e.preventDefault();
      document.getElementById("fd-esec").value = esec;
      setStatusCampo(document.getElementById("status-fd-esec"), "", true);
      lista.classList.remove("aberta");
    });
    lista.appendChild(li);
  });
  lista.classList.add("aberta");
}
document.getElementById("fd-esec").addEventListener("input", e => renderSugestoesEsecForm(buscarEsecForm(e.target.value)));
document.getElementById("fd-esec").addEventListener("blur", () => {
  setTimeout(() => {
    document.getElementById("fd-esec-sugestoes").classList.remove("aberta");
    const input = document.getElementById("fd-esec");
    const statusEl = document.getElementById("status-fd-esec");
    const valorAtual = input.value.trim();
    if(!valorAtual || ESEC_UNICOS_FORM.includes(valorAtual)){ setStatusCampo(statusEl, "", true); return; }
    const opcoes = buscarEsecForm(valorAtual);
    if(opcoes.length === 1){ input.value = opcoes[0]; setStatusCampo(statusEl, "", true); }
    else { input.value = ""; setStatusCampo(statusEl, opcoes.length === 0 ? "ESEC não encontrado" : "Mais de uma opção — escolha um item da lista", false); }
  }, 150);
});

// --- Valores: "Valor" + "Tipo" (REAL/UFEMG) igual ao padrão do Auto de Infração;
// "Com Desconto" continua exclusivo de Sementes e Mudas. Quando Tipo = UFEMG,
// mostra uma prévia convertida em Reais (só a conversão pela UFEMG do ano de
// referência — sem correção SELIC, decisão de 2026-07-20). ---
function atualizaCamposPorInfracaoForm(){
  const infracaoVal = document.getElementById("fd-infracao").value;
  const sementes = infracaoVal === "Defesa Vegetal / Sementes e Mudas";
  // Tipo de Valor padrão conforme a Infração: UFEMG pra tudo, exceto Sementes e Mudas (REAL).
  if(infracaoVal) document.getElementById("fd-tipo-valor").value = sementes ? "REAL" : "UFEMG";
  atualizaDescontoHabilitado();
}
// Com Desconto só faz sentido em Sementes e Mudas E com Tipo = Real (é um
// desconto sobre o valor em reais — não existe "desconto" em UFEMG).
function atualizaDescontoHabilitado(){
  const sementes = document.getElementById("fd-infracao").value === "Defesa Vegetal / Sementes e Mudas";
  const tipoReal = document.getElementById("fd-tipo-valor").value === "REAL";
  const el = document.getElementById("fd-vlr-desconto");
  el.disabled = !(sementes && tipoReal);
  if(el.disabled){ el.value = ""; setStatusCampo(document.getElementById("status-fd-vlr-desconto"), "", true); marcaInvalidoCampo(el, false); }
}
// Valor/Com Desconto são <input type=text> (não number) pra poder mostrar no
// formato brasileiro (ponto de milhar, vírgula decimal) — numeroForm() lê de
// volta um número de qualquer um dos dois formatos (o usuário pode digitar
// com ponto decimal antes do primeiro blur reformatar).
function numeroForm(str){
  if(str === null || str === undefined || str === "") return NaN;
  const s = String(str).trim();
  return s.includes(",") ? Number(s.replace(/\./g, "").replace(",", ".")) : Number(s);
}
function formataNumeroForm(input, casasMin, casasMax){
  const n = numeroForm(input.value);
  if(isFinite(n)) input.value = n.toLocaleString("pt-BR", { minimumFractionDigits: casasMin, maximumFractionDigits: casasMax });
}
document.getElementById("fd-valor").addEventListener("blur", () => {
  const tipo = document.getElementById("fd-tipo-valor").value;
  formataNumeroForm(document.getElementById("fd-valor"), tipo === "UFEMG" ? 0 : 2, tipo === "UFEMG" ? 4 : 2);
});
document.getElementById("fd-vlr-desconto").addEventListener("blur", () => formataNumeroForm(document.getElementById("fd-vlr-desconto"), 2, 2));

// Com Desconto precisa ser menor que o Valor em Reais (não faz sentido um
// desconto igual ou maior que o valor original).
function validaDescontoForm(){
  const el = document.getElementById("fd-vlr-desconto");
  const statusEl = document.getElementById("status-fd-vlr-desconto");
  if(el.disabled || !el.value){ setStatusCampo(statusEl, "", true); marcaInvalidoCampo(el, false); return; }
  const desconto = numeroForm(el.value);
  const valor = numeroForm(document.getElementById("fd-valor").value);
  if(valor > 0 && desconto >= valor){
    setStatusCampo(statusEl, "Deve ser menor que o Valor em Reais.", false);
    marcaInvalidoCampo(el, true);
    return;
  }
  setStatusCampo(statusEl, "", true);
  marcaInvalidoCampo(el, false);
}
document.getElementById("fd-vlr-desconto").addEventListener("blur", validaDescontoForm);
document.getElementById("fd-valor").addEventListener("blur", validaDescontoForm);
function anoReferenciaUfemgForm(){
  const gt = gtDoFormulario();
  const dataAi = document.getElementById("fd-ai-data").value;
  const dataNotif = document.getElementById("fd-notif").value;
  const base = (gt === "GDA" && dataAi) ? dataAi : dataNotif;
  return base ? Number(base.slice(0,4)) : null;
}
function atualizaPreviaValorForm(){
  const notaEl = document.getElementById("nota-fd-valor");
  const tipo = document.getElementById("fd-tipo-valor").value;
  const valor = numeroForm(document.getElementById("fd-valor").value);
  if(tipo !== "UFEMG" || !(valor > 0)){ notaEl.textContent = ""; return; }
  const ano = anoReferenciaUfemgForm();
  if(!ano){ notaEl.textContent = "Preencha a Data de emissão/notificação para converter."; return; }
  const taxa = UFEMG[ano];
  if(taxa === undefined){ notaEl.textContent = `UFEMG não cadastrada para ${ano}.`; return; }
  notaEl.textContent = `≈ ${fmtBRL.format(valor * taxa)} (UFEMG ${ano})`;
}
document.getElementById("fd-valor").addEventListener("input", atualizaPreviaValorForm);
document.getElementById("fd-tipo-valor").addEventListener("change", () => { atualizaPreviaValorForm(); atualizaDescontoHabilitado(); });
document.getElementById("fd-infracao").addEventListener("change", () => {
  revalidaProcessoForm();
  atualizaCamposPorInfracaoForm();
  atualizaPreviaValorForm();
});

// --- CPF/CNPJ e Nome/Razão Social: rótulo muda conforme a quantidade de dígitos
// digitados (11 = CPF/Nome, 14 = CNPJ/Razão Social). ---
function atualizaRotuloDocForm(){
  const n = document.getElementById("fd-doc").value.replace(/\D/g, "");
  const lblDoc = document.getElementById("lbl-fd-doc");
  const lblNome = document.getElementById("lbl-fd-nome");
  if(n.length === 14){ lblDoc.textContent = "CNPJ *"; lblNome.textContent = "Razão Social *"; }
  else if(n.length === 11){ lblDoc.textContent = "CPF *"; lblNome.textContent = "Nome *"; }
  else { lblDoc.textContent = "CPF/CNPJ *"; lblNome.textContent = "Nome / Razão Social *"; }
}
document.getElementById("fd-doc").addEventListener("input", atualizaRotuloDocForm);

// Capitalização consistente com o resto do app (Emissor, DAE Web): iniciais
// maiúsculas, preposições sempre minúsculas — mesma regra em todo campo de texto livre.
["fd-nome", "fd-logradouro", "fd-bairro", "fd-complemento"].forEach(id => {
  document.getElementById(id).addEventListener("blur", () => {
    const input = document.getElementById(id);
    if(input.value.trim()) input.value = capitalizaNome(input.value);
  });
});

const FD_CAMPOS = ["fd-sei","fd-processo","fd-ai","fd-serie","fd-valor","fd-vlr-desconto","fd-ai-data","fd-notif",
  "fd-doc","fd-nome","fd-esec","fd-cep","fd-logradouro","fd-numero","fd-complemento","fd-bairro","fd-mun"];
const FD_STATUS = ["status-fd-sei","status-fd-processo","status-fd-ai-data","status-fd-notif","status-fd-doc","status-fd-esec","status-fd-vlr-desconto"];

function limpaFormularioDae(){
  FD_CAMPOS.forEach(id => { document.getElementById(id).value = ""; });
  ["fd-sei","fd-processo","fd-ai-data","fd-notif","fd-doc","fd-esec","fd-cep","fd-vlr-desconto"].forEach(id => marcaInvalidoCampo(document.getElementById(id), false));
  FD_STATUS.forEach(id => setStatusCampo(document.getElementById(id), "", true));
  document.getElementById("nota-fd-valor").textContent = "";
  document.getElementById("fd-tipo-solicitacao").value = "";
  document.getElementById("fd-tipo-valor").value = "";
  document.getElementById("fd-infracao").value = "";
  atualizaRotuloDocForm();
  definirPaisForm("BR");
  atualizaCamposPorInfracaoForm();
  mostraErro("form", "");
}

// Título do impresso é fixo — "Formulário de Encaminhamento de Processos à GCA"
// já funciona como cabeçalho, não precisa mudar por Tipo de Solicitação (só o
// texto de abertura abaixo muda, ver INTRO_POR_TIPO_SOLICITACAO_FORM).
const TITULO_FORM_FIXO = "FORMULÁRIO DE ENCAMINHAMENTO DE PROCESSOS À GCA";
// Frases completas (2026-07-21) — cada uma já é o parágrafo inteiro, sem
// sufixo comum concatenado depois.
// Negrito só em "Notificação de Pagamento e emissão de DAE" / "Solicitação de
// Parcelamento" — não na frase toda.
const INTRO_POR_TIPO_SOLICITACAO_FORM = {
  notif: "À Gerência de Controle da Arrecadação – GCA, para <b>notificação de pagamento e emissão de DAE</b> em decorrência de aplicação de penalidade de multa, nos termos a seguir:",
  parc: "À Gerência de Controle da Arrecadação – GCA, para análise da <b>Solicitação de Parcelamento</b> de débito referente à penalidade de multa, nos termos a seguir:",
};

function imprimeFormularioDae(){
  const e = emissor();
  if(!e){ abreModalEmissor(); return; }
  const v = id => document.getElementById(id).value.trim();
  const infracaoVal = document.getElementById("fd-infracao").value;
  const sementes = infracaoVal === "Defesa Vegetal / Sementes e Mudas";
  const tipoSolicitacao = document.getElementById("fd-tipo-solicitacao").value;
  const tipoValor = document.getElementById("fd-tipo-valor").value;

  const faltas = [];
  if(!tipoSolicitacao) faltas.push("Tipo de solicitação");
  if(!infracaoVal) faltas.push("Infração à legislação");
  if(!v("fd-processo")) faltas.push("Número do Processo");
  if(!v("fd-ai")) faltas.push("Auto de Infração nº");
  if(!v("fd-doc")) faltas.push("CPF/CNPJ");
  if(!v("fd-nome")) faltas.push("Nome / Razão Social");
  if(!v("fd-notif")) faltas.push("Data de Notificação");
  if(!v("fd-valor") || !tipoValor) faltas.push("Valor e Tipo");
  if(!v("fd-pais")) faltas.push("País");
  if(!v("fd-cep")) faltas.push("CEP");
  if(!v("fd-logradouro")) faltas.push("Logradouro");
  if(!v("fd-numero")) faltas.push("Número");
  const paisBR = (document.getElementById("fd-pais").dataset.codigo || "BR") === "BR";
  if(paisBR && !v("fd-bairro")) faltas.push("Bairro");
  if(!v("fd-mun")) faltas.push("Município/UF");
  if(!v("fd-esec")) faltas.push("ESEC");
  if(faltas.length){ mostraErro("form", "Preencha: " + faltas.join(", ") + "."); return; }

  const camposInvalidos = ["fd-sei","fd-processo","fd-ai-data","fd-notif","fd-doc","fd-esec","fd-cep","fd-vlr-desconto"]
    .filter(id => document.getElementById(id).classList.contains("invalido"));
  if(camposInvalidos.length){ mostraErro("form", "Corrija os campos destacados em vermelho antes de imprimir."); return; }
  mostraErro("form", "");

  const dataOuVazio = (iso_) => iso_ ? dataBR(iso_) : "";
  const dinheiro = (id) => v(id) ? fmtBRL.format(numeroForm(v(id))) : "";
  const celula = (rotulo, valor, extra) => `<td${extra || ""}><span class="frot">${rotulo}</span> ${valor || ""}</td>`;

  document.getElementById("printheader").innerHTML = `
    <img class="doc-brasao" id="img-brasao" src="img/brasao-mg.png" alt="Brasão de Minas Gerais">
    <div class="doc-inst">
      <div class="inst1">GOVERNO DO ESTADO DE MINAS GERAIS</div>
      <div class="inst2">INSTITUTO MINEIRO DE AGROPECUÁRIA - IMA</div>
      <div class="inst3">GERÊNCIA DE CONTROLE DA ARRECADAÇÃO - GCA</div>
    </div>
    <img class="doc-carimbo" src="img/carimbo-pagina.png" alt="Carimbo IMA">`;

  const gt = gtDoFormulario();
  const receita = RECEITA_POR_INFRACAO_FORM[infracaoVal] || "";
  const gerenciaNome = GERENCIA_NOME_POR_GT[gt] || "";
  // Negrito só na sigla (GDA/GDV/GIP) e no código da Receita (57/58/59/60) —
  // nome da gerência e nome da infração ficam sempre em peso normal.
  const celulaGerenciaInfracao = `
    <td style="width:55%">${gerenciaNome} - <b>${gt}</b></td>
    <td style="width:45%"><b>${receita}</b> - ${infracaoVal}</td>`;

  const dinheiroValor = tipoValor === "REAL" ? fmtBRL.format(numeroForm(v("fd-valor")) || 0) : `${v("fd-valor")} UFEMG`;
  const rotuloValor = tipoValor === "UFEMG" ? "Valor em UFEMG:" : "Valor em Reais:";

  // Impressão mostra o nome completo do País, não a sigla de 3 letras usada
  // na busca da tela — agora sobra espaço de sobra na tabela pra isso.
  const paisCodigoImpressao = document.getElementById("fd-pais").dataset.codigo || "BR";
  const paisNomeCompleto = (PAISES.find(p => p.codigo === paisCodigoImpressao) || {}).nome || v("fd-pais");

  const ehCR = (e.ua || "").toUpperCase().startsWith("CR ");
  const blocoPreenchido = `
      <div>Data: ${dataBR(iso(hoje()))}</div>
      <div class="fass-linha">
        _________________________________________<br>
        ${capitalizaNome(e.nome)} — ${maspFormatado(e.masp)}<br>
        <small>${e.ua}</small>
      </div>`;
  const blocoVazio = (legenda) => `
      <div>Data: _____/_____/_____</div>
      <div class="fass-linha">
        _________________________________________<br>
        <small>${legenda}</small>
      </div>`;

  // Cada campo com valor potencialmente longo (SEI, Processo, CPF/CNPJ,
  // Nome/Razão Social, Logradouro) ocupa a linha inteira sozinho — só campos
  // curtos e de formato fixo (datas, código, CEP, número) dividem linha,
  // pra garantir que nenhum campo quebre em duas linhas na impressão.
  // Cada grupo de colunas é uma <table> separada (não uma tabela só com
  // colspans variados): o layout automático de tabela do navegador unifica a
  // largura das colunas em TODAS as linhas da mesma tabela mesmo com colspan
  // diferente, então um % numa linha vazava e desalinhava as outras. Tabelas
  // separadas isolam cada grupo (ver #printdoc .ftab + .ftab no CSS pra
  // remover a borda duplicada na emenda entre elas).
  document.getElementById("printdoc").innerHTML = `
    <div class="ftit">${TITULO_FORM_FIXO}</div>
    <div class="fsec">RESERVADO À UNIDADE SECCIONAL/REGIONAL/GERÊNCIAS/CÂMARA</div>
    <p class="fintro">${INTRO_POR_TIPO_SOLICITACAO_FORM[tipoSolicitacao]}</p>
    <table class="ftab">
      <tr class="fcab"><td style="width:55%">Gerência Responsável</td><td style="width:45%">Infração à legislação de</td></tr>
      <tr>${celulaGerenciaInfracao}</tr>
    </table>
    <div class="fsec">IDENTIFICAÇÃO DO PROCESSO, DA MULTA E DO AUTUADO</div>
    <table class="ftab"><tr>${celula("SEI:", v("fd-sei"))}${celula("Processo:", v("fd-processo"))}</tr></table>
    <table class="ftab"><tr>${celula("Número do Auto de Infração:", v("fd-ai") + (v("fd-serie") ? `　Série: ${v("fd-serie")}` : ""))}${celula("Data emissão:", dataOuVazio(v("fd-ai-data")))}</tr></table>
    <table class="ftab"><tr>${celula("Data da notificação:", dataOuVazio(v("fd-notif")))}${celula(rotuloValor, dinheiroValor)}${(sementes && tipoValor === "REAL") ? celula("Valor com desconto (R$):", dinheiro("fd-vlr-desconto")) : ""}</tr></table>
    <table class="ftab"><tr>${celula(document.getElementById("lbl-fd-doc").textContent.replace(" *",":"), v("fd-doc"), ' colspan="2"')}</tr></table>
    <table class="ftab"><tr>${celula(document.getElementById("lbl-fd-nome").textContent.replace(" *",":"), v("fd-nome"), ' colspan="2"')}</tr></table>
    <table class="ftab"><tr>${celula("País:", paisNomeCompleto)}${celula("CEP:", v("fd-cep"))}</tr></table>
    <table class="ftab"><tr>${celula("Logradouro:", v("fd-logradouro"))}${celula("Número:", v("fd-numero"))}</tr></table>
    <table class="ftab"><tr>${celula("Complemento:", v("fd-complemento"))}${celula("Bairro:", v("fd-bairro"))}</tr></table>
    <table class="ftab"><tr>${celula("Município/UF:", v("fd-mun"))}<td>${v("fd-esec")}</td></tr></table>
    <div class="fass">
      <div class="fass-col">${ehCR ? blocoVazio("Assinatura e Carimbo/Responsável") : blocoPreenchido}</div>
      <div class="fass-col">${ehCR ? blocoPreenchido : blocoVazio("Assinatura e Carimbo / Câmara de Recursos")}</div>
    </div>
    <div class="fsec">RESERVADO À GERÊNCIA DE CONTROLE DA ARRECADAÇÃO</div>
    <table class="ftab fgca">
      <tr class="fcab"><td>Número do DAE</td><td>Valor em Reais</td><td>Data de Emissão</td><td>Data de validade</td></tr>
      ${[1,2,3,4,5].map(() => `<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>`).join("")}
    </table>`;

  const imgBrasao = document.getElementById("img-brasao");
  imgBrasao.onerror = () => { imgBrasao.onerror = null; imgBrasao.src = BRASAO_FALLBACK; };
  const imagens = [...document.querySelectorAll("#printheader img")];
  Promise.all(imagens.map(img => (img.complete && img.naturalWidth > 0) ? Promise.resolve() :
    new Promise(resolve => { img.addEventListener("load", resolve, { once: true }); img.addEventListener("error", resolve, { once: true }); })
  )).then(() => window.print());
}

definirPaisForm("BR");
atualizaCamposPorInfracaoForm();

// O ícone nativo do calendário, em alguns Chrome/Edge, entra na sequência de
// Tab — o usuário NUNCA quer isso, só clique do mouse deve abrir o seletor.
// Escondemos o ícone nativo (CSS) e trocamos por um botão próprio com
// tabindex="-1", que por definição nunca recebe foco via teclado.
function blindarIconeCalendario(input){
  if(input.dataset.calBlindado) return;
  input.dataset.calBlindado = "1";
  const wrap = document.createElement("span");
  wrap.className = "data-wrap";
  input.parentNode.insertBefore(wrap, input);
  wrap.appendChild(input);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "data-abrir-calendario";
  btn.tabIndex = -1;
  btn.title = "Abrir calendário";
  // SVG embutido (não emoji) — mesmo ícone "calendário" escolhido pelo
  // usuário nos outros apps; sem depender de fonte de ícones externa.
  btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><rect x="4" y="5" width="16" height="16" rx="2"/><line x1="16" y1="3" x2="16" y2="7"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="4" y1="11" x2="20" y2="11"/><circle cx="8" cy="15.5" r=".6" fill="currentColor" stroke="none"/><circle cx="12" cy="15.5" r=".6" fill="currentColor" stroke="none"/><circle cx="16" cy="15.5" r=".6" fill="currentColor" stroke="none"/></svg>';
  btn.addEventListener("click", () => { try { input.showPicker(); } catch(e){} });
  wrap.appendChild(btn);
}
document.querySelectorAll('input[type="date"]').forEach(blindarIconeCalendario);

// Regra padrão do app (promovida de #form-fdae pra TODO o documento —
// 2026-07 — vale também nas calculadoras AI/Leite/DAE): Tab num
// <input type=date>, DEPOIS de dia+mês+ano já preenchidos, pode parar no
// ícone do calendário do Chrome antes de ir pro próximo campo. Só
// intercepta quando o valor já está completo (`value` é uma data válida):
// enquanto o usuário ainda está preenchendo dia/mês/ano, o Tab precisa
// continuar navegando ENTRE ESSES SEGMENTOS normalmente (nativo do
// navegador) — interceptar cedo demais quebra isso. Delegado no document:
// vale pra qualquer campo de data, atual ou futuro, sem precisar registrar
// campo por campo.
document.addEventListener("keydown", e => {
  if(e.key !== "Tab" || e.target.tagName !== "INPUT" || e.target.type !== "date") return;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) return;
  const focaveis = [...document.querySelectorAll("input, select, button, textarea, [tabindex]")]
    .filter(el => !el.disabled && el.tabIndex !== -1 && el.offsetParent !== null);
  const idx = focaveis.indexOf(e.target);
  if(idx === -1) return;
  const alvo = e.shiftKey ? focaveis[idx - 1] : focaveis[idx + 1];
  if(alvo){ e.preventDefault(); alvo.focus(); }
});

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
    html += `<tr><td>${mesAnoBR(m)}</td><td>${v === undefined ? "—" : v.toFixed(2).replace(".",",")}</td></tr>`;
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
document.getElementById("lt-validade").min = iso(hoje());
document.getElementById("dae-validade-orig").max = iso(hoje());
document.getElementById("dae-validade-orig").min = DATA_MINIMA;
document.getElementById("dae-validade-nova").min = iso(hoje());

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
trocaModo("home");
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
