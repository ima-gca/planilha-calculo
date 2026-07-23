# Handoff Planilha de Cálculo Web — 2026-07-23

## Estado atual

- **Código-fonte**: `G:\Meu Drive\TELETRABALHO\Planilha de Cálculo\Claude\planilha-calculo-web\`
- **Publicado em**: `https://ima-gca.github.io/planilha-calculo/`
- **Repositório**: `ima-gca/planilha-calculo`, branch `main`, commit novo enviado (`2110272..4f086c9`)
- **⚠️ Sessão concorrente**: outra sessão (mesma máquina, dias anteriores) andou commitando neste mesmo repo em paralelo (`6a7e2aa`, `2110272` — capitalização de siglas, obrigatoriedade de Bairro no Formulário). O commit desta sessão foi aplicado por cima sem conflito, mas fique atento se as duas sessões continuarem coexistindo.

## O que foi feito nesta sessão

### Regra do Tab em datas + ícone do calendário blindado (`4f086c9`)
Trabalho que nasceu no DAE Web (sessão longa, ver `GCA_DAE\docs\handoffs\HANDOFF_DAEWeb_2026-07-23.md` no projeto irmão) e foi replicado aqui pra manter os 3 apps do IMA/GCA (DAE Web, Planilha, SiGA) consistentes:

- **Tab em `<input type=date>`**: antes só valia dentro do `#form-fdae` (Formulário de Emissão de DAE); promovido pro documento inteiro — agora cobre também as calculadoras Auto de Infração/Captação de Leite/Atualização de DAE. Só intercepta o Tab quando a data já está completa (`/^\d{4}-\d{2}-\d{2}$/`), pra não atrapalhar a navegação nativa entre os segmentos dia/mês/ano enquanto o usuário ainda está digitando.
- **Ícone do calendário**: nunca mais focável via Tab, só clique do mouse — o ícone nativo do Chrome/Edge é escondido via CSS (`::-webkit-calendar-picker-indicator{display:none}`) e substituído por um SVG próprio num botão com `tabindex="-1"`, chamando `input.showPicker()` no clique. O ícone (calendário com grade de dias) foi escolhido pelo usuário entre 8 opções mostradas numa página de comparação.

Testado ao vivo no DAE Web (mesma lógica, copiada literalmente); não testado ao vivo aqui na Planilha por falta de tooling de browser montado nesta sessão pra este app especificamente — risco baixo, mas vale um teste visual rápido na próxima vez que abrir o site.

## Decisões / contexto

- A versão da Planilha (`APP_VERSION`/`version.json`) **não foi bumpada** nesta sessão — ficou em `2026.07.21-29` (valor deixado pela sessão concorrente). Se o próximo trabalho aqui envolver mudança visual/JS, lembrar de bumpar os dois (regra do projeto: `APP_VERSION` no index.html + `version.json`, mesmo valor nos dois, senão o banner de "nova versão" dispara errado).
- `docs/` ganhou vários arquivos de apresentação (`.docx`/`.pptx`) e scripts geradores, ainda `untracked` — não são desta sessão, ninguém decidiu ainda se devem entrar no repo.

## Próximos passos

1. Conferir visualmente o ícone do calendário e o comportamento do Tab nas 3 calculadoras (Auto de Infração, Captação de Leite, Atualização de DAE) e no Formulário.
2. Decidir se os arquivos de `docs/` (apresentação) entram no repo ou ficam só locais.
