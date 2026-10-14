# Design System no portfólio

## Decisão

Consumir `@fradelli/ui@0.3.0` pelo GitHub Packages, como na versão do Kaizen consultada em 14/10/2026. O Kaizen foi usado somente como referência de leitura. O pacote é a fonte dos tokens e componentes básicos; seu código não é copiado para o portfólio.

A migração mantém conteúdo EN/PT, foto, links e lógica das animações. A identidade espacial permanece no fundo, nas ilustrações e no movimento. Superfícies de vidro são uma adaptação visual do portfólio sobre o sistema compartilhado.

## Integração

- React e React DOM: `19.3.0`, compatíveis com o peer `>=19.2.7 <20` do pacote.
- Tailwind e seu plugin PostCSS: `4.3.3`, compatíveis com o peer `>=4.3.0 <5`.
- Next permanece em `15.5.27`; instalação, tipos e build verificam a compatibilidade desta composição.
- `src/app/globals.css` importa uma vez o CSS público do pacote, registra seu `dist` com `@source` e preserva os keyframes das estrelas e o comportamento de movimento reduzido.
- Inter variável fica exposta em `--font-inter` no elemento raiz. O tema escuro é explícito, como na referência; o provider força esse tema para evitar divergências por preferência antiga do navegador.
- `.npmrc` direciona apenas o scope `@fradelli` ao GitHub Packages, sem credenciais. Os demais pacotes continuam no registry padrão.

## Responsabilidades

| Camada                                 | Responsabilidade                                                                                                      |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `@fradelli/ui`                         | Tokens, Card, Button, Badge, Input, Field e demais primitivas consumidas pelos caminhos públicos                      |
| `src/app/portfolio-theme.css`          | Superfícies de vidro, hierarquia tipográfica editorial e margem de âncoras abaixo do seletor fixo                     |
| `src/components/shared/glass-card/`    | Compor Card do pacote com a superfície compartilhada do portfólio                                                     |
| `src/components/shared/animated-card/` | Acrescentar o comportamento visual de hover ao card de vidro                                                          |
| Estilos de cada seção                  | Layout, espaçamento e composição próprios                                                                             |
| Textarea, tooltip e toast locais       | Elementos mantidos com os tokens do sistema; não há substituição equivalente para todos eles no contrato inspecionado |
| Hooks e utilitários existentes         | Estado, efeitos e cálculos das animações, sem mudança de lógica nesta migração                                        |

As antigas implementações locais de Button, Input, Label e família Card foram removidas após migrar os consumidores. As dependências diretas de Radix Label/Slot e class-variance-authority saíram do manifesto; o pacote mantém suas próprias dependências. Ícones de tecnologias continuam especializados no campo de habilidades.

## Tratamento visual

- Fundo e superfícies vêm dos tokens `--fd-color-*`, sem paleta paralela no projeto.
- Amarelo primário para ações, foco e destaques; texto principal e secundário usam os neutros do sistema.
- Cards usam a cor de superfície com 80% de opacidade, borda sutil e desfoque de 12px. Tooltips e seletor usam superfície elevada a 94%.
- Há fallback opaco quando o navegador não suporta desfoque. A declaração sem prefixo vem após a declaração WebKit para que a otimização de CSS preserve a propriedade padrão.
- Blur permanece restrito às superfícies. Não foi aplicada uma camada de desfoque de tela inteira.
- A hierarquia usa Inter e tokens tipográficos do sistema. O hero possui escala responsiva local porque a escala publicada termina em 32px.
- Badges mantêm listas semânticas; contribuições usam details/summary; erros continuam associados aos campos. O formulário não foi enviado nas verificações.
- Hover dos cards e controles usa os estados do sistema. Lettering, flutuação, organização, estrelas, entradas e lua/foguete mantêm seus hooks.

## Acesso ao pacote privado

Uma instalação limpa exige uma credencial com leitura de `@fradelli/ui`, configurada fora dos arquivos versionados. Não inserir um token literal no `.npmrc` deste repositório nem em comandos registrados na documentação.

Nesta máquina, a leitura e o `npm ci` foram verificados usando a autenticação existente do GitHub, disponibilizada apenas ao processo de instalação. Não foi criada ou ampliada uma credencial.

Os workflows configuram registry e scope no setup-node e usam `packages: read` nos jobs consumidores. O token de instalação fica no passo necessário, via `NODE_AUTH_TOKEN`:

- Preferência: `GITHUB_TOKEN`, desde que o pacote permita leitura pelo repositório consumidor.
- Alternativa prevista: secret `FRADELLI_PACKAGES_TOKEN`, com leitura do pacote, caso o acesso do token automático entre os proprietários não seja permitido.
- O build da Vercel também recebe a autenticação de instalação, pois pode instalar dependências ao preparar os artefatos. O deploy continua usando artefatos pré-construídos.

O acesso do `GITHUB_TOKEN` deste repositório ao pacote ainda precisa ser comprovado na CI da futura PR. Nenhuma permissão no pacote nem secret do GitHub foi alterado nesta etapa. Se for necessário cadastrar uma credencial nova, esse passo fica com o usuário.

## Validação e entrega

Evidências detalhadas desta implementação ficam no plano arquitetural e no diário local ignorado. A entrega é local, na branch `codex/design-system-portfolio`, para revisão visual do usuário antes de PR para developer e promoção separada para main.

Não declarar a CI ou o deploy desta migração aprovados antes de executá-los. A auditoria atual registra 18 alertas (17 altos e um moderado); esta migração não executa audit fix nem declara resolução desse passivo.

## Reutilização futura das superfícies de vidro

O usuário confirmou interesse em usar o mesmo tratamento em outro projeto. A evolução recomendada é oferecer uma superfície de vidro no pacote compartilhado, com contrato público para cor derivada dos tokens, opacidade, desfoque, borda, fallback e estados de interação. A API final deve ser definida no repositório do Design System, com exemplos e validação sobre fundos claros, escuros e animados; pode ser uma variante de Card ou uma superfície componível, conforme os consumidores reais.

Tipografia editorial do hero, margem das âncoras, estrelas e animações de habilidades continuam responsabilidades do portfólio. Quando houver uma versão publicada com a superfície compartilhada, atualizar os consumidores e remover a implementação local equivalente, preservando a aparência aprovada. Esta entrega apenas registra a direção; não altera nem publica o Design System e não modifica outro produto.

## Reversão

Se a migração não for aprovada, restaurar o conjunto anterior de código, manifesto e lockfile como uma unidade, preservando o trabalho do usuário. A base de developer usada nesta etapa é `418dea1`. Após uma futura integração, a reversão deve passar por PR, sem reescrever histórico compartilhado. Não basta voltar somente o CSS, pois os consumidores passam a depender do pacote.
