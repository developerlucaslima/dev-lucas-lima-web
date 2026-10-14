# Plano de arquitetura, organização e qualidade

## Status e escopo

- Avaliação: 12/10/2026. Projeto: `dev-lucas-lima-web`.
- Base: branch `main`, commit `95569f7`; checkout inicialmente limpo.
- Status: A01 integrada em main pela PR histórica #12; A02–A07 integradas em developer pelas PRs #13–#16. A08–A22 em revisão na PR #17, com A20 concluída após registrar dependências diretas e corrigir o lint/formatter. A proteção WAF/rate limit de A05 continua pendente de evidência. Sem promoção para main ou deploy.
- Entrega inicial: este documento de planejamento. A01 autorizada em 12/10/2026; evidências registradas em docs/tasks/A01-security-update.md. A02 e A03 autorizadas em 12/10/2026; evidências desta implementação registradas na seção 16.
- Referência: arquitetura do Kaizen, especialmente semântica, organização de componentes, App Router fino, Server/Client e validação proporcional.
- Kaizen utilizado somente para leitura, sem arquivos, registros de trabalho ou dependências adicionados nele.
- Textos, experiências, fotos, idioma inglês e identidade visual permanecem como base de regressão. Atualização editorial será outra etapa.

## 1. Conclusão

O projeto deve continuar como aplicação única Next.js. A reorganização deve separar conteúdo, componentes, animações e envio de contato. Aplicar as convenções do Kaizen sem reproduzir necessidades específicas de treino, alimentação, banco e workspace.

Priorizar atualização técnica, validação server do contato, falhas previsíveis, componentes por responsabilidade e encerramento dos recursos das animações. Não há consumidor que justifique backend separado, Prisma, PostgreSQL, autenticação, cliente HTTP interno ou quatro camadas obrigatórias para toda seção.

### Base já adequada

- App Router, página principal com composição simples e layout Server Component.
- TypeScript com strict/noEmit/bundler, alias @/\* e lockfile versionado.
- Tailwind 4, next/image, next/font, React Hook Form e Zod.
- Server Action para contato, sem REST interna; env ignorado pelo Git.
- Links externos com noopener/noreferrer.
- Hooks de resize, organização/flutuação e lua/foguete já possuem partes do cleanup; preservar essas garantias na extração.

## 2. Diagnóstico com evidências

Os caminhos abaixo são os atuais. As linhas correspondem à base inspecionada. Prioridade indica impacto e ordem; problemas de runtime inferidos por leitura exigem reprodução.

| ID  | Prioridade | Evidência                                                               | Problema/consequência                                                                                     | Plano                                                                                     |
| --- | ---------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| A01 | Crítica    | package.json/lock: Next 15.2.3, React 19.0.0                            | Next na faixa afetada pelo advisory oficial de execução remota em RSC; exposição em produção desconhecida | Atualizar versões corrigidas e compatíveis antes de publicar refatoração                  |
| A02 | Alta       | src/app/actions/contact-me.ts:7                                         | Tipo TypeScript substitui validação runtime; schema só no cliente                                         | Concluída localmente: schema compartilhado e parse server de entrada unknown              |
| A03 | Alta       | src/app/actions/contact-me.ts:20                                        | Interpolação de conteúdo recebido diretamente em HTML                                                     | Concluída localmente: conteúdo enviado como texto simples                                 |
| A04 | Alta       | action:39 e use-contact-me-submit                                       | SDK retorna à UI e hook não captura exceções                                                              | Concluída localmente: resultado próprio serializável, falhas tipadas e fallback seguro    |
| A05 | Alta       | action de contato                                                       | Sem controle de abuso local                                                                               | Limite local de payload aplicado; rate limit/WAF depende de confirmação da infraestrutura |
| A06 | Alta       | contact-me-form.tsx:52                                                  | Erro de email depende de errors.name                                                                      | Concluída localmente: erro por campo associado com aria-invalid/describedby               |
| A07 | Alta       | stars-background.tsx:161,169,173                                        | Cleanup só cancela primeiro timer; cadeia e remoções sem rastreamento                                     | Cancelar todos e impedir reagendamento após unmount                                       |
| A08 | Alta       | use-typewriter, fade-in, fade-slide-y, scroll-\* e stagger-fade-slide-x | Recursos criados sem cleanup correspondente                                                               | Encerrar recursos por instância; remount/Strict Mode                                      |
| A09 | Média      | components/sections e about-content                                     | Todas as seções client importam grande objeto english                                                     | Conteúdo server e ilhas client menores                                                    |
| A10 | Média      | config/english-config.ts                                                | Textos, ícones React, campos e datas na importação misturados                                             | Conteúdo serializável, apresentação e contratos separados                                 |
| A11 | Média      | contact-me-section.tsx:23                                               | ID about duplicado                                                                                        | ID contact e âncoras únicas                                                               |
| A12 | Média      | ui/hard-skills.tsx                                                      | Div clicável, classe W-[120px] e nome dependente de hover                                                 | Botão com teclado, aria-pressed/nome e largura válida                                     |
| A13 | Média      | about-content links sociais                                             | Ícones sem nome acessível explícito                                                                       | aria-label ou texto acessível                                                             |
| A14 | Média      | stars-background.tsx:87                                                 | Tween por estrela/frame e partículas proporcionais à área sem teto                                        | Reutilizar setters/tweens, limite medido e pausa adequada                                 |
| A15 | Média      | fade-slide-y e stagger-fade-slide-x                                     | Delay/triggerOffset ausentes das dependências dos efeitos                                                 | Dependências completas, callbacks estáveis                                                |
| A16 | Média      | use-typewriter.tsx                                                      | Ref de div usada em span; timeline infinita sem cleanup                                                   | Ref correta e encerramento                                                                |
| A17 | Média      | utils/calculate-duration.ts                                             | Dia do mês ignorado; anos.meses não é duração decimal                                                     | Cálculo determinístico e apresentação textual separada                                    |
| A18 | Média      | globals.css:9 e layout                                                  | Tokens Geist, fonte carregada Inter                                                                       | Variável Inter integrada; mono apenas com consumidor                                      |
| A19 | Média      | package.json e deployment.yml                                           | Sem gates explícitos de tipos/testes/formato; CI só push main; npm install e Vercel latest                | CI em PR, install frozen e ferramentas pinadas                                            |
| A20 | Média      | button.tsx, package.json e lock                                         | Slot importado sem dependência direta; Prettier indireto; eslint-config-next ausente do lock              | Dependências diretas e lint autossuficiente                                               |
| A21 | Baixa      | alien e hooks alien/rotate-slide-x/stagger-slide-y                      | Consumidores não encontrados em src                                                                       | Remover somente após busca final em todo o código/configuração                            |
| A22 | Média      | animações/estilos                                                       | Política reduced-motion não encontrada                                                                    | Conteúdo estático legível e efeitos contínuos suspensos                                   |

### Versões observadas no lockfile

Next 15.2.3; React/React DOM 19.0.0; TypeScript 5.8.2; ESLint 8.57.1; Prettier 3.5.3; GSAP 3.12.7; Resend 4.2.0; @next/env 15.2.4. npm com package-lock versão 3. node_modules ausente.

Não foi feita instalação, build, execução da interface, teste de rede, envio de email ou deploy. A versão do repositório é fato; versão publicada, exploração, WAF e métricas reais são desconhecidos.

## 3. Arquitetura proposta

| Área                         | Responsabilidade                                    | Dependências                                     |
| ---------------------------- | --------------------------------------------------- | ------------------------------------------------ |
| src/app                      | Rota, layout, metadata e composição                 | UI, conteúdo server e composição do contato      |
| features/portfolio/content   | Conteúdo público tipado, sem React                  | Tipos e funções puras                            |
| features/portfolio/ui        | Seções e interação do portfólio                     | Props, UI compartilhada e animações              |
| features/contact/contracts   | Schema de entrada e resultado público               | Zod e tipos próprios; sem SDK/env/Next/React     |
| features/contact/application | Caso de uso e porta pequena de envio                | Contratos e porta; sem SDK/Next                  |
| features/contact/data        | Adaptador Resend                                    | Porta, SDK e env; server-only                    |
| features/contact/actions     | Fronteira pública Next e composição server          | Schema, aplicação, origem e proteção operacional |
| features/contact/ui          | Formulário, pending e cena                          | Contratos, referência à action e UI              |
| components/shared            | Primitivas/wrappers com consumidores reais          | React, bibliotecas de UI e lib neutra            |
| lib                          | Env server, classes e integração GSAP compartilhada | Bibliotecas; sem depender de features            |
| scripts                      | Gates de convenções                                 | Arquivos do projeto; sem import pela aplicação   |

Não criar domain apenas para repetir Kaizen. Se surgirem invariantes puras, criar com seu primeiro consumidor. Conteúdo estático não precisa de repositório, porta ou caso de uso genérico.

Client pode importar referência a módulo use server pelo mecanismo próprio do Next. O gate precisa permitir essa exceção e bloquear UI→data/env/composição server. Schema compartilhado é contrato, não entidade de domínio. Action valida input público; aplicação recebe comando validado, sem duplicação automática de parse.

### Organização

- Componentes em pasta própria com mesmo nome, kebab-case. App Router mantém page/layout nos nomes especiais do Next.
- Props, hooks, constantes e estilos pertencem ao consumidor. .ts quando não há JSX.
- components/ contém pastas, sem componentes soltos; imports explícitos, sem barrel global.
- Não criar diretórios vazios nem arquivos auxiliares sem responsabilidade real.
- .styles.ts apenas para classes densas/reutilizadas; CSS Modules para composição local quando necessário. Não extrair cada className.

### Separação explícita de responsabilidades

Diretriz confirmada pelo usuário e autorizada para implementação em 13/10/2026: separar componente, estilo, hook, utilitário, tipos e constantes, com nomes semânticos e propriedade local clara. A aplicação e suas evidências estão registradas na seção 16.

| Arquivo                     | Responsabilidade                                                            | Não deve conter                                                                                               |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| component-name.tsx          | Renderização, composição, atributos acessíveis e ligação com hook           | Algoritmos de layout, construção de partículas, timers/efeitos extensos ou blocos densos de variantes/classes |
| component-name.types.ts     | Props e contratos próprios da apresentação                                  | Efeitos, implementação, configuração de SDK ou tipos globais sem dono                                         |
| component-name.styles.ts    | Classes Tailwind nomeadas por elemento e variantes visuais                  | Estado React, DOM, envio, validação ou conteúdo editorial                                                     |
| component-name.module.css   | Regras CSS locais/keyframes/pseudo-elementos que se expressem melhor em CSS | Tema global duplicado, conteúdo ou lógica de negócio                                                          |
| component-name.constants.ts | Valores fixos locais e opções nomeadas                                      | Resultado calculado na importação, segredo, função React ou dados pessoais duplicados                         |
| component-name.utils.ts     | Transformações e cálculos puros usados pelo componente                      | Hooks, DOM, timers, SDK, rede, env ou mutação externa                                                         |
| hooks/use-purpose.ts        | Estado, efeitos, refs, assinatura e cleanup de recursos                     | JSX, classes extensas, texto editorial ou algoritmo puro que possa ser isolado                                |
| component-name.test.tsx     | Comportamento observável relevante da UI                                    | Teste que apenas confirma estrutura interna ou nomes de classes                                               |

Cada arquivo nasce quando existir sua responsabilidade. Separar bem não significa produzir arquivos vazios ou fazer toda função virar módulo. Componentes triviais podem continuar com classes curtas diretamente no JSX; composição densa, repetida ou com variantes deve ter arquivo de estilos. Se styles.ts e module.css coexistirem, registrar a finalidade distinta de cada um e evitar duas fontes para a mesma regra.

Estrutura de exemplo, ilustrativa (não criar todos esses arquivos automaticamente):

```text
contact-form/
  contact-form.tsx
  contact-form.types.ts
  contact-form.styles.ts
  contact-form.constants.ts
  contact-form.test.tsx
  hooks/
    use-contact-form.ts
  components/
    contact-field/
      contact-field.tsx
      contact-field.types.ts
      contact-field.styles.ts
```

ContactField só será extraído se a responsabilidade de campo/erro justificar o componente; o exemplo não adiciona um requisito de componente novo ao inventário. A pasta do pai não centraliza tipos/estilos privados de seus filhos.

### Complemento do inventário: estilos e utilitários

Estes arquivos entram no mesmo incremento do componente responsável. A fonte continua sendo o código atual identificado na avaliação. Não criar nem mover nada agora.

| Etapa | Ação/caminho exato                                                                                                            | Extração prevista                                                                       | Integração e verificação                                                                     |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| P2    | Criar src/features/contact/ui/components/contact-form/contact-form.styles.ts                                                  | Classes de layout do formulário, campos, erro, footer e botão                           | ContactForm importa estilos nomeados; mesma aparência e foco                                 |
| P3    | Criar src/components/shared/button/button.styles.ts                                                                           | buttonVariants e classes da primitiva                                                   | Button mantém API; preservar consumers de buttonVariants e tipos de variantes                |
| P3    | Criar src/components/shared/tooltip-content/tooltip-content.styles.ts                                                         | Classes densas e estados de abertura/fechamento                                         | TooltipContent legível; aparência/foco/reduced-motion                                        |
| P3/P4 | Criar src/features/portfolio/ui/components/about-content/about-content.styles.ts                                              | Layout de texto, foto, perfil e links                                                   | AboutContent compõe classes por nomes de elemento; visual equivalente                        |
| P3/P4 | Criar src/features/portfolio/ui/components/journey-section/journey-section.styles.ts                                          | Timeline, cartão e alternância visual                                                   | Índice só escolhe lado visual; não vira regra de conteúdo                                    |
| P3/P4 | Criar src/features/portfolio/ui/components/philosophy-section/philosophy-section.styles.ts                                    | Layout de seção e grupo de cards                                                        | Conteúdo separado e espaçamento preservado                                                   |
| P4    | Criar src/features/contact/ui/components/contact-scene/contact-scene.styles.ts                                                | Layout responsivo do formulário e da ilustração                                         | Scene sem blocos de classes densos; mobile/desktop equivalentes                              |
| P4    | Criar src/features/portfolio/ui/components/about-section/components/skills-field/components/skill-badge/skill-badge.styles.ts | Tamanho, foco, hover e estado organizado                                                | Corrigir W-[120px] mantendo estado acessível; CSS não decide estado                          |
| P4    | Criar src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.utils.ts                        | Cálculo de posições de grade e limites de flutuação                                     | Recebe dimensões/quantidade explícitas; retorna posições nomeadas, sem DOM/GSAP              |
| P4    | Criar src/features/portfolio/ui/components/space-background/components/star-field/star-field.utils.ts                         | Gerar descritores das estrelas a partir de dimensões/limites e fonte aleatória recebida | Hook mede ambiente e fornece entradas; utilitário puro testável com aleatoriedade controlada |

Hero, Cards, Inputs e demais componentes também passam pela revisão de estilos; novos arquivos adicionais só entram no inventário quando a composição real justificar a extração. Não criar genericamente styles.ts para cada componente por obrigação física.

Cálculos dos utilitários acima recebem propriedades nomeadas como containerWidth, containerHeight e itemSize, em vez de índices sem significado. Math.random não fica oculto em utilitário que se pretende determinístico: a fonte aleatória é argumento quando necessária. Medição DOM e aplicação GSAP pertencem ao hook; cálculo de coordenadas pertence ao utilitário. Testar os algoritmos com dimensões pequenas, quantidade zero, limite negativo e fonte aleatória controlada, sem copiar fórmulas da implementação para o teste.

### Nomes, ownership e imports

- Pastas/arquivos nomeiam o conceito: contact-form, skills-field, skill-badge, star-field. Exports correspondentes: ContactForm, SkillsField, SkillBadge, StarField.
- Hooks usam use + finalidade, como useContactForm e useShootingStars. Callbacks indicam evento/ação, como onMessageSent e toggleSkillsLayout.
- Utilitários usam verbo e objeto: calculateSkillGridPositions, calculateSkillMovementBounds, generateStarDescriptors. Não usar processData, helper, common ou utils global como destino padrão.
- Objetos de estilo nomeiam elemento/variante, como contactFormStyles.fieldError e skillBadgeStyles.trigger. Evitar style1, container2 e nomes baseados só na posição do código.
- Compartilhar somente quando consumidores reais precisam da mesma responsabilidade; similaridade de linhas não exige abstração.
- Arquivo client não importa env/data/SDK. Utilitário puro não importa React/Next/GSAP. Estilo não importa hook. Tipos locais não dependem da implementação visual para existir.
- Regra de negócio continua na aplicação/contrato; extraí-la para component.utils.ts não a transforma em responsabilidade da UI.

Na revisão final, deve ser possível localizar sem busca global: onde a UI renderiza, onde o visual é definido, onde a interação vive, onde os cálculos puros acontecem e quais dados chegam do servidor. Registrar essa revisão junto dos gates técnicos.

### Server/Client

- Page, layout e seções de conteúdo permanecem/preferem server.
- ScrollReveal client pequeno recebe children renderizados server. Ícones podem ser renderizados server e entregues como conteúdo, não funções em props.
- Hero animado, habilidades, formulário, lua/foguete e estrelas são ilhas client.
- About server compõe conteúdo e skills-field client com props serializáveis/children server.
- Conteúdo tem chaves semânticas de ícone; resolver na UI responsável, sem transmitir IconType através da fronteira.
- ThemeProvider ganha wrapper client explícito. O uso atual de componente client de pacote em layout server não é, por si só, erro.
- HTML inicial tem conteúdo legível. Client Components também podem gerar HTML inicial; redução de bundle precisa ser medida, não presumida.

## 4. Decisões recomendadas, ainda não aprovadas

| Tema        | Proposta                                                                | Limite                                                                                          |
| ----------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Next/React  | Linha estável corrigida, preferencialmente Next 16 compatível com React | Patch exato escolhido por advisories/peers na implementação; não copiar pin histórico do Kaizen |
| Node        | LTS compatível, versão exata igual local/CI/Vercel                      | Runtime da hospedagem não foi confirmado                                                        |
| Gerenciador | pnpm pinado e um único lockfile                                         | Migração separada; npm com npm ci é alternativa válida se houver restrição                      |
| UI          | Manter primitivas locais, Tailwind/Radix e visual espacial              | Design system compartilhado exige avaliação própria, contrato/acesso e decisão explícita        |
| Conteúdo    | TypeScript tipado/versionado                                            | Sem CMS/banco/importador sem consumidor                                                         |
| Testes      | Vitest, Testing Library e E2E focalizados Playwright                    | Não testar cada wrapper ou movimento trivial                                                    |
| Git         | Branch de refatoração a partir de main e PRs pequenas                   | Não copiar developer/staging/master; só main foi evidenciada                                    |
| Docs        | AGENTS e arquitetura próprios enxutos                                   | Não criar dependência da pasta Kaizen                                                           |

Não adicionar Redux, TanStack Query, autenticação, Prisma, health endpoint, backend separado ou abstração de tradução. Manter bibliotecas existentes quando atendem ao uso. Atualização do conteúdo público e SEO editorial ficam para outra etapa; metadados com domínio exigem domínio confirmado.

## 5. Sequência futura

| Etapa | Objetivo                                  | Dependência                | Saída verificável                                        |
| ----- | ----------------------------------------- | -------------------------- | -------------------------------------------------------- |
| P0    | Baseline executável/visual e hospedagem   | Autorização de implementar | Falhas preexistentes separadas; transporte fake          |
| P1    | Fundação técnica e versões                | P0                         | Install frozen, lint, tipos e build                      |
| P2    | Contato seguro/previsível                 | P1                         | Inválido/falha não envia nem acusa sucesso; testes       |
| P3    | Organização/conteúdo                      | P2                         | Imports e estrutura coerentes; textos/visual preservados |
| P4    | Server/Client, animações e acessibilidade | P3                         | Teclado, reduced-motion, lifecycle/remount               |
| P5    | CI/docs/regressão                         | P1–P4                      | Gates de PR, preview e critérios finais                  |
| P6    | Atualização das informações               | Etapa editorial posterior  | Dados fornecidos/revisados pelo usuário                  |

P1/P2 isolados antes de grandes movimentos. Movimentos e imports entram juntos, sem deixar entrega quebrada. Testes críticos no incremento da correção, não somente no final.

P3 acontece primeiro como movimento físico e separação do conteúdo, mantendo temporariamente os limites client necessários. A conversão das seções para server descrita nos destinos é o estado final alcançado em P4, quando HeroIntro, SkillsField, ContactScene e ScrollReveal existirem. Não converter a seção para server enquanto ela ainda chama hooks. Ao concluir cada incremento, manter build e tipos verdes.

### P0: baseline

1. Reconfirmar Git e preservar alterações posteriores à avaliação.
2. Confirmar Node, gerenciador, Vercel e domínio/preview sem exibir segredos.
3. Instalar base congelada no início da implementação; registrar lint/tipos/build e falhas anteriores.
4. Registrar desktop/mobile, conteúdo, âncoras, tema, foco, animações e contato com transporte fake.
5. Medir bundle/atividade e limitações. Não prometer percentuais sem baseline.
6. Confirmar remetente permitido e proteção da hospedagem. Envio real só em validação autorizada separadamente.

## 6. Configuração e governança: arquivo por arquivo

| Ordem | Ação/caminho exato                                                   | Local/mudança e motivo                                                              | Integração e verificação                                             |
| ----- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| P1.1  | Editar package.json                                                  | Scripts/engines/packageManager; versões compatíveis; ESLint/Prettier/Slot diretos   | Instalação congelada e scripts sem dependência transitiva acidental  |
| P1.2  | Criar .node-version                                                  | Versão exata validada                                                               | Mesma versão local/CI/Vercel                                         |
| P1.3  | Criar pnpm-lock.yaml; remover package-lock.json ao concluir migração | Lock gerado, não editado manualmente                                                | Migração atômica de manifest/CI; somente um lock                     |
| P1.4  | Criar eslint.config.mjs; remover .eslintrc.json                      | Flat config Next/TS/import-sort compatíveis; substituir Rocketseat se sem outro uso | eslint . --max-warnings=0; não ocultar erros desligando regras       |
| P1.5  | Editar prettier.config.js                                            | Config explícita e plugin Tailwind compatível                                       | Preservar estilo; declarar Prettier direto                           |
| P1.6  | Editar tsconfig.json                                                 | Preservar strict/noEmit/alias; revisar allowJs/include dos testes                   | Tipos da aplicação/testes e build                                    |
| P1.7  | Editar next.config.ts                                                | Limite de corpo da action, headers proporcionais após conferir hosting              | Payload excessivo recusado; sem allowedOrigins curinga               |
| P1.8  | Editar .gitignore                                                    | Permitir somente .env.example; ignorar relatórios E2E                               | Nenhum segredo/output gerado rastreado                               |
| P2.1  | Criar .env.example                                                   | Nomes e comentários, valores vazios                                                 | Sem credenciais/destinatário pessoal                                 |
| P3.1  | Editar components.json                                               | Aliases novos de shared e lib/styles/cn                                             | Geração shadcn seguida da convenção por pasta; gate detecta desvio   |
| P5.1  | Criar scripts/check-structure.mjs                                    | Gate pasta/componente e imports proibidos, exceções Next/actions                    | Detectar imports relativos equivalentes, UI→env/data e lib→feature   |
| P5.2  | Criar scripts/check-structure.test.mjs                               | Regressões controladas do gate                                                      | Casos inválidos e permitidos, sem teste espelho da implementação     |
| P5.3  | Criar .github/workflows/ci.yml                                       | PR/push: runtime/install frozen/formato/lint/tipos/estrutura/testes/build           | Checks obrigatórios antes de integrar                                |
| P5.4  | Editar .github/workflows/deployment.yml                              | Pin runtime/gerenciador/CLI, gates antes do deploy                                  | Evitar deploy duplicado com integração Vercel; confirmar estado real |
| P5.5  | Criar AGENTS.md                                                      | Semântica, pastas, boundaries, secrets e checks locais                              | Autossuficiente sem caminhos externos                                |
| P5.6  | Criar docs/architecture/TARGET-ARCHITECTURE.md                       | Registrar decisões aprovadas, exceções e dependências                               | Links internos e responsabilidades coerentes                         |
| P5.7  | Criar README.md                                                      | Instalação/scripts/env/mock/deploy/arquitetura                                      | Iniciar sem consultar Kaizen                                         |

Preservar postcss.config.mjs se a atualização não exigir ajuste; não mudar .vscode/settings.json, fotos ou ícone por convenção genérica. @next/env pode sair se scripts/config também não usarem. Confirmar peers e instalação antes de remover pacote.

## 7. Contato: fluxo e contratos

1. UI valida para feedback rápido.
2. Action recebe unknown, verifica origem pela política conhecida, limites e proteção de abuso; parse server com trim/strict/máximos.
3. Comando validado passa a sendContactMessage com porta pequena de envio.
4. Adaptador Resend server-only recebe destinatário/from exclusivamente server; email validado do visitante só reply-to.
5. Enviar text; HTML somente se requisito posterior com escape contextual/teste. Subject previsível, sem controles/quebras de cabeçalho.
6. Traduzir falhas para resultado próprio, mínimo e serializável. Não retornar corpo do SDK/env/detalhe interno.
7. UI mantém rascunho em falhas, limpa no sucesso confirmado e então aciona callback da animação. Pending não implica entrega concluída.

Sucesso significa aceite pelo provedor, não entrega comprovada na caixa do destinatário. Aproveitar proteção nativa de origem do Next, documentando checagem adicional; não confiar em Host arbitrário nem abrir curinga para previews.

| Campo/configuração proposta | Fonte/significado                                                      | Restrição/motivo                                                          |
| --------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| name                        | Input normalizado                                                      | 2–100 caracteres propostos; controles de cabeçalho recusados/normalizados |
| email                       | Input validado                                                         | Máximo proposto 254; somente reply-to, nunca from/to                      |
| message                     | Input normalizado                                                      | 20–5.000 caracteres propostos; texto simples                              |
| status                      | success, validation_error, rate_limited, unavailable, unexpected_error | Contrato próprio independente do SDK                                      |
| fieldErrors                 | Erros por campo                                                        | Sem input bruto/dado pessoal na resposta                                  |
| RESEND_API_KEY              | Segredo existente, server                                              | Sem NEXT_PUBLIC/log/exemplo com valor                                     |
| CONTACT_FROM_EMAIL          | Config server nova                                                     | Remetente permitido pelo Resend confirmado                                |
| CONTACT_TO_EMAIL            | Destinatário fixo server                                               | Não aceito da UI, não copiado neste documento                             |
| CONTACT_ALLOWED_ORIGINS     | Config nova, se adotada                                                | Lista de produção/preview explícita, sem wildcard amplo                   |

Limites e variáveis novas são propostas, não configurações existentes/aprovadas. Verificar tamanho em bytes e ordem da recusa antes do SDK.

### Arquivos do contato

| Ordem | Ação/origem → destino                                                                                                                          | Mudança/responsabilidade                                                    | Dependências e resultado verificável                                 |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| P2.2  | Mover src/app/actions/contact-me-type.ts → src/features/contact/contracts/contact-message.schema.ts                                            | Schema/tipo da mensagem; remover english; strict/trim/máximos               | Form/action mesmo contrato; inválidos recusados                      |
| P2.3  | Criar src/features/contact/contracts/contact-result.types.ts                                                                                   | União discriminada/status e fieldErrors                                     | Hook/action sem SDK; serialização segura                             |
| P2.4  | Criar src/features/contact/application/contact-message-sender.port.ts                                                                          | Porta mínima de envio, sem email service genérico                           | Fake e adaptador implementam mesmo contrato                          |
| P2.5  | Criar src/features/contact/application/send-contact-message.ts                                                                                 | Caso de uso com comando/porta                                               | Sem env/SDK/Next; falha não vira sucesso                             |
| P2.6  | Criar src/lib/env/contact-env.ts                                                                                                               | Leitura/validação lazy server-only                                          | Página pública/build sem chave real; falha segura no envio           |
| P2.7  | Criar src/features/contact/data/resend-contact-message-sender.ts                                                                               | SDK, text/replyTo e tradução de falhas                                      | Teste SDK fake, sem rede                                             |
| P2.8  | Criar src/features/contact/actions/create-contact-service.ts                                                                                   | Composição env/adaptador/caso de uso server-only                            | UI não importa composition root                                      |
| P2.9  | Mover src/app/actions/contact-me.ts → src/features/contact/actions/send-contact-message.action.ts                                              | use server, unknown/parse/origem/abuso e resultado                          | Inválido nunca chama sender                                          |
| P2.10 | Mover src/hooks/use-contact-me-submit.tsx → src/features/contact/ui/components/contact-form/hooks/use-contact-form.ts                          | Nome corrigido/.ts, try/catch, status, reset só sucesso                     | Falha preserva rascunho; onMessageSent indica evento                 |
| P2.11 | Mover src/components/contact-me-form.tsx → src/features/contact/ui/components/contact-form/contact-form.tsx                                    | Erro por campo, aria-invalid/describedby, status acessível e campos tipados | Email inválido com nome válido aparece; pending bloqueia duplicidade |
| P2.12 | Criar src/features/contact/ui/components/contact-form/contact-form.types.ts                                                                    | Props/onMessageSent                                                         | Callback sem nome de booleano                                        |
| P2.13 | Criar src/features/contact/ui/components/contact-form/contact-form.constants.ts                                                                | Campos/textos atuais extraídos                                              | Sem casts artificiais/name type vazio; sem revisão editorial         |
| P3.2  | Mover src/components/sections/contact-me-section.tsx → src/features/contact/ui/components/contact-section/contact-section.tsx                  | Seção server, id contact, título e composição                               | Page importa destino; IDs únicos                                     |
| P4.1  | Criar src/features/contact/ui/components/contact-scene/contact-scene.tsx                                                                       | Ilha client liga formulário/cena por callback local                         | Callback não cruza Server/Client                                     |
| P4.2  | Mover src/components/ui/moon.tsx → src/features/contact/ui/components/contact-scene/components/moon-and-rocket/moon-and-rocket.tsx             | SVG/refs privados; aria-hidden de decoração                                 | Preservar desenho; IDs/gradientes seguros para repetição             |
| P4.3  | Criar src/features/contact/ui/components/contact-scene/components/moon-and-rocket/moon-and-rocket.types.ts                                     | Props de refs                                                               | Contrato junto ao filho                                              |
| P4.4  | Mover src/hooks/animations/use-moon-rocket-animation.tsx → src/features/contact/ui/components/contact-scene/hooks/use-moon-rocket-animation.ts | Cleanup isolado; pausa floating durante voo; reduced-motion                 | Reenvio não duplica tween; falha não aciona confirmação              |

### Pendência operacional: abuso

O tamanho máximo do corpo de Server Actions foi reduzido para `32kb`, cobrindo o máximo permitido pelo schema da mensagem (5.000 caracteres Unicode) mais o envelope da action. Isso limita cada requisição, mas não impõe frequência por origem e não é rate limit. WAF/rate limit da Vercel continua não inspecionado; confirmar a configuração do projeto e comprovar em preview antes de declarar proteção contra abuso. Se a infraestrutura não oferecer limite efetivo, escolher CAPTCHA verificado no servidor ou limitador distribuído compatível com serverless. Não adotar contador em memória como garantia; não criar Redis/serviço sem necessidade confirmada. Honeypot é complemento. Até obter essa evidência, não declarar o contato protegido contra abuso.

## 8. Conteúdo e seções

english-config não é apenas configuração: mistura conteúdo, apresentação e cálculos. Fonte editável única e tipada por responsabilidade; chaves de ícone no conteúdo, componentes resolvidos na UI. Preservar textos/URLs/fotos atuais.

| Ordem | Ação/origem → destino                                                                                                                 | Mudança/local e motivo                                                    | Integração/verificação                                              |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| P3.3  | Mover src/config/english-config.ts → src/features/portfolio/content/portfolio-content.en.ts                                           | Retirar contato já extraído, imports React/ícones e cálculo na importação | Comparar todos os textos/links e preservar IDs de skills            |
| P3.4  | Criar src/features/portfolio/content/portfolio-content.types.ts                                                                       | Contratos readonly de conteúdo, links/chaves                              | Sem React/SDK; props serializáveis                                  |
| P3.5  | Criar src/features/portfolio/content/get-portfolio-content.ts                                                                         | Montar conteúdo server com data explícita                                 | server-only; política render/revalidação clara                      |
| P3.6  | Mover src/utils/calculate-duration.ts → src/features/portfolio/content/calculate-completed-years.ts                                   | Datas explícitas, aniversário/dia considerados; formato separado          | Véspera/aniversário e virada mês/ano; inválido/futuro definidos     |
| P3.7  | Mover src/components/sections/hero-section.tsx → src/features/portfolio/ui/components/hero-section/hero-section.tsx                   | Composição server, título/subtítulo inicial legíveis                      | Page e ilha HeroIntro; sem texto vazio obrigatório no primeiro HTML |
| P3.8  | Mover src/components/sections/about-section.tsx → src/features/portfolio/ui/components/about-section/about-section.tsx                | About server compõe texto e skills client                                 | AboutContent e SkillsField; conteúdo legível sem efeitos            |
| P3.9  | Mover src/components/about-content.tsx → src/features/portfolio/ui/components/about-content/about-content.tsx                         | Texto/foto/links server e reveal; links com nomes acessíveis              | Hero subtítulos recebidos explicitamente, ícones server/children    |
| P3.10 | Mover src/components/sections/philosophy-section.tsx → src/features/portfolio/ui/components/philosophy-section/philosophy-section.tsx | Server e reveal por item; retirar TODO quando resolvido                   | Ícones na UI, ordem de cards preservada                             |
| P3.11 | Mover src/components/sections/journey-section.tsx → src/features/portfolio/ui/components/journey-section/journey-section.tsx          | Timeline server/reveal; chaves semânticas estáveis                        | Empresas/datas/links mantidos; responsividade                       |
| P3.12 | Editar src/app/page.tsx                                                                                                               | Imports finais e conteúdo server em props                                 | Rota fina, sem hooks/SDK/regra de contato                           |
| P3.13 | Editar src/app/layout.tsx                                                                                                             | Wrapper ThemeProvider e variável Inter; toast global se escopo justificar | Inglês/metadata atuais preservados                                  |

Datas: idade em anos completos; experiência como anos/meses legíveis, não anos.meses entendido como decimal. Referência civil consistente, proposta America/Sao_Paulo para perfil, sem criar regra global de produto do Kaizen. Se renderização estática, documentar revalidação; não tornar todo site dinâmico só por idade. Correção técnica da duração nesta etapa; mudança biográfica em P6, preservando sentido dos textos atuais.

## 9. Primitivas compartilhadas e imports

Primitivas locais ficam em components/shared. Conteúdo de negócio sai de ui genérico para feature. cn continua nome local aceitável para composição de classes. Cada componente tem pasta; famílias Card/Tooltip também são desdobradas com imports explícitos.

| Ordem | Origem                                 | Destino/ação                                                          | Consumidores e verificação                                                |
| ----- | -------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| P3.14 | src/lib/utils.ts                       | Mover → src/lib/styles/cn.ts                                          | Button, Card/partes, Input/Textarea/Label/TooltipContent; components.json |
| P3.15 | src/components/ui/button.tsx           | Mover → src/components/shared/button/button.tsx                       | ContactForm; API/variantes e Slot direto                                  |
| P3.16 | src/components/ui/input.tsx            | Mover → src/components/shared/input/input.tsx                         | ContactForm; RHF/ref/foco                                                 |
| P3.17 | src/components/ui/textarea.tsx         | Mover → src/components/shared/textarea/textarea.tsx                   | ContactForm; ref e erros                                                  |
| P3.18 | src/components/ui/label.tsx            | Mover → src/components/shared/label/label.tsx                         | ContactForm passa a usar wrapper hoje não consumido                       |
| P3.19 | src/components/ui/card.tsx: Card       | Separar → src/components/shared/card/card.tsx                         | ContactForm e JourneySection                                              |
| P3.20 | mesmo arquivo: AnimatedCard            | Separar → src/components/shared/animated-card/animated-card.tsx       | AboutContent/Philosophy; base/variante sem duplicação desnecessária       |
| P3.21 | mesmo arquivo: CardHeader              | Separar → src/components/shared/card-header/card-header.tsx           | ContactForm                                                               |
| P3.22 | mesmo arquivo: CardTitle               | Separar → src/components/shared/card-title/card-title.tsx             | ContactForm/Journey; elemento semântico pelo contexto                     |
| P3.23 | mesmo arquivo: CardIconTitle           | Separar → src/components/shared/card-icon-title/card-icon-title.tsx   | AboutContent/Philosophy                                                   |
| P3.24 | mesmo arquivo: CardDescription         | Separar → src/components/shared/card-description/card-description.tsx | ContactForm/Journey                                                       |
| P3.25 | mesmo arquivo: CardContent             | Separar → src/components/shared/card-content/card-content.tsx         | ContactForm/AboutContent/Philosophy                                       |
| P3.26 | mesmo arquivo: CardFooter              | Separar → src/components/shared/card-footer/card-footer.tsx           | ContactForm/AboutContent/Journey/Philosophy                               |
| P3.27 | mesmo arquivo: CardAction              | Remover se ausência de consumidor confirmada                          | Nenhum identificado; não criar pasta sem consumidor                       |
| P3.28 | src/components/ui/tooltip.tsx: Tooltip | Separar → src/components/shared/tooltip/tooltip.tsx                   | SkillBadge; remover provider redundante interno                           |
| P3.29 | mesmo arquivo: TooltipTrigger          | Separar → src/components/shared/tooltip-trigger/tooltip-trigger.tsx   | SkillBadge; asChild em botão                                              |
| P3.30 | mesmo arquivo: TooltipContent          | Separar → src/components/shared/tooltip-content/tooltip-content.tsx   | SkillBadge; posição/texto e reduced-motion                                |
| P3.31 | mesmo arquivo: TooltipProvider         | Separar → src/components/shared/tooltip-provider/tooltip-provider.tsx | SkillsField; provider único por grupo                                     |
| P3.32 | src/components/ui/sonner.tsx           | Mover → src/components/shared/toast-provider/toast-provider.tsx       | Page/layout conforme escopo; tema/posição/duração mantidos                |
| P3.33 | Import de ThemeProvider no layout      | Criar src/components/shared/theme-provider/theme-provider.tsx         | Wrapper client explícito; layout continua server                          |

Após migrar os consumidores, remover origens substituídas, sem cópias concorrentes. Cada export no próprio arquivo; nenhum index global para mascarar dependências. Shadcn pode gerar estrutura diferente e requer adequação à convenção; gate detecta componentes soltos. Verificar equivalência de classes/espaçamento no browser, não só build.

Props triviais de wrappers não exigem .types.ts por burocracia. Criar contrato separado quando relevante, como form/skill/SVG. Estilos privados junto ao componente, não centralizados no pai.

## 10. Animações e filhos privados

### 10.1 Habilidades

| Ordem | Ação/caminho exato                                                                                                                                                | Mudança/responsabilidade                                                        | Verificação                                               |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| P4.5  | Criar src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.tsx                                                                 | Estado organized/floating sai do About; props serializáveis; provider único     | Rerender irrelevante não reinicia animações               |
| P4.6  | Criar src/features/portfolio/ui/components/about-section/components/skills-field/skills-field.types.ts                                                            | Modelos locais e refs                                                           | Hooks deixam de importar tipo do componente visual        |
| P4.7  | Mover src/components/ui/hard-skills.tsx → src/features/portfolio/ui/components/about-section/components/skills-field/components/skill-badge/skill-badge.tsx       | Singular SkillBadge; botão/nome/aria-pressed/largura correta                    | Enter/Space/foco; nome não depende de hover               |
| P4.8  | Criar src/features/portfolio/ui/components/about-section/components/skills-field/components/skill-badge/skill-badge.types.ts                                      | Props próprias do filho                                                         | Tipos junto ao consumidor                                 |
| P4.9  | Mover src/hooks/animations/use-organize-hard-skills.tsx → src/features/portfolio/ui/components/about-section/components/skills-field/hooks/use-organize-skills.ts | Callback estável, refs por instância e dimensões reais                          | Resize/layout sem busca global por IDs                    |
| P4.10 | Mover src/hooks/animations/use-float-hard-skills.tsx → src/features/portfolio/ui/components/about-section/components/skills-field/hooks/use-float-skills.ts       | Tamanho real da célula 120px substitui valor incoerente 20; cleanup entre modos | Limites não negativos e instâncias independentes          |
| P4.11 | Mover src/hooks/use-window-resize.tsx → src/features/portfolio/ui/components/about-section/components/skills-field/hooks/use-skills-resize.ts                     | Callback estável; considerar ResizeObserver local com cleanup                   | Sem listeners/observers acumulados; mudanças do container |

Preservar IDs semânticos do conteúdo. IDs DOM não são repositório global de estado. Não extrair matemática complexa para lib genérica sem consumidor; helper puro local é suficiente se necessário.

### 10.2 Hero e reveal compartilhado

| Ordem | Origem/destino ou criação                                                                                                                                 | Mudança e consumidor                                        | Verificação                                       |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| P4.12 | Criar src/features/portfolio/ui/components/hero-section/components/hero-intro/hero-intro.tsx                                                              | Ilha client para entrada/digitação/scroll                   | Hero server compõe; fallback em reduced-motion    |
| P4.13 | Mover src/hooks/animations/use-typewriter.tsx → src/features/portfolio/ui/components/hero-section/components/hero-intro/hooks/use-typewriter.ts           | Ref span, timeline cleanup e textos readonly                | Remount não duplica timeline                      |
| P4.14 | Mover src/hooks/animations/use-fade-in.tsx → src/features/portfolio/ui/components/hero-section/components/hero-intro/hooks/use-fade-in.ts                 | Ref tipada/cleanup                                          | Cancelamento não deixa conteúdo invisível         |
| P4.15 | Mover src/hooks/animations/use-fade-slide-y.tsx → src/features/portfolio/ui/components/hero-section/components/hero-intro/hooks/use-fade-slide-y.ts       | Incluir delay nas deps e cleanup                            | Mudança de opções respeitada                      |
| P4.16 | Mover src/hooks/animations/use-scroll-fade-out.tsx → src/features/portfolio/ui/components/hero-section/components/hero-intro/hooks/use-scroll-fade-out.ts | Trigger local/cleanup                                       | Não matar animação de outra seção                 |
| P4.17 | Criar src/components/shared/scroll-reveal/scroll-reveal.tsx                                                                                               | Wrapper client com children server, variantes necessárias   | AboutContent/Philosophy/Journey/Contato           |
| P4.18 | Criar src/components/shared/scroll-reveal/scroll-reveal.types.ts                                                                                          | Contrato pequeno/serializável                               | Sem callback/config GSAP arbitrária server→client |
| P4.19 | Criar src/components/shared/scroll-reveal/hooks/use-scroll-reveal.ts                                                                                      | Unificar fade/slide existentes com cleanup/reduced-motion   | Recursos por instância e mudança de props         |
| P4.20 | Remover src/hooks/animations/use-scroll-fade-in.tsx após substituir                                                                                       | Reveal em AboutContent/Philosophy/Journey/Contato           | Busca sem import antigo                           |
| P4.21 | Remover src/hooks/animations/use-scroll-fade-slide-x.tsx após substituir                                                                                  | Reveal em AboutContent/ContactScene                         | Busca sem import antigo                           |
| P4.22 | Remover src/hooks/animations/use-stagger-fade-slide-x.tsx após substituir                                                                                 | Reveal por item/alternância explícita em Philosophy/Journey | Definir sequência observável com baseline         |
| P4.23 | Criar src/lib/animation/gsap-client.ts                                                                                                                    | Registro de plugins usados por hero/reveal/cenas            | Browser APIs só client; lib não importa features  |

Stagger atual é aplicado dentro de tween individual por item; não pressupor sequência real entre cartões. Definir intenção sem inventar efeito novo. Context/revert ou recursos explicitamente retidos são alternativas: escolher abordagem consistente e testar isolamento. Não usar ScrollTrigger.getAll().forEach(kill) como cleanup local.

### 10.3 Fundo espacial

| Ordem | Ação/caminho exato                                                                                                        | Mudança/local                                                         | Verificação                                                            |
| ----- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| P4.24 | Mover src/components/ui/stars-background.tsx → src/features/portfolio/ui/components/space-background/space-background.tsx | Composição dos filhos privados; aria-hidden/pointer-events-none       | Não interceptar foco/clique                                            |
| P4.25 | Criar src/features/portfolio/ui/components/space-background/components/star-field/star-field.tsx                          | Extrair StarBackground                                                | Visual equivalente e limite de partículas                              |
| P4.26 | Criar src/features/portfolio/ui/components/space-background/components/star-field/star-field.types.ts                     | Modelo privado das estrelas                                           | Responsabilidade do filho                                              |
| P4.27 | Criar src/features/portfolio/ui/components/space-background/components/star-field/hooks/use-star-field.ts                 | Gerar após mount; setters reutilizados; ciclo controlado/visibilidade | Sem tween novo por estrela/frame; rAF/listeners encerrados             |
| P4.28 | Criar src/features/portfolio/ui/components/space-background/components/shooting-stars/shooting-stars.tsx                  | Extrair ShootingStars                                                 | Reduced-motion sem geração contínua                                    |
| P4.29 | Criar src/features/portfolio/ui/components/space-background/components/shooting-stars/shooting-stars.types.ts             | Modelo privado                                                        | endX/endY saem apenas se não usados no resultado                       |
| P4.30 | Criar src/features/portfolio/ui/components/space-background/components/shooting-stars/hooks/use-shooting-stars.ts         | Rastrear timers de criação/remoção e guarda unmount                   | Nada reagendado/atualizado após desmontar                              |
| P4.31 | Editar src/app/globals.css                                                                                                | Token Inter, keyframes utilizados e reduced-motion CSS                | Cores preservadas; conferir pulse/caret; tokens só removidos com prova |

Se precisar extrair CSS/constantes/estilos de filho, arquivo fica junto dele e entra no inventário do incremento, com consumidor. Não criar module.css e styles.ts juntos sem razão. Limites/throttling determinados por medição desktop/mobile; não apresentar número arbitrário como ganho comprovado.

### 10.4 Remoções condicionais

| Caminho                                            | Evidência/motivo                                                  | Verificação                                                             |
| -------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| src/components/ui/alien.tsx                        | Nenhum consumidor em src identificado                             | Buscar imports/exports/config e build; recuperar pelo Git se necessário |
| src/hooks/animations/use-alien.tsx                 | Só declaração useAlienAnimated; efeito sem deps/cleanup de tweens | Não refatorar feature sem consumidor                                    |
| src/hooks/animations/use-scroll-rotate-slide-x.tsx | Só declaração identificada                                        | Ausência de import antes de remover                                     |
| src/hooks/animations/use-stagger-fade-slide-y.tsx  | Só declaração identificada                                        | Ausência de import antes de remover                                     |
| public/me.png                                      | Conteúdo referencia me.jpg                                        | Verificar uso externo direto; manter se desconhecido                    |

Preservar me.jpg e icon.svg. Não apagar pasta com conteúdo não inspecionado. Remoção reversível por Git, sem migração de dados operacionais.

## 11. Revisão semântica e de segurança

- SDK/env ficam server-only; type do cliente não valida entrada pública.
- Contratos não importam UI/Next/env; application não conhece Resend.
- Erros conhecidos traduzidos no adaptador/action; logging server definido em um lugar, sem mensagem pessoal/email/chave/body bruto.
- Erro inesperado tem feedback seguro e rascunho preservado; não engolir erro de programação silenciosamente.
- Usar sendContactMessage, ContactMessageInput, ContactResult, onMessageSent, isSubmitting, toggleSkillsLayout. Corrigir ContactMeSubmiTProps e shouldAnimate como callback.
- UI revela sequência do envio; detalhes SDK e transformação não encobrem orquestração.
- Comentários explicam decisão/restrição, não repetem a linha.
- Revisão semântica é gate adicional, não substitui testes/build/boundaries.
- Não duplicar informações públicas pessoais em README/env/testes sem necessidade.

## 12. Testes e checks futuros

| Arquivo exato proposto                                                                                                 | Momento  | Comportamento                                                                               |
| ---------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------- |
| vitest.config.ts                                                                                                       | Criar P2 | Ambientes unidade/UI, alias e isolamento sem rede                                           |
| tests/setup.ts                                                                                                         | Criar P2 | Matchers/cleanup, sem mocks globais que ocultem fronteiras                                  |
| src/features/contact/contracts/contact-message.schema.test.ts                                                          | Criar P2 | Trim, mínimos/máximos, extras, email e caracteres de cabeçalho                              |
| src/features/contact/application/send-contact-message.test.ts                                                          | Criar P2 | Fake sender, sucesso/falha e envio único                                                    |
| src/features/contact/data/resend-contact-message-sender.test.ts                                                        | Criar P2 | from/to fixos, replyTo/text, result error e exception                                       |
| src/features/contact/actions/send-contact-message.action.test.ts                                                       | Criar P2 | Parse server, origem inválida/ausente pela política, falha e resposta sanitizada            |
| src/features/contact/ui/components/contact-form/contact-form.test.tsx                                                  | Criar P2 | Email inválido/nome válido, erro associado, pending, falha preserva, sucesso reset/callback |
| src/features/portfolio/content/calculate-completed-years.test.ts                                                       | Criar P3 | Véspera/aniversário/mês/ano e futuro/inválido pelo contrato                                 |
| src/components/shared/scroll-reveal/scroll-reveal.test.tsx                                                             | Criar P4 | Conteúdo legível, reduced-motion e cleanup isolado                                          |
| src/features/portfolio/ui/components/space-background/components/shooting-stars/hooks/use-shooting-stars.test.ts       | Criar P4 | Fake timers, unmount e ausência de reagendamento                                            |
| src/features/portfolio/ui/components/about-section/components/skills-field/components/skill-badge/skill-badge.test.tsx | Criar P4 | Botão, teclado, nome e estado                                                               |
| playwright.config.ts                                                                                                   | Criar P5 | Viewports/preview, artefatos e envio simulado                                               |
| tests/e2e/portfolio.spec.ts                                                                                            | Criar P5 | Âncoras, teclado, reduced-motion, mobile/desktop e contato sem Resend real                  |

Fakes/timers verificam ownership de recursos, mas não substituem browser para movimento visual. Não criar teste para cada mudança de caminho/wrapper. Cobertura adicional do hero será avaliada conforme os testes de lifecycle e browser revelarem risco.

### Scripts pretendidos (não executados)

```text
pnpm format:check      # prettier --check .
pnpm lint              # eslint . --max-warnings=0
pnpm typecheck         # tsc --noEmit; preparar tipos Next se versão exigir
pnpm structure:check   # node scripts/check-structure.mjs
pnpm test              # vitest run
pnpm test:ci-scripts   # node --test scripts/check-structure.test.mjs
pnpm build             # next build
pnpm test:e2e          # playwright test
pnpm run ci            # orquestrar gates na ordem definida
```

Usar pnpm run ci, não pnpm ci como nome de script. Next 16 build não substitui lint. Instalação futura pnpm install --frozen-lockfile; enquanto npm, npm ci. Auditoria de dependências registra findings reais, sem audit fix --force nem afirmar zero vulnerabilidades por atualizar apenas Next.

### Ordem de validação

1. Config: formato/lint/tipos/install frozen/build; separar falhas preexistentes.
2. Contato: unidade/UI/action fake; inválido/falha/abuso não envia. Sem env real, público renderiza e envio falha de forma segura.
3. Movimentos: imports/estrutura/tipos/build; comparação de textos e links atuais.
4. Animações: lifecycle/remount/Strict Mode, resize/mouse/modos/tela oculta/reduced-motion.
5. Interface: teclado/nomes/foco/erros/headings/IDs; mobile e desktop; não esconder overflow como correção de layout.
6. Preview: proteção real de abuso/origem, pipeline/bundle/regressão visual; sem email real por padrão.
7. PR: git diff --check, busca de segredos em arquivos alterados e revisão semântica.

Build pode depender de fonte externa; distinguir erro de rede/código, sem desligar gate. Relatório final registra ambiente, checks realmente executados e limitações.

## 13. Critérios de aceite

- [ ] Uma aplicação Next; seções/textos/fotos atuais preservados.
- [ ] App fino; sem SDK/regra de envio/hooks de animação nas rotas.
- [ ] Componentes por pasta; auxiliares/filhos junto dos responsáveis.
- [ ] Componente renderiza; estilo define visual; hook gerencia interação/recursos; utilitário calcula sem efeitos.
- [ ] Composição visual densa extraída e algoritmos puros separados, sem pastas globais genéricas ou arquivos vazios.
- [ ] UI não importa data/env; referência à action é exceção explícita.
- [ ] Conteúdo serializável sem imports React/SDK.
- [ ] Parse/limites/origem no servidor e proteção de abuso comprovada.
- [ ] Resposta mínima própria; configuração/SDK não vazam para cliente.
- [ ] Erro de email independente do nome e associado ao input.
- [ ] Falha preserva rascunho; sucesso confirmado limpa/dispara callback.
- [ ] IDs únicos, links nomeados e skills acessíveis por teclado.
- [ ] Reduced-motion legível e sem efeitos contínuos.
- [ ] Timers/tweens/timelines/triggers/listeners limpos por instância.
- [ ] Runtime/pacotes/lock reproduzíveis; Next/React corrigidos.
- [ ] CI em PR e deploy condicionado; ferramentas com versões controladas.
- [ ] Semântica/formato/lint/tipos/testes/build comprovados.
- [ ] Documentação própria; nenhum arquivo do Kaizen alterado.
- [ ] Atualização editorial separada em P6.

## 14. Rollback e entrega

Incrementos coesos e revisáveis; reverter conjunto de código/imports/lock, nunca force push. Manter patch de segurança e reverter refatoração problemática separadamente, sem restaurar framework vulnerável como rollback padrão.

Gerenciador: reversão conjunta de manifest/lock/CI antes da adoção definitiva. Contato indisponível mantém site público com feedback seguro, sem contornar validação. Rollback de infra/provedor documentado após confirmar estado real.

Na etapa inicial de planejamento não foram criados branch, commit, push, PR ou deploy. Em 12/10/2026 o usuário autorizou A01, implementada em codex/A01-security-update; evidências em docs/tasks/A01-security-update.md. Demais itens aguardam sua implementação específica. Sem commit, push, PR ou deploy nesta entrega.

## 15. Pendências delimitadas

| Informação ausente                          | Impacto                                            | Momento                          |
| ------------------------------------------- | -------------------------------------------------- | -------------------------------- |
| Node local/Vercel atual                     | Pin compatível                                     | P0/P1                            |
| Peers e patches seguros de todos os pacotes | Pins finais                                        | P1, reconsultar advisories       |
| Domínio/proxy/preview                       | Origem e URLs metadata                             | P0/P2; SEO editorial depois      |
| Remetente permitido no Resend               | Entrega operacional                                | P0/P2; nunca pedir chave no chat |
| WAF/rate limit existente                    | Proteção suficiente sem novo serviço desnecessário | P2 antes de liberar envio        |
| Vercel Git Integration ou só workflow       | Evitar deploy duplicado/gates                      | P0/P5                            |
| Baseline visual/bundle/runtime              | Regressão e melhoria medidas                       | P0/P4                            |
| Uso externo me.png                          | Remoção do asset                                   | P4, manter na dúvida             |
| Contrato/acesso design system               | Migração visual opcional                           | Avaliação posterior              |
| Informações atualizadas do perfil           | Revisão editorial                                  | P6; fornecidas pelo usuário      |

Ausências não bloqueiam o planejamento. Não chamar proposta de configuração verificada ou código pronto para copiar. A primeira implementação exige autorização; este documento registra escopo e critérios para essa revisão.

## 16. Validações desta avaliação

- Inventário Git e leitura dos fontes/configurações pertinentes.
- Nenhum AGENTS.md encontrado no projeto alvo.
- Parse do lockfile/manifest e versões conferidos; node_modules ausente.
- Busca dos consumidores dos candidatos a remoção, limitada à evidência descrita.
- Git inicial limpo em main/95569f7; git diff --check da base sem erro.
- Busca heurística de credenciais em src: nenhuma ocorrência nos padrões consultados; não é auditoria de histórico/infra.
- Consulta oficial de segurança e migração Next.
- Não executados: instalação, lint, tipos, build, testes, browser/site, email, audit completo e deploy.

### Implementação A02/A03 — 12/10/2026

- Schema em `src/features/contact/contracts/contact-message.schema.ts`: trim, objeto estrito, nome de 2–100 caracteres sem controles de cabeçalho, email válido até 254 caracteres e mensagem de 20–5.000 caracteres.
- Server Action agora recebe `unknown` e executa `parse` antes de conferir configuração ou instanciar o Resend; o cliente usa o mesmo schema para validação imediata.
- Corpo enviado ao Resend passou de HTML interpolado para texto simples, preservando assunto, destinatário, remetente e informações exibidas.
- Branch: `codex/A02-A03-contact-validation`, baseada em `developer` alinhada a `origin/developer` no início; PR #13 aberta em 13/10/2026 para `developer`. Sem merge, email real ou deploy.
- Passaram: `npm run lint`, `npx tsc --noEmit`, `npm run build` e `git diff --check`; busca heurística de padrões de credenciais nos arquivos alterados sem ocorrências. Lint/build emitiram o aviso preexistente de ausência do plugin Next na configuração ESLint.
- Testes automatizados e verificação visual não foram executados neste incremento.
- A04 e os demais itens do fluxo de contato permanecem pendentes; esta mudança não adiciona origem, rate limit, proteção de abuso ou resultado público sanitizado.

### Implementação A04 — 13/10/2026

- Criado `src/features/contact/contracts/contact-result.types.ts` com união discriminada e serializável para sucesso, erro de validação com erros por campo, indisponibilidade e falha inesperada.
- Server Action valida com `safeParse`, converte erros Zod para campos conhecidos e traduz configuração ausente, falha retornada pelo Resend e exceção em estados próprios; nenhum objeto ou mensagem do SDK é enviado ao cliente.
- Hook captura rejeição da chamada como fallback seguro. Falhas mantêm o rascunho e não acionam a animação; o formulário só é limpo e a animação de confirmação só começa após resposta de sucesso com ID do provedor.
- Passaram: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `git diff --check` e busca heurística de padrões de credenciais nos arquivos alterados sem ocorrências. Lint/build emitiram o aviso de ausência do plugin Next na configuração ESLint.
- Testes automatizados não foram executados porque o projeto ainda não tem runner configurado; não houve envio real de email nem validação manual no navegador.
- Branch `codex/A04-contact-result`; commit `eec36c9`; PR #14 aberta para `developer`. A comparação remota contém apenas o commit A04 sobre a base e está pronta para revisão. Sem merge ou deploy.
- A05 (proteção de abuso na infraestrutura) e A06 (associação acessível dos erros de campo) foram autorizadas na sequência; evidências na seção abaixo.

### Implementação A05/A06 — 13/10/2026

- A05: configurado `experimental.serverActions.bodySizeLimit: '32kb'` em `next.config.ts`, um limite de tamanho por requisição compatível com o máximo do schema. A política padrão same-origin das Server Actions foi preservada; não foram adicionados domínios permitidos. A documentação oficial do Next.js 15 confirma limite ajustável para o corpo de Server Actions; esse limite não substitui rate limit.
- A06: corrigida a associação do erro de email (antes condicionada a `errors.name`) e adicionados `aria-invalid` e `aria-describedby` vinculados às mensagens de erro de nome, email e mensagem.
- Pendente real de A05: não há acesso/evidência da configuração WAF/rate limit da Vercel nem validação em preview nesta etapa. A infraestrutura ainda precisa ser confirmada antes de afirmar proteção efetiva contra abuso; nenhuma dependência nova, serviço externo ou contador em memória foi introduzido.
- Passaram localmente: `npx prettier --check --single-quote --no-semi` nos arquivos alterados, `npx tsc --noEmit`, `npm run lint`, `npm run build` e `git diff --check`; a busca heurística por credenciais não encontrou correspondências. Lint/build mantêm o aviso existente de plugin Next ausente na configuração ESLint.
- Testes automatizados não foram executados: o projeto não configura runner de testes. Não houve validação em preview, envio real de email, merge ou deploy.
- Fonte: [Configuração serverActions do Next.js 15](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/serverActions).

### Implementação A07 — 13/10/2026

- Timers de criação, repetição e remoção das estrelas cadentes são rastreados por instância; o cleanup marca a instância como encerrada, cancela todos os timers e impede que callbacks atrasados atualizem estado ou agendem trabalho novamente.
- Branch `codex/A07-stars-timeout-cleanup`, commit `9a5bc70`, enviada ao remoto. PR #16 aberta para `developer` em 13/10/2026. Nenhum merge ou deploy foi feito.
- Validações registradas na implementação: Prettier, `npx tsc --noEmit`, `npm run lint`, `npm run build`, `git diff --check` e busca heurística de segredos. Sem runner de testes ou validação manual no navegador.

### Implementação A08–A12 — 13/10/2026

- A08: hooks de animação GSAP previstos no item e a ilha `ScrollReveal` criam contexto por instância e executam `context.revert()` no cleanup. As animações das habilidades mantêm o cleanup de seus tweens no unmount.
- A09: conteúdo do portfólio saiu do grande objeto importado por seções client para um módulo serializável de conteúdo server-side. Seções de apresentação passaram a ser Server Components; estado interativo e animações ficam nas ilhas cliente necessárias.
- A10: contratos de conteúdo e cópias foram separados por feature; ícones são identificadores serializáveis resolvidos pela apresentação. O cálculo puro de duração concluída ficou isolado e os valores de idade/experiência são montados no servidor a partir da data civil de São Paulo, com revalidação diária.
- A11: a seção de contato agora usa o ID `contact`, distinto de `about`.
- A12: cada habilidade usa botão nativo com teclado, nome acessível, `aria-pressed`, foco visível e largura válida de 120 px.
- Passaram: Prettier nos arquivos alterados; `npx tsc --noEmit`; `npx eslint src`; `npm run build`; `git diff --check`; busca heurística por padrões de segredos sem correspondências; seis casos de fronteira de data e rejeição de data inicial futura no cálculo de duração.
- `npm run lint` não concluiu nesta execução porque o SWC não conseguiu canonicalizar o caminho do projeto (acesso negado); a verificação direta `npx eslint src` passou. O build concluiu; Next exibiu os avisos já existentes sobre o plugin ESLint e `next lint` deprecated.
- O projeto ainda não tinha runner de testes nesta tarefa; não houve validação manual em navegador, instalação de dependências, auditoria completa, email, merge ou deploy. O commit `b62b78d` em `codex/A08-A12-animation-content-accessibility` integra a branch consolidada `codex/A08-A22-architecture-quality`; PR #17 cobre A08–A22 para `developer`.

### Implementação A13 — 13/10/2026

- Links sociais de GitHub e LinkedIn agora recebem nome acessível pelo atributo `aria-label`; os nomes ficam no conteúdo tipado (`accessibleName`) junto aos dados de cada link. Texto visível, ícones e destinos não foram alterados.
- Passaram: Prettier nos três arquivos alterados, `npx eslint src`, `npx tsc --noEmit`, `npm run build` (após repetir com acesso ao diretório, pois a primeira tentativa no sandbox foi bloqueada pelo SWC), `git diff --check` e busca heurística de segredos sem correspondências. `npm run lint` continuou sem executar por erro de acesso do SWC ao canonicalizar a pasta; o ESLint direto passou.
- Não havia runner de testes nem validação manual no navegador. O commit `db10573` está incluído como dependência na branch `codex/A08-A22-architecture-quality`; a PR #17 cobre A08–A22 para `developer`, conforme o fluxo de dependências de `AGENTS.md`. Não houve merge ou deploy.

### Implementação A14–A22 — 13/10/2026

- A14: fundo espacial extraído para componentes e hooks privados da feature; geração inicial após mount, contagem limitada a 260 estrelas (mantém a densidade anterior em viewport 1920×1080), `gsap.quickTo` reutilizado por estrela, pausa/remoção de listeners e tweens quando a aba fica oculta. Não foi feito benchmark visual ou de consumo; o teto é um limite operacional, não um ganho medido.
- A15: `delay` entrou nas dependências do fade/slide vertical; stagger-X não tinha consumidor e foi removido em A21. Callbacks de organização/float das habilidades agora são estáveis e o listener de resize acompanha a função estável.
- A16: hook de digitação mantido tipado para `HTMLSpanElement`, com timeline isolada por contexto e cleanup `revert`; hooks exclusivos do hero ficaram junto da feature. Em movimento reduzido, o subtítulo mostra o primeiro texto sem timeline.
- A17: cálculo de duração civil e apresentação textual já haviam sido implementados e verificados em A10; sem duplicação nesta etapa.
- A18: Inter aplicada por classe e variável do Next Font, token `--font-sans` ligado à variável; token mono removido após busca sem consumidor.
- A19: `.node-version` fixa Node 24.20.0, `packageManager` fixa npm 11.19.0, scripts explícitos de formato/lint/tipos/estrutura/testes/build e workflow de CI em PR/push para `developer` e `main`. Deploy permanece apenas em push de `main`, depende dos gates e fixa Vercel CLI em 59.16.0. O lockfile continua sendo `package-lock.json` e passou na conferência local `npm install --package-lock-only --offline --ignore-scripts`; `npm ci` não foi executado.
- A20: `lint` foi trocado de `next lint` pelo ESLint direto; `@radix-ui/react-slot@1.1.2` agora é dependência direta registrada pelo npm no manifest/lock. Prettier foi configurado com os estilos existentes, mas ainda não consta como dependência direta; `eslint-config-next` também não pôde ser instalado. As tentativas de instalação ficaram sem resposta do registry e o modo offline confirmou que os metadados não estão no cache. O lock não foi editado manualmente; concluir as duas dependências diretas e remover o aviso do plugin Next exige novo acesso ao registry.
- A21: removidos apenas Alien/useAlien, hooks de rotate/stagger sem consumidores e hooks antigos de reveal substituídos por `ScrollReveal`; busca final não encontrou referências restantes. `public/me.png` foi preservado.
- A22: hook compartilhado observa `prefers-reduced-motion`; hero, reveal, habilidades, cena da lua/foguete e fundo suspendem movimento contínuo ou apresentam estado estático. CSS desativa animações/transições e o campo de estrelas suspende pulso quando a aba está oculta.
- Passaram: `npm run lint`, `npm run format:check`, `npm run typecheck`, `npm test` (3 casos do gate de estrutura), `npm run structure:check`, `npm install --package-lock-only --offline --ignore-scripts`, `npm run build` e `git diff --check`. Build precisou ser repetido fora do sandbox por bloqueio de canonicalização do caminho pelo SWC; passou e manteve o aviso preexistente do plugin ESLint Next ausente.
- Não executados: `npm ci`, browser/mobile, benchmark de animação, Vercel/infra, envio real de email, merge, deploy e auditoria de dependências completa. A validação de formato exclui arquivos legados previamente fora do padrão, listados em `.prettierignore`, sem reformatar esses arquivos nesta tarefa.
- A14–A22 estão no commit `9ac41d9`, enviado em `codex/A08-A22-architecture-quality` e incluído na PR #17 para `developer`. A correção posterior do typewriter explicita a escrita e a remoção do fim para o início, aguardando a revisão da PR. A20 continua parcialmente pendente até o registry npm permitir instalar as dependências faltantes; nenhuma integração ou deploy ocorreu.

### Aplicação da diretriz de organização — 13/10/2026

- Seções de portfólio foram movidas para pastas próprias em `features/portfolio/ui/components`; contato e formulário passaram para `features/contact/ui/components`. Primitivas de UI e `ScrollReveal` ficam em pastas nomeadas sob `components/`; não restam componentes React soltos nesses diretórios.
- Primitivas compartilhadas foram movidas de `components/ui` para `components/shared`; as partes Card e Tooltip passaram a ter uma pasta/componente cada, com imports explícitos. O `CardAction` sem consumidor foi removido; TooltipProvider agora é único na `SkillsField`. ToastProvider e ThemeProvider também têm componentes próprios. O cálculo `cn` foi movido para `lib/styles/cn.ts`, e `components.json` foi atualizado.
- Componentes com contratos próprios agora têm tipos junto da implementação. Classes densas e variantes foram extraídas para arquivos `*.styles.ts`; ícones fixos, configuração e constantes ficaram próximos de seus consumidores. Componentes sem props próprias ou sem estilo próprio não ganharam arquivos vazios.
- A seção de apresentação Server Component compõe a ilha cliente `SkillsField`; `SkillBadge` e hooks de animação ficam privados da feature. Cálculo da grade e geração de posições flutuantes foram extraídos para funções puras, com fonte aleatória injetada e testes determinísticos.
- O gate `structure:check` passou a exigir que cada arquivo React `.tsx` fora das entradas especiais do App Router fique em uma pasta de componente com o mesmo nome.
- Comparação estrutural feita por leitura do `kaizen-app/AGENTS.md` e da seção “Organização dos componentes React” em `docs/architecture/TARGET-ARCHITECTURE.md`. Nenhum arquivo, diário ou configuração do Kaizen foi alterado.
- O gerador Shadcn pode criar arquivos diretamente na pasta indicada por `components.json`; após geração, cada componente precisa ser movido para sua pasta, conforme a convenção e o gate de estrutura.
- Passaram: `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run structure:check`, `npm test` (9 testes) e `npm run build`. A primeira tentativa de build parou antes da compilação por acesso negado do SWC ao caminho local; a repetição com acesso ao diretório passou. O build ainda informa o aviso existente de plugin ESLint Next ausente. O teste Node que importa o utilitário TypeScript informa `MODULE_TYPELESS_PACKAGE_JSON`, sem falhas.
- A rota inicial respondeu HTTP 200 em `localhost:3002` depois de reiniciar o servidor; a execução simultânea anterior de `next dev` e `next build` causou conflito temporário na pasta `.next`, resolvido ao parar o servidor antigo e iniciá-lo após o build. Sem revisão visual manual, benchmark, envio de email, merge ou deploy. A reorganização e A14–A22 estão na branch `codex/A08-A22-architecture-quality`, commit `9ac41d9`, em revisão na PR #17; A20 segue parcialmente pendente conforme acima.

## 17. Fontes oficiais

- [Advisory RCE em React Server Components](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp): prioridade da atualização de 15.2.3; patches históricos não substituem nova consulta.
- [Atualização de segurança dezembro/2025](https://nextjs.org/blog/security-update-2025-12-11): correções posteriores também devem ser avaliadas.
- [Migração para Next.js 16](https://nextjs.org/docs/app/guides/upgrading/version-16): remoção de next lint e lint explícito.
- [Segurança de dados](https://nextjs.org/docs/app/guides/data-security): Server Actions são fronteiras públicas e validam input.
- [Configuração de Server Actions](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions): origem/limite do corpo não substituem validação do conteúdo.


### Revisão antes da integração — 13/10/2026

- A20 concluída: Prettier 3.6.2 e eslint-config-next 15.5.27 são dependências diretas registradas pelo npm no lockfile.
- Editor: o organizador de imports do TypeScript foi desabilitado neste workspace; source.fixAll.eslint passa a aplicar simple-import-sort. Prettier e ESLint usam a mesma configuração.
- Arquivos de texto e o editor agora padronizam LF; a revisão isolada detectou CRLF em um checkout limpo como causa de falha de formato.
- Lint inclui scripts MJS e configurações; os avisos sobre refs no cleanup de lua/foguete foram corrigidos capturando os nós da instância. As guardas da A07 foram preservadas no hook extraído.
- Passaram instalação pelo lockfile, formato, lint, tipos, gate de estrutura, nove testes e build no checkout isolado; uma revalidação acompanha a integração de A07.
- A proteção externa WAF/rate limit de A05 continua pendente de evidência de infraestrutura.

- Integração de A07: os arquivos antigos de stars-background/use-shooting-stars foram removidos ao reconciliar developer, pois suas responsabilidades já estão no novo hook da feature. As guardas de descarte dos callbacks e dos atualizadores de estado foram preservadas.
