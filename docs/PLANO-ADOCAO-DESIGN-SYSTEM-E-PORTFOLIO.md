# Plano de adoção do Design System e divulgação no portfólio

Data: 19/10/2026. Status: versão 0.5.0 publicada e instalada; validação final para promoção autorizada em andamento.

## Objetivo

Consumir a linguagem visual compartilhada do Fradelli Design System, remover suas duplicações no aplicativo e divulgar o catálogo público como projeto. Corrigir Philosophy e acrescentar links educacionais, mantendo equivalência entre português e inglês.

Preservar estrelas, gravidade dos ícones, sequência de apagar/escrever do lettering, animações, retrato, identidade espacial, conteúdo profissional aprovado e fluxo de contato.

## Diagnóstico verificado

- O portfólio já usa `@fradelli/ui@0.3.0`. `globals.css` importa o CSS do pacote, mas `portfolio-theme.css` ainda define material de vidro, bordas, sombras, hover e papéis tipográficos.
- `GlassCard` acrescenta `portfolio-glass portfolio-card gap-4 p-6`. A versão candidata do pacote já oferece Card com vidro padrão e padding na raiz. Migrar exige revisar os slots e compensações locais.
- O contato aplica `px-0` à raiz; About e Philosophy aplicam `px-0` aos slots. Produtos adicionam `sm:p-8` e título de até 30 px. Isso conflita com a geometria e o papel de título compartilhados.
- Navegação, seletor de idioma, ícones flutuantes, tooltip e toast também consomem material local.
- Os projetos só contêm Sandicts. O texto do link é global e específico dele; a apresentação sempre usa badge warning e exige período com início. Acrescentar somente um item causaria texto e status incorretos.
- `en-US.json` contém `philosophy`; `pt-BR.json` já contém `Filosofia`.
- Formação não possui contratos de links. EF SET já tem link próprio, que deve permanecer separado do diploma.
- O checkout do Design System declara 0.4.0, mas seu guia identifica vidro/composição como candidato ainda sem versão publicada. Publicar Storybook não comprova publicação dessa API no registry.

## 1. Dependência e sequência de adoção

1. Conferir o estado atualizado de `origin/developer`, preservar alterações locais e criar branch de implementação conforme as instruções do portfólio.
2. Conferir release, Changesets, exports, peers e disponibilidade efetiva da versão que contém vidro e composição padronizada. Não presumir número da próxima versão.
3. Validar a migração com artefato candidato no ambiente local seguindo o fluxo do pacote. Referências temporárias e tarballs não devem entrar no manifesto/lockfile finais.
4. O guia atual do pacote condiciona a publicação às evidências dos três consumidores. Registrar essa dependência e coordenar as entregas de Kaizen/Sandicts separadamente; não declarar essa condição satisfeita pela validação do portfólio ou Storybook.
5. Após release pelo workflow próprio e confirmação da versão, instalar a versão exata e atualizar o lockfile normalmente. Validar instalação com acesso existente ao GitHub Packages.
6. Encaminhar a entrega validada para `developer`; promoção a `main` em PR separada quando autorizada. Este plano não autoriza release, merge ou deploy.

## 2. Responsabilidade dos estilos

| Responsabilidade                                                           | Destino e ação                                                                                                                         |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Paleta, material, borda, sombra, blur, fallback e redução de transparência | Pacote; remover fórmulas e classes locais equivalentes                                                                                 |
| Card e seus slots, padding interno, gap e título                           | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`; tamanho padrão e superfície escolhida explicitamente quando necessário |
| Títulos de seção, corpo e interface                                        | Papéis públicos `fd-text-section`, `fd-text-body`, `fd-text-interface` e tokens do pacote                                              |
| Superfície de elementos que não são cards                                  | `fd-surface-glass` ou `fd-surface-glass-elevated`; composição adequada ao elemento                                                     |
| Largura das seções, grids, posição fixa, timeline e breakpoints            | Aplicativo, próximo do componente consumidor                                                                                           |
| Estrelas, foguete, física dos ícones, reveal e hover com movimento         | Aplicativo; hooks e utilitários existentes preservados                                                                                 |
| Título principal com escala responsiva                                     | Composição editorial do hero; avaliar papel display sem reduzir automaticamente o título atual de até 96 px para 32 px                 |
| Fontes, conteúdo, idioma, links e providers                                | Aplicativo                                                                                                                             |

Remover estilos próprios significa eliminar definições visuais compartilhadas duplicadas. Arquivos `.styles.ts` com responsabilidades reais de layout continuam necessários. Não substituir semanticamente navegação, botões flutuantes ou tooltips por Card apenas para obter vidro.

### Migração por área

- **Cards:** substituir `GlassCard` diretamente por Card e remover a pasta quando não houver consumidores. `AnimatedCard` pode continuar compondo Card somente para o movimento próprio do portfólio. Usar títulos semânticos h3 com a API disponível, preservando a hierarquia.
- **Espaçamento:** raiz padrão com 24 px e gap de 16 px; slots sem recuo duplicado. Remover compensações de padding e revisar o contato para não ficar colado às bordas. Usar 16 px apenas com densidade compacta justificável.
- **Tipografia:** trocar títulos e corpo locais por papéis compartilhados; revisar títulos de projetos hoje maiores que os demais cards. Preservar tamanho especial do hero como decisão de composição.
- **Navegação e idioma:** usar material compartilhado; manter layout, rótulos, foco, seleção e cursor pointer. Avaliar NavigationItem onde sua semântica corresponde a links reais.
- **Skills flutuantes:** alterar somente superfície e tokens visuais. Preservar botão, área interativa, posição, transformação e estado inicial sem gravidade.
- **Contato:** avaliar PendingButton para os estados localizados de envio, mantendo integração com o hook e proteção contra envio duplicado. Remover override de Input já fornecido pelo pacote.
- **Textarea, tooltip e toast:** não há exports equivalentes no pacote inspecionado. Manter integração local com tokens e superfícies públicas. Qualquer admissão de primitive nova no Design System exige escopo e validação próprios; não copiar componentes para fingir cobertura completa.
- **Helper de classes:** avaliar substituição do helper duplicado por `@fradelli/ui/cn`. Só remover dependências diretas após busca de todos os consumidores.
- **CSS global:** manter import único do pacote, política de movimento e keyframes próprios. Remover `portfolio-theme.css` somente se suas responsabilidades restantes forem realocadas, incluindo margem de âncoras e hero.

## 3. Novo projeto: Design System

Nome visível: **Design System**. Identificação no resumo: Fradelli Design System.

Proposta PT-BR:

> Criei uma biblioteca de componentes React e tokens visuais para padronizar meus projetos, com superfícies de vidro e sólidas, tipografia, espaçamento e estados acessíveis. O catálogo público no Storybook permite explorar os componentes e suas variações.

Proposta EN:

> I built a React component library and visual tokens to bring consistency to my projects, with glass and solid surfaces, typography, spacing, and accessible states. The public Storybook catalog lets you explore the components and their variations.

- Ação principal: **Explorar componentes / Explore components**, apontando para `https://fradelli.github.io/design-system/`.
- Ação secundária: **Ver repositório / View repository**, apontando para `https://github.com/fradelli/design-system`.
- Status: **Catálogo publicado / Catalog published**. Não confundir catálogo disponível com nova versão do pacote distribuída.
- Tecnologias verificadas: React, TypeScript, CSS, Tailwind CSS, Storybook e Vitest. Evitar uma lista extensa de ferramentas secundárias.
- Não afirmar adoção concluída nos três produtos nem conformidade integral de acessibilidade. Apresentar propósito e recursos verificáveis.
- Não inventar data de início: tornar período opcional; usar data somente se confirmada.
- Colocar depois de Sandicts e renomear a seção para **Projetos / Projects**, inclusive navegação. Manter o ID `products` para preservar links existentes.
- Trocar o link global por ações por projeto com identificador, href e rótulo localizado. Status e variante visual devem corresponder a cada projeto, sem warning fixo.
- Criar espaçamento explícito entre os cards; hoje a seção foi composta para um único produto. Manter cards em coluna para resumos legíveis e ações que se reorganizam em telas estreitas.

## 4. Formação, diploma e revisão editorial

- Corrigir o valor inglês para **Philosophy** na tradução; não aplicar capitalização por CSS. Revisar títulos visíveis com inicial maiúscula, preservando escrita natural em cada idioma.
- Transformar **Rocketseat** em link para `https://www.rocketseat.com.br/`, mantendo cursos e anos aprovados. A página pública foi consultada nesta etapa.
- O endereço fornecido da Descomplica é `https://aulas.descomplica.com.br/graduacao/analise-e-desenvolvimento-de-sistemas/disciplinas`. A ferramenta de consulta não conseguiu acessá-lo; não concluir que está quebrado ou que exige login sem conferir no navegador.
- Na implementação, verificar acesso sem sessão. Preferir página pública oficial da instituição/curso se o link de aulas exigir autenticação. Registrar o destino final antes de publicar.
- Separar destino da instituição, página do curso e comprovante; link de aulas não equivale a diploma.
- Preparar contrato de diploma opcional com URL e rótulo. Exibir **Ver diploma / View diploma** somente após receber e validar o documento/link público. Até lá, nenhum botão vazio ou desabilitado.
- Manter conclusão de ADS em 2025: emissão posterior do diploma não altera o ano de conclusão. Conferir dados pessoais do documento antes de publicá-lo e preferir URL verificável da instituição quando disponível.
- Manter certificado EF SET e autoavaliação B1 como evidências distintas.
- Links com rótulos descritivos, foco visível e comportamento externo consistente. Textos e nomes acessíveis equivalentes em PT/EN.

## 5. Arquivos envolvidos na implementação

Caminhos relativos ao portfólio:

| Arquivos / área                                                          | Mudança planejada                                                               |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `package.json`, `package-lock.json`                                      | Versão exata publicada e limpeza apenas de dependências comprovadamente sem uso |
| `src/app/globals.css`, `src/app/portfolio-theme.css`                     | Retirar definições duplicadas e preservar CSS específico do site                |
| `src/components/shared/glass-card/`, `animated-card/`                    | Eliminar wrapper visual redundante e preservar wrapper de movimento             |
| `src/components/shared/textarea/`, `tooltip-content/`, `toast-provider/` | Consumir tokens/superfícies sem perder semântica e comportamento                |
| `src/lib/styles/cn.ts`                                                   | Avaliar delegação ao helper público do pacote                                   |
| `src/features/portfolio/ui/components/`                                  | Migrar cards, tipografia e material; preservar layout e animações               |
| `src/features/contact/ui/components/contact-form/`                       | Composição do Card, padding, campo e estado pendente                            |
| `src/i18n/locale-switcher/`                                              | Material compartilhado com interação preservada                                 |
| `src/features/portfolio/content/personal-projects.data.ts`               | Fatos, tecnologias e destinos do novo projeto                                   |
| `src/features/portfolio/content/education.data.ts`                       | Links educacionais e comprovante opcional quando disponível                     |
| `src/features/portfolio/content/portfolio-content.types.ts`              | Contratos de ações por projeto, status, período opcional e links de formação    |
| `src/features/portfolio/content/get-portfolio-content.ts`                | Montar conteúdo localizado sem lógica editorial na renderização                 |
| `src/i18n/messages/en-US.json`, `pt-BR.json`                             | Philosophy, Projects, descrição e ações do projeto, links educacionais          |
| `docs/DESIGN-SYSTEM-PORTFOLIO.md`                                        | Atualizar versão, ownership, exceções locais e evidências reais                 |

Não criar uma camada genérica de conteúdo ou novos arquivos para cada URL. Usar os contratos e fontes próximos dos consumidores existentes.

## 6. Ordem e validação da entrega

1. Capturar referência visual atual de desktop/mobile em ambos os idiomas; confirmar versão candidata e condições de release.
2. Migrar material, composição e papéis tipográficos; revisar diferenças intencionais do hero e componentes sem equivalente.
3. Atualizar contratos e conteúdo dos projetos e da formação; corrigir Philosophy.
4. Revisar todas as seções, incluindo largura de 320 px, zoom de 200%, textos longos, quebra de badges e ações.
5. Verificar teclado, foco, contraste sobre estrelas, redução de movimento, redução de transparência e ausência de blur aninhado desnecessário.
6. Conferir idioma, âncoras, gravidade, lettering, foto, tooltip, toast e formulário com simulação de sucesso/falha, sem envio real de email.
7. Executar os checks configurados: formato, lint, tipos, estrutura, testes e build (`npm run ci`), além de diff e busca de segredos. Acrescentar testes apenas para contratos/comportamentos novos relevantes, como ações distintas e diploma ausente.
8. Registrar versão, evidências e limitações; depois de validado e autorizado, abrir PR para developer e promover por PR separada.

## Critérios de aceite e pendências

- [x] Versão correta do pacote confirmada, validada e fixada no consumidor final.
- [x] Ausência de duplicação local de vidro, hover de borda e papéis tipográficos compartilhados; estilos próprios restantes justificados.
- [x] Todos os cards usam composição e recuos do pacote, sem padding duplicado ou conteúdo encostado nas laterais.
- [x] Novo projeto com ações próprias, status correto e textos PT/EN; Sandicts mantém suas informações e link.
- [x] Philosophy corrigido e títulos revisados.
- [x] Links públicos de educação verificados; diploma só aparece quando houver destino disponível.
- [x] Identidade, interações e conteúdo aprovado preservados; verificações registradas.

Pendências atuais: link/documento futuro do diploma e limitações de validação declaradas. A release 0.5.0 foi publicada com exceção explícita registrada na ADR 0005; Kaizen e Sandicts terão adoção independente. A página pública oficial do curso da Descomplica foi definida na implementação. Essas pendências não impedem preparar a migração e o conteúdo localmente após autorização de implementação.

Na etapa original houve somente inspeção e planejamento documental. A implementação posteriormente autorizada está registrada abaixo.

## Registro da implementação local

Branch `codex/adocao-design-system-portfolio`, criada de `origin/developer`. Migração de materiais e tipografia aplicada; wrapper GlassCard removido; geometria dos cards passa ao pacote; hero e animações permanecem locais. Projetos e formação foram atualizados nos dois idiomas e Philosophy corrigido.

A URL de aulas da Descomplica redirecionou para `accounts.descomplica.com.br`; a revisão automática bloqueou a observação da página de autenticação. Foi usada a página pública oficial do curso, encontrada no site institucional. Não houve acesso à conta.

A versão publicada consultada continua 0.4.0, sem a nova composição. Foi instalado apenas no ambiente local o candidato descrito em `DESIGN-SYSTEM-PORTFOLIO.md`. Manifesto e lockfile preservados até a release correta: não integrar esta branch antes de resolver essa dependência. O diploma também aguarda o link fornecido pelo usuário.

### Validações realizadas

- `npm run ci` passou com o candidato local após restaurar as dependências do lockfile: formatação, lint sem avisos, tipos, estrutura (130 arquivos), 19 testes e build de produção.
- Navegador no build de produção: português e inglês, Philosophy, destinos do catálogo/repositório e links educacionais, formulário vazio com erros associados e foco no primeiro campo. Não houve envio de email.
- Card de projeto confirmado com padding de 24 px e título de 20 px. Conferência visual de projetos e contato no viewport desktop disponível; console sem erros.
- A revisão responsiva complementar abaixo cobre os viewports mobile/tablet. Zoom real de 200%, simulação de envio válido e matriz de redução de transparência permanecem na revisão de aceitação antes da integração.
- Manifesto e lockfile não sofreram alterações. A validação não representa uma instalação limpa da futura versão publicada.
- Sem commit, PR, merge ou deploy. Preview local em `http://127.0.0.1:3004/`.

### Revisão complementar — 19/10/2026

- O usuário limitou explicitamente a continuidade ao portfólio. Não foram inspecionados nem migrados Kaizen/Sandicts. A exigência atual de validar os três consumidores continua pendente e não foi dispensada.
- CUA com viewport explícito de 320 px: português e inglês sem overflow interno nos 24 cards; links do novo projeto quebram em linhas distintas. A largura do documento foi 305 px com scrollbar, dentro do viewport de 320 px.
- Viewports de 375, 640 e 768 px em inglês também não apresentaram overflow interno nos cards nem largura de documento maior que a área disponível. Em 375 px, todos os cards estavam contidos horizontalmente no viewport. O teste de 640 px exercita reflow, sem afirmar zoom real de 200%.
- Revisão visual dos cards de projetos, competências e Philosophy; foco visível de 2 px no link View repository. Organização das habilidades ativada por Enter, com aria-pressed=true em todos os itens, e desativada pelo teclado ao terminar.
- Removida a sombra extra do seletor de idioma, que passa a usar somente a sombra da superfície elevada do pacote. Textarea continua como componente local sem equivalente público, com tokens compartilhados.
- PR #14 consultada no commit `1ac33a1c25a4e7d2584fae048055dbb3b53fecbc`: propõe 0.5.0, sem checks associados; package-lock.json ainda declara 0.4.0 tanto no topo quanto em packages[""].version. O runbook do pacote exige alinhar essa versão antes do merge. Nenhuma alteração foi feita nessa PR ou no pacote.

- Após remover a sombra redundante, `npm run format:check`, `npm run lint` e `npm run build` passaram novamente. Preview de produção reiniciado na porta 3004, sem erros no console. O estilo computado do seletor confirmou a sombra do pacote (0 8px 32px), sem shadow-lg local. O override temporário de viewport foi removido.

## Liberação por etapas autorizada

O mantenedor autorizou explicitamente publicar 0.5.0 com o pacote e o portfólio validados, deixando Kaizen e Sandicts para entregas futuras. A ADR 0005 do produtor substitui o pré-requisito anterior somente para esta liberação, sem alegar validação dos outros aplicativos.

A PR #14 foi integrada no commit 13e69b2db98a81f600ca049c26b53e111a500a98. O workflow Release 39308739417 publicou o pacote; CI/Pages 39308739428 passou. Registry, tag v0.5.0 e release foram conferidos. Manifesto e lockfile do portfólio agora fixam 0.5.0 a partir de npm.pkg.github.com; o candidato local foi substituído.

### Validação definitiva com o pacote publicado

`npm ci` e `npm run ci` passaram com @fradelli/ui 0.5.0: formatação, lint sem avisos, tipos, estrutura (130 arquivos), 19 testes e build. O lockfile aponta para npm.pkg.github.com e sua integridade corresponde à versão consultada no registry, sem tarball local.

A auditoria final mantém o passivo de 18 achados na árvore de ferramentas (17 altos e um moderado, nenhum crítico), como antes da migração. Nenhuma correção forçada foi aplicada. A integração segue por PR para developer e promoção separada para main, autorizadas pelo mantenedor.
