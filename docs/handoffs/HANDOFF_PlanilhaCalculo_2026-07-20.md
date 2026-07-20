# Handoff Planilha de Cálculo Web — 2026-07-20

## Estado atual

- **Código-fonte**: `G:\Meu Drive\TELETRABALHO\Planilha de Cálculo\Claude\planilha-calculo-web\`
- **Publicado em**: `https://ima-gca.github.io/planilha-calculo/` (org GitHub `ima-gca`)
- **Preview local**: `.claude\launch.json` → `python -m http.server 8765`
- **Continuação**: as mudanças abaixo estão no working tree, **ainda não commitadas nem enviadas** (`git status` mostra `css/main.css`, `index.html`, `js/app.js`, `version.json` modificados; `docs/` novo com material de apresentação, não relacionado a esta sessão).

---

## O que foi feito nesta sessão

### 1. Reversão da SELIC: 2 casas, série mensal 4390 direto do BC
A pedido do usuário, abandonada a composição da série diária (11) em mensal com 6 casas. Agora usa a **série 4390** (SELIC acumulada no mês, % a.m., 2 casas) — mesma fonte do VBA original — e o valor entra exatamente como o BC publica, sem recálculo. Snapshot offline embutido (`SELIC_SNAPSHOT`) regravado com os 258 valores oficiais (jan/2005 a jun/2026, baixados da API na sessão). `pct()` voltou a 2 casas; "Valor Correção" trocado de `fmtBRLSmart` (6 casas) pra `fmtBRL.format` (2 casas) nos 6 pontos de uso (AI/Captação/Substituição, tela e impressão). `fmtBRLSmart` continua valendo só pras conversões UFEMG.

Mesma reversão aplicada em paralelo no **DAE Web** (`GCA_DAE/web/js/calculo-selic.js`), pra manter os dois apps consistentes — ver handoff separado do DAE Web.

### 2. Novo modo "Formulário de Emissão de DAE"
App ganhou uma tela inicial (`trocaModo('home')`) com dois cartões — **Planilha de Cálculo** (as abas de sempre; a antiga aba "Início" virou "Orientações") e **Formulário de Emissão de DAE** (novo, com Ajuda própria). Mecânica: `body[data-modo]` controla quais botões da barra de abas aparecem (CSS `button[data-modo=...]`); botão "⌂ Início" volta pra home; título do header muda por modo.

O Formulário é a versão digital do documento oficial "Formulário para emissão de DAE e encaminhamento de parcelamento" (13/10/2022 — fonte em `.claude\Formulário para emissão de DAE - 13-10-2022.docx`, inserida pelo usuário nesta sessão). Campos: tipo de solicitação, identificação do processo/autuado, histórico, infração à legislação, informações da multa (Original/Com Desconto/UFEMG). Botão "Imprimir / Gerar PDF" (`imprimeFormularioDae()`) monta o documento fiel ao modelo — checkboxes `( X )`, timbre IMA/GCA, assinatura com o emissor identificado, seção "Reservado à GCA" em branco (3 blocos), como no papel. Validação leve antes de imprimir.

⚠️ Pegadinha de CSS encontrada: `.linha{display:flex}` só se aplica **dentro de `<form>`** (regra `form .linha`) — os campos do Formulário precisaram ser envolvidos num `<form>` pra não empilhar verticalmente.

Testado headless via Playwright (Edge): fluxo completo preenchendo todos os campos, screenshot do documento impresso conferido visualmente — igual ao modelo original.

### 3. Version bump
`APP_VERSION` (index.html) e `version.json` → `2026.07.20-2` nos dois. Lembrete: **sempre bumpar os dois juntos**, é o que dispara o banner "nova versão disponível" pros usuários com a aba aberta.

---

## Decisões tomadas (ainda não em memória permanente até este handoff)

- Layout de "duas funcionalidades" resolvido com tela inicial de escolha (não um seletor dentro de uma aba única) — as calculadoras têm campos/regras próprias demais pra fundir sem risco.
- `docs/` com apresentação (.docx/.pptx) e scripts geradores apareceu untracked no `git status` — não é desta sessão, não mexer sem confirmar com o usuário se deve entrar no repo.

## Próximos passos

1. **Decidir e executar o commit/push** das 4 mudanças de código (SELIC + Formulário + version bump) pro `ima-gca/planilha-calculo` no GitHub, publicando no Pages.
2. Avaliar se `docs/` (material de apresentação) deve ser versionado também, ou fica só local.
