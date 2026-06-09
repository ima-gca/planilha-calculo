# Planilha de Cálculo — IMA/GCA (versão web)

Protótipo web da **Planilha de Cálculo v4.0** (Excel/VBA) do IMA — Instituto Mineiro de
Agropecuária, Gerência de Controle da Arrecadação (GCA). Realiza a atualização de valores
de créditos com multa e correção monetária pela taxa SELIC, em três modalidades:

| Modalidade | Crédito | Regra |
|---|---|---|
| **Auto de Infração** | Não tributário | Correção SELIC (sem multa), conversão UFEMG→R$ quando aplicável |
| **Captação de Leite** | Tributário | 0,15 UFEMG/1000 L + multa por atraso + SELIC |
| **Atualização de DAE** | Tributário (GTA/PTV) | Multa por atraso + SELIC |

**Multas por atraso**: 0,15%/dia (até 30 dias) · 9% (31–60) · 12% (acima de 60).
**Correção**: soma das taxas SELIC mensais fechadas, do mês seguinte ao vencimento até o mês
anterior ao da atualização, mais **1% fixo** para o mês da atualização.

## Como usar

Abra `index.html` em qualquer navegador (duplo clique) ou acesse a versão hospedada.
Não requer instalação. A taxa SELIC é buscada ao vivo na
[API do Banco Central](https://dadosabertos.bcb.gov.br/dataset/4390-taxa-de-juros---selic-acumulada-no-mes)
(série 4390); sem internet, é usada a cópia local embutida em `dados.js`.

Os dados do emissor (MASP, nome, unidade, município) ficam salvos **somente no navegador**
(localStorage) e aparecem apenas no rodapé do documento impresso.

## Manutenção anual

- **UFEMG**: acrescentar o valor do novo exercício no bloco `ufemg` de [`dados.js`](dados.js).
- **Feriados**: a lista vai até 2030; estender o bloco `feriados` quando necessário.
- `dados.js` pode ser regenerado a partir do Excel com `gera_dados.py` (fora deste repositório).

## Status

⚠️ **Protótipo em validação** — os resultados devem ser conferidos com a Planilha de Cálculo
oficial (Excel) antes de uso em produção.

Suporte: GCA — gca@ima.mg.gov.br
