# Design System no portfólio

## Integração atual

O portfólio consome `@fradelli/ui@0.5.0`, com versão exata no manifesto e no lockfile, pelo GitHub Packages. A versão foi publicada pelo workflow Release após a integração da [PR #14](https://github.com/fradelli/design-system/pull/14), commit `13e69b2db98a81f600ca049c26b53e111a500a98`, com tag [v0.5.0](https://github.com/fradelli/design-system/releases/tag/v0.5.0).

A revisão local começou com um candidato de desenvolvimento. A integração final usa o pacote do registry; não há referência a tarball, pasta local ou versão flutuante no manifesto/lockfile.

A liberação por etapas foi autorizada explicitamente pelo mantenedor e registrada na ADR 0005 do Design System. Kaizen e Sandicts não foram migrados nem declarados validados nesta entrega; cada um exige sua própria adoção e revisão antes do upgrade.

## Responsabilidades

| Área                                   | Responsabilidade                                                                              |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `@fradelli/ui`                         | Tokens, material, sombras, bordas, hover de borda, tipografia por papel e primitivas públicas |
| Card e seus slots                      | Padding de 24 px e gap padrão na raiz; conteúdo sem recuo lateral duplicado                   |
| `src/components/shared/animated-card/` | Movimento de hover específico do portfólio sobre Card; sem material paralelo                  |
| `src/app/portfolio-theme.css`          | Escala responsiva do hero e margem das âncoras abaixo do seletor fixo                         |
| Estilos de cada seção                  | Larguras, grids, posicionamento e composição do conteúdo                                      |
| Hooks e utilitários de animação        | Estrelas, gravidade, lettering, entradas e lua/foguete                                        |
| Textarea, tooltip e toast              | Integrações locais sem equivalente público no pacote, usando tokens compartilhados            |

A pasta GlassCard e as fórmulas locais de vidro foram removidas. Títulos de seção/card e textos editoriais usam os papéis públicos. Navegação usa NavigationItem, contato usa PendingButton e o helper de classes delega a `@fradelli/ui/cn`.

Tooltip e seletor de idioma usam a superfície elevada pública. Toast usa a superfície opaca do pacote para preservar legibilidade sem fórmula própria de transparência. O seletor não acrescenta uma segunda sombra local.

## Ambiente e CSS

- React/React DOM 19.3.0, Tailwind/PostCSS 4.3.3 e Next 15.5.27 foram preservados.
- `globals.css` importa uma única vez `@fradelli/ui/styles.css`, registra o dist em `@source` e mantém keyframes e política de redução de movimento do aplicativo.
- Inter é carregada pelo aplicativo e exposta em `--font-inter`. O tema escuro permanece explícito.
- Fallback opaco e redução de transparência pertencem ao pacote. Evitar blur aninhado e usar superfície sólida quando a composição exigir.

## Conteúdo e semântica

O novo projeto Design System tem links próprios para o catálogo público e o repositório, status de catálogo publicado e descrição equivalente em PT/EN. Sandicts mantém suas informações e destino. A seção passa a chamar Projetos/Projects, preservando a âncora products.

Philosophy foi corrigido na tradução inglesa. Formação inclui links para Rocketseat e para a página pública oficial de ADS da Descomplica; o link de aulas fornecido redirecionava para autenticação. Diploma é opcional e permanece ausente até receber um endereço público. ADS continua concluído em 2025; certificado EF SET e autoavaliação B1 permanecem distintos.

## Instalação e acesso

Usar `npm ci` com a autenticação de leitura já configurada fora do repositório. `.npmrc` versionado contém somente o mapeamento de scope. Nunca incluir credenciais, comandos com tokens literais ou arquivos autenticados no Git.

Os workflows consumidores usam `NODE_AUTH_TOKEN` com o secret existente `FRADELLI_PACKAGES_TOKEN` ou token automático com acesso comprovado. Nenhum segredo ou permissão foi criado nesta entrega. O produtor publica exclusivamente pelo workflow Release; hospedar Storybook não substitui publicar o pacote.

## Validação

O gate local do candidato passou com formato, lint, tipos, estrutura, 19 testes e build. No navegador, foram conferidos PT/EN, links e validação de formulário vazio sem envio de email. Viewports de 320 px (PT/EN), 375, 640 e 768 px (EN) não apresentaram overflow interno nos cards; foco de links e organização das habilidades por Enter foram verificados.

`npm ci` e `npm run ci` passaram novamente com 0.5.0 publicada, incluindo 19 testes e build de produção. Zoom real de 200%, matriz de preferências de transparência e envio válido simulado permanecem limitações declaradas. A auditoria da versão final manteve 18 achados na árvore de tooling (17 altos e um moderado), sem correção automática nesta migração.

## Entrega e reversão

A entrega usa PR da branch de tarefa para developer e promoção separada de developer para main, ambas autorizadas pelo mantenedor. O deploy de produção depende dos checks do workflow existente.

Reverter código, CSS, manifesto e lockfile como unidade por uma nova PR, sem reescrever histórico. A referência anterior do consumidor era 0.3.0; apenas retornar a versão sem reverter a composição nova não é suficiente. Versões publicadas do pacote são imutáveis.
