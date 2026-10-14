# Plano de atualização dos dados e do conteúdo profissional

## 1. Escopo e decisão de execução

Planejamento solicitado em 13/10/2026 para `C:/Users/devel/Projects/dev-lucas-lima-web` e posteriormente aprovado pelo usuário para implementação local e revisão visual. As seções 2–11 registram a proposta original e seus limites; a seção 12 registra o resultado implementado. A aprovação inclui resumos nos cards das empresas.

O posicionamento é **Full Stack Developer | Product Engineer**. A narrativa deve conectar operações administrativas e financeiras, design e engenharia de software. A combinação de engenharia, visão de negócio, produto e experiência do usuário será demonstrada por contribuições concretas, preservando a voz pessoal e a identidade espacial do site.

A base técnica é a organização de componentes e features já integrada em `developer`, com versões `en-US` e `pt-BR`. A implementação editorial futura deve partir de `developer` atualizada e seguir o AGENTS.md do projeto. A autorização posterior permite implementar a proposta localmente. Publicação, promoção para main, envio de email e deploy continuam fora desta entrega.

## 2. Fontes consultadas e precedência

O AGENTS.md do vault foi lido. As fontes foram consultadas somente para leitura; nenhum arquivo do vault, Kaizen ou Sandicts foi alterado por este planejamento.

| Fonte no personal-vault                             | Uso neste plano                                                                                                                      |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `01 - CAREER/EXPERIÊNCIAS PROFISSIONAIS.md`         | Fonte principal de cargos, períodos, contribuições, tecnologias, formação e limites de afirmação                                     |
| `01 - CAREER/PERFIL PROFISSIONAL.md`                | Posicionamento, oportunidades, competências prioritárias e princípios de comunicação                                                 |
| `01 - CAREER/CURRÍCULO MESTRE.md`                   | Síntese da trajetória; não prevalece sobre os limites da fonte principal                                                             |
| `01 - CAREER/LINKEDIN.md`                           | About informado como aplicado em 12/10/2026 e sua versão equivalente; alternativas formal/conversacional/ousada permanecem propostas |
| `01 - CAREER/PRESENÇA PROFISSIONAL.md`              | Direção do portfólio e critérios para estudos de caso públicos                                                                       |
| `01 - CAREER/REFERÊNCIA DE MERCADO - FULL STACK.md` | Referência de mercado, sem atribuir requisitos da vaga à experiência pessoal                                                         |
| `03 - PROJECTS/SANDICTS.md`                         | Contexto do MVP e distinção entre escopo e implementação                                                                             |
| `03 - PROJECTS/KAIZEN.md`                           | Contexto do produto pessoal, estágio e limites de destaque público                                                                   |

A raiz do vault é `C:/Users/devel/Projects/personal-vault`. As notas de projetos registram verificação em 22/09/2026; isso não prova que cada capacidade descrita esteja concluída hoje. O estado de funcionalidades deverá ser confirmado nas fontes oficiais antes de detalhar estudos de caso.

Em divergências, preservar os fatos e os limites da fonte principal. Exemplo: o currículo mestre usa a expressão solo para o trabalho na WeFit; a fonte principal delimita responsabilidade individual nas frentes assumidas e colaboração com outras áreas. No site, usar essa formulação delimitada. A autoria solo do Sandicts, por outro lado, está confirmada.

Na etapa original, a instrução direta era **somente planejar**. Depois de revisar o plano, o usuário autorizou a implementação para visualizar o resultado, incluindo mini resumos nos cards de empresas.

## 3. Inventário e diagnóstico do site atual

Entradas examinadas: `src/app/page.tsx`, `src/app/layout.tsx`, contratos e montagem de conteúdo em `src/features/portfolio/content/`, componentes de apresentação das features, cópias e contrato do contato, e os arquivos `src/i18n/messages/en-US.json` e `pt-BR.json`.

| Área atual              | Problema ou ausência                                                                                                                          | Correção planejada                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Hero e cartão de perfil | Full Stack Developer alterna com Stronger in Front End e UI/UX Enthusiast; Product Engineer não aparece                                       | Apresentar os dois pilares atuais e usar design/UX como parte da combinação profissional                                   |
| About                   | Biografia centrada em idade/origem e descrição genérica de tecnologias; não cita WeFit, produtos pessoais ou a trajetória em operações/design | Adaptar o About aprovado, com carreira, trabalho atual, autoria de produtos, princípios e personalidade                    |
| Experiências            | WeFit e Chãozão ausentes; apenas cargo, empresa e anos                                                                                        | Adicionar contexto, contribuição e resultado qualitativo verificável; corrigir períodos e títulos                          |
| Visite AI               | Grafia Visit Ai e período anual genérico                                                                                                      | Usar Visite AI e junho/2024–abril/2025                                                                                     |
| StartU                  | Período genérico; liderança sem espaço para contextualização                                                                                  | Setembro/2024–fevereiro/2025; Full Stack Developer, com coordenação técnica nas contribuições                              |
| Declink                 | Full Stack genérico esconde Java/Android                                                                                                      | Identificar atuação em Java/Android e modernização confirmada                                                              |
| SantaGroup              | Grafia Santa Group e datas anuais genéricas                                                                                                   | Usar SantaGroup e julho/2022–julho/2023                                                                                    |
| Freelancer              | Web Designer é mais estreito que a experiência documentada                                                                                    | Designer freelancer de UX/UI e identidade visual; outubro/2019–janeiro/2023                                                |
| Rota Sul                | Dois cargos separados com períodos 2015–2020 e 2020–2022 não sustentados pela fonte principal atual                                           | Usar o registro consolidado de Gerente Administrativo e Financeiro, junho/2015–março/2022; dividir apenas após confirmação |
| Experiência anterior    | RZ Arquitetura e Sierra Móveis ausentes                                                                                                       | Incluir síntese curta de títulos/períodos, sem inventar descrições de atividades                                           |
| Projetos                | Não existe seção de produtos próprios                                                                                                         | Propor seção Selected Products/Produtos pessoais com Sandicts; mencionar Kaizen de forma proporcional à evidência          |
| Formação                | Não existe seção                                                                                                                              | Propor uma seção curta com ADS concluído em 2025; outras formações somente quando acrescentarem contexto                   |
| Competências            | Dez badges; falta destaque a NestJS, Java, Spring Boot/WebFlux e competências atuais                                                          | Selecionar competências atuais por evidência e contexto, sem transformar tudo em badges flutuantes                         |
| Contato                 | Formulário espacial e links sociais; falta chamada orientada a produtos/problemas                                                             | Manter identidade visual e tornar o convite profissional mais claro                                                        |
| Metadados               | Descrição genérica de portfolio website                                                                                                       | Refletir Full Stack Developer e Product Engineer em inglês e português naturais                                            |
| Dados bilíngues         | URLs, datas, IDs, imagens e nomes tecnológicos repetidos nos JSONs                                                                            | Separar fatos estáveis e traduções; impedir divergência entre idiomas                                                      |

Não há hoje navegação global, projetos ou formação. Sua criação é uma ampliação proposta, não uma correção de componentes já existentes. As seções atuais usam `about`, `philosophy`, `journey` e `contact`.

## 4. Arquitetura de informação proposta

Ordem recomendada: **Hero → About → Produtos selecionados → Experiências → Competências/Formação → Filosofia → Contato**. A ordem definitiva pode preservar a composição atual se a revisão visual mostrar melhor continuidade; os produtos próprios devem ganhar destaque antes de a pessoa precisar percorrer toda a timeline.

- Hero: nome/identidade atuais, Full Stack Developer e Product Engineer como mensagens principais. A animação continua apagando do fim ao início e esvaziando o texto antes do próximo.
- About: cinco blocos curtos, com a narrativa fornecida como base. Recomenda-se retirar idade e contagem de anos do texto principal para evitar manutenção de informações que não ajudam o posicionamento. Isso é uma proposta editorial, não uma remoção já executada.
- Produtos: Sandicts em destaque, identificado como MVP em desenvolvimento e produto de autoria solo. Kaizen permanece citado no About; um cartão independente depende de evidência pública adequada.
- Experiências: mais contexto para WeFit, Chãozão e experiências recentes; experiências anteriores em uma parte compacta da trajetória.
- Competências: uma seleção visual curta e categorias complementares associadas a experiências reais. Evitar vinte ou mais elementos animados apenas para listar termos.
- Formação: ADS em destaque. Idiomas/certificações podem ser exibidos em texto discreto, se desejado; o certificado EF SET não descreve a fluência atual.
- Filosofia: preservar os quatro princípios e a voz pessoal. Distinguir o princípio Kaizen do produto pessoal homônimo para evitar ambiguidade.
- Contato: manter a estética espacial, formulário e destinatário aprovados; convite claro para conversar sobre produtos, problemas e oportunidades.

Navegação nova, se aprovada: links âncora para About, Products, Experience e Contact; incluir foco visível e deslocamento que não encubra títulos. Não criar menu complexo sem necessidade para uma página única.

## 5. Proposta editorial para Hero e About

### Hero

- Manter o H1 Dev Lucas Lima.
- Priorizar `Full Stack Developer` e `Product Engineer` na sequência animada.
- Uma terceira mensagem pode comunicar a combinação de engenharia, produto e UX, sem sugerir um cargo adicional. Confirmar seu texto na revisão editorial.
- Remover Stronger in Front End da proposta futura, pois não representa os dois pilares definidos agora. UI/UX continua aparecendo no contexto da trajetória e dos produtos.

### About — proposta em inglês, ainda não aplicada

My journey began in administrative and financial operations, moved through design, and led me to software development. Curiosity and the desire to turn ideas into useful solutions connect every step.

Today, I work as a Full Stack Developer at WeFit, building frontend applications, backend services, and reactive APIs. I combine engineering, product thinking, and user experience to build software for users, businesses, and the people maintaining it.

I also build my own products. I am the sole developer of Sandicts, an MVP in development for the sand sports community, and handle product definition, design, implementation, and delivery. I am also creating Kaizen to organize and improve my training, nutrition, and routine.

I value clear code, maintainable systems, and decisions that reduce complexity. I want to work with people who share the desire to make the world a better place.

Outside work, you will usually find me at the beach, playing footvolley, or learning new recipes on YouTube.

### About — proposta equivalente em português, ainda não aplicada

Minha trajetória começou em operações administrativas e financeiras, passou pelo design e me levou ao desenvolvimento de software. A curiosidade e a vontade de transformar ideias em soluções úteis conectam cada etapa desse caminho.

Hoje trabalho como Desenvolvedor Full Stack na WeFit, criando aplicações frontend, serviços de backend e APIs reativas. Combino engenharia, visão de produto e experiência do usuário para construir software que funcione para as pessoas, para os negócios e para quem vai manter o sistema.

Também desenvolvo meus próprios produtos. Sou o único desenvolvedor do Sandicts, um MVP em desenvolvimento para a comunidade de esportes de areia, e cuido da definição do produto, do design, da implementação e da entrega. Também estou criando o Kaizen para organizar e melhorar meu treino, minha alimentação e minha rotina.

Valorizo código claro, sistemas fáceis de manter e decisões que reduzem a complexidade. Quero trabalhar com pessoas que compartilhem a vontade de tornar o mundo melhor.

Fora do trabalho, você geralmente vai me encontrar na praia, jogando futevôlei ou aprendendo receitas novas no YouTube.

Os textos mantêm a versão fornecida como base e reduzem sua extensão para o site. Não substituem as alternativas do LinkedIn nem sugerem que todas foram aprovadas. Foto, cores, tipografia e metáfora espacial permanecem referências de identidade.

## 6. Experiências: fatos e nível de detalhe

Cada entrada futura precisa de um ID estável, organização, cargo verificável, datas com precisão conhecida, um contexto e até três contribuições relevantes. A tradução pode mudar a redação; não pode mudar o cargo, período, resultado ou tecnologias comprovadas.

| Entrada                        | Cargo/período sustentados                               | Conteúdo recomendado e limites                                                                                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WeFit — Digital Service Design | Tech Designer / Full Stack Developer; set/2025–atual    | Entregas entre React/Next, Node/NestJS e Java/Spring Boot/WebFlux; evolução qualitativa de observabilidade, cache, manutenção e continuidade do trabalho. Não atribuir criação original do GO nem exclusividade sobre o produto inteiro |
| Chãozão                        | Full Stack Developer; mai/2025–set/2025                 | Modernização de plataforma existente, separação de responsabilidades, planos dinâmicos e Google Login/One Tap. Asaas era integração existente; nenhum ganho percentual foi medido                                                       |
| Visite AI                      | Frontend Developer; jun/2024–abr/2025                   | Autoria solo do frontend B2B, dashboards/fluxos responsivos, formulários e integração no contexto AWS EC2/S3. Não ampliar autoria para o backend ou produto inteiro                                                                     |
| StartU                         | Full Stack Developer; set/2024–fev/2025                 | Coordenação técnica, arquitetura, dados PostgreSQL/Prisma, testes/CI e autenticação. Não promover para Tech Lead; descrever liderança nas contribuições                                                                                 |
| Declink                        | Full Stack Java Developer / Android; mai/2023–mai/2024  | Interfaces Android, Java legado, migração JBoss/WildFly e containerização. Sem métricas inventadas                                                                                                                                      |
| SantaGroup                     | Frontend Developer; jul/2022–jul/2023                   | Figma para interfaces React/TypeScript e micro frontends de jogos, com responsividade e fidelidade visual                                                                                                                               |
| Freelancer                     | Designer / UX/UI e identidade visual; out/2019–jan/2023 | Interfaces, identidades visuais, ilustrações e materiais de comunicação; ferramentas de design somente quando ajudarem a explicar a contribuição                                                                                        |
| Rota Sul                       | Gerente Administrativo e Financeiro; jun/2015–mar/2022  | Síntese das rotinas administrativas/financeiras e visão de negócio. O registro consolidado substitui a divisão não confirmada em dois cargos                                                                                            |
| RZ Arquitetura                 | AutoCAD Designer; mar/2015–jun/2015                     | Título/período registrados no PDF do LinkedIn; não inventar descrição detalhada                                                                                                                                                         |
| Sierra Móveis                  | Production Planning Analyst; jan/2012–mar/2015          | Título/período registrados no PDF do LinkedIn; não inventar descrição detalhada                                                                                                                                                         |

As sobreposições Visite AI/StartU e SantaGroup/Declink são mantidas. Não ajustar datas para produzir uma timeline sem sobreposição. Tipo de vínculo, jornada e formato devem ser omitidos quando não estiverem confirmados.

O Sandicts será apresentado em Produtos, evitando repetir uma descrição completa como se fosse outro empregador. Um resumo na trajetória pode referenciar a mesma entidade se isso ajudar a leitura.

Na WeFit, o texto fornecido já autoriza a menção ao empregador. O About proposto dispensa nomes de clientes, detalhes internos e escala. Um estudo de caso do GO exige revisão específica de divulgação. Se os mais de 40 mil corretores forem usados posteriormente, identificá-los como público da operação, nunca como resultado individual.

## 7. Produtos, formação, competências e contato

### Produtos

**Sandicts:** proposta de cartão com problema da comunidade, responsabilidade solo, decisões de produto/design/engenharia e status MVP em desenvolvimento. Usar o link público confirmado `https://sandicts.com.br/`. A lista de funcionalidades não será publicada a partir do escopo do MVP: distinguir implementadas, em teste, prototipadas e planejadas com evidências atuais dos repositórios oficiais. Não afirmar usuários, reservas, arenas, receita, adoção ou impacto comercial.

**Kaizen:** menção curta no About como produto pessoal em criação. A nota do vault descreve o núcleo inicial de dieta e treino do dia, com planos e registros; isso é um registro verificado em setembro, não uma auditoria atual. Daily Journal, tarefas, metas e métricas são direção futura. Não criar um cartão amplo ou botão de demo sem evidência pública e destino confirmado.

**Estudo de caso GO:** possível etapa posterior, anonimizada ou limitada a informação pública autorizada. Estrutura recomendada: contexto, problema, contribuição delimitada, decisão, resultado qualitativo e limites. Não buscar nem copiar material corporativo sensível para o site.

### Formação e idiomas

- ADS, Descomplica Faculdade Digital: concluído em 2025. Início registrado em julho/2023; não inferir mês exato de conclusão a partir do fim do período no PDF.
- Economia: pausada. Arquitetura e Urbanismo: cancelada. Não apresentar como graduações concluídas; inclusão opcional e somente com contexto útil.
- Rocketseat: confirmar nome oficial e natureza da formação antes de usar diploma/certificação ou criar uma credencial.
- Português: nativo. Inglês: B1 por autoavaliação. O EF SET 66/100 C1 Advanced é uma evidência distinta; não rotular o inglês falado como avançado ou fluente.
- Sem URL/ID/data confirmados da credencial, não inventar um link ou selo verificável.

### Competências

| Grupo            | Exemplos sustentados                                                         | Contexto de evidência                                 |
| ---------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| Frontend         | React, Next.js, TypeScript; Vue em experiência anterior                      | WeFit, Chãozão, StartU, SantaGroup, Visite AI         |
| Backend/APIs     | Node.js, NestJS, Java, Spring Boot, WebFlux; Fastify em experiência anterior | WeFit, Chãozão, StartU, Declink                       |
| Dados e operação | PostgreSQL, Prisma, Redis, Docker, CI/CD                                     | Sandicts, StartU, WeFit, Chãozão, Declink             |
| Qualidade        | Testes automatizados, code review, observabilidade, manutenção               | StartU e WeFit, com outras contribuições documentadas |
| Produto e design | Modelagem de domínio, regras de negócio, UX/UI, identidade visual            | Sandicts, trabalhos de design e trajetória anterior   |

Selecionar aproximadamente 10–12 competências principais para a experiência visual existente; apresentar as complementares como contexto, sem fazer todas flutuarem. Esse limite é uma proposta de legibilidade, não uma medida de desempenho.

O badge atual SQL usa o identificador postgresql; a futura apresentação deve dizer PostgreSQL quando essa for a experiência evidenciada. GraphQL aparece no site antigo, mas precisa de confirmação contextual nas fontes atuais antes de permanecer como competência destacada. Não incorporar Vite, MongoDB, Java 21, Maven, OAuth 2.0, JUnit, Mockito, agentes ou governança de IA somente porque aparecem na vaga de referência.

Uso diário de IA para programar pode ser descrito como prática de desenvolvimento. Isso não comprova funcionalidades de IA em produção, agentes, seleção de modelos ou governança de IA.

### Contato e metadados

- Preservar email público `developerlucaslima@gmail.com`, LinkedIn e GitHub atuais. Não acrescentar telefone.
- Manter o formulário e sua validação/envio já refatorados. Não mudar regras, destinatário ou configuração Resend por uma tarefa editorial.
- Propor um convite curto relacionado a produtos, problemas e oportunidades, usando inglês e português naturais dentro da estética espacial atual.
- Metadados podem usar Lucas Lima — Full Stack Developer / Product Engineer e uma descrição curta da combinação profissional, sem lista artificial de keywords.
- Canonical, Open Graph, currículo para download e botão de demo dependem de URL/artefato confirmado. Não presumir que o domínio antigo é o definitivo.

## 8. Refatoração proposta dos dados

Os fatos comuns aos dois idiomas devem ter uma única fonte versionada dentro do site. O vault alimenta a revisão humana; a aplicação não deve ler caminhos `C:/...`, importar notas privadas, consultar o Obsidian em runtime ou depender de uma cópia integral do vault.

### Separação de responsabilidades

- **Dados:** IDs, nomes de organizações/produtos, períodos com precisão conhecida, status, vínculos confirmados, contatos, URLs e relações com tecnologias.
- **Mensagens:** títulos traduzidos, descrições, contribuições, chamadas, nomes acessíveis e rótulos de status/data.
- **Tipos:** contratos e estados válidos, sem depender da aparência.
- **Utilitários:** formatação pura de períodos por locale, tratamento de datas abertas e precisão ano/mês. Não transformar strings traduzidas em regra de negócio.
- **Composição:** montagem de conteúdo no servidor a partir de dados e mensagens. Substituir as asserções `as unknown as` por contratos e montagem verificáveis ao evoluir o modelo.
- **Componentes:** renderizam os dados recebidos. Estilos, hooks e constantes continuam próximos dos consumidores reais.

### Arquivos previstos, a criar somente na implementação autorizada

| Caminho relativo ao projeto                                                   | Responsabilidade e ação                                                                                                              |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `src/features/portfolio/content/profile.data.ts`                              | Dados públicos comuns do perfil e contatos; não incluir telefone nem dados pessoais sem finalidade                                   |
| `src/features/portfolio/content/professional-experiences.data.ts`             | Entidades com IDs semânticos e períodos independentes do idioma                                                                      |
| `src/features/portfolio/content/personal-projects.data.ts`                    | Sandicts e, se aprovado, Kaizen; autoria/status/destinos confirmados                                                                 |
| `src/features/portfolio/content/education.data.ts`                            | Formação e precisão de datas; credenciais opcionais apenas quando confirmadas                                                        |
| `src/features/portfolio/content/skills.data.ts`                               | Competências e relações com experiências/produtos, evitando duplicação entre idiomas                                                 |
| `src/features/portfolio/content/portfolio-content.types.ts`                   | Evoluir contratos para experiências, projetos, formação e competências; dividir tipos apenas se houver responsabilidade independente |
| `src/features/portfolio/content/format-experience-period.ts`                  | Formatar período com mês/ano ou apenas ano e data final aberta, recebendo locale                                                     |
| `src/features/portfolio/content/get-portfolio-content.ts`                     | Montagem server-side; remover cálculo de idade/duração somente se deixarem de ter consumidores no conteúdo aprovado                  |
| `src/i18n/messages/en-US.json` e `pt-BR.json`                                 | Textos naturais e equivalentes, referenciados por IDs semânticos; remover datas/URLs/IDs duplicados após migração                    |
| `src/features/portfolio/ui/components/journey-section/`                       | Renderizar contexto e contribuições; usar IDs estáveis como keys e links opcionais                                                   |
| `src/features/portfolio/ui/components/projects-section/`                      | Nova seção somente se aprovada, com componente/tipos/estilos próprios e cartões filhos se a composição justificar                    |
| `src/features/portfolio/ui/components/education-section/`                     | Nova seção curta somente se aprovada; não criar arquivos vazios nem uma feature completa para um único cartão                        |
| `src/features/portfolio/ui/components/about-content/` e `hero-intro/`         | Integrar novos textos preservando foto, visual, animação e acessibilidade                                                            |
| `src/features/portfolio/ui/components/about-section/components/skills-field/` | Ajustar seleção e nomes acessíveis; ampliar ícones/contratos apenas para os badges aprovados                                         |
| `src/app/page.tsx`                                                            | Compor as seções aprovadas, sem colocar fatos ou regras de cálculo na página                                                         |
| `src/app/layout.tsx`                                                          | Atualizar metadados via mensagens; manter lang/provider existentes                                                                   |

Este inventário propõe arquivos por responsabilidade real. Se uma nova seção não for aprovada, seus arquivos não serão criados. Links podem ser ausentes: não usar `#`, URL inventada ou um botão de demo que não existe.

### Contratos e invariantes mínimos

- Experiência: ID, organização, cargo/chave editorial, início, fim opcional, precisão das datas, contexto e IDs de contribuições/tecnologias.
- Projeto: ID, nome, autoria, estado explícito, resumo e destinos opcionais. Funcionalidade tem estado distinto da visão do produto.
- Formação: ID, instituição, curso, estado e precisão da conclusão. Um ano confirmado não exige inventar um mês.
- Períodos não mudam entre idiomas; meses e o rótulo atual/present são traduzidos na apresentação.
- Histórico não é criado pela ordem do array. Usar datas reais e preservar sobreposições.
- Tipos não são uma camada de evidência: o plano e a matriz de fontes registram por que uma afirmação pode ser publicada.
- Paths privados, anotações confidenciais e rastreabilidade interna ficam na documentação humana; não são props enviadas ao navegador.

## 9. Sequência de implementação futura

| Etapa                      | Entrega                                                                               | Dependência/aceite                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1. Fechar matriz editorial | Aprovar Hero/About, inventário de fatos, nível de detalhe e inclusão das seções novas | Fontes atuais e escolhas desta revisão; omitir afirmações pendentes                     |
| 2. Consolidar dados        | Separar entidades comuns e mensagens EN/PT, com IDs e períodos precisos               | Nenhuma mudança de fato sem origem; links/status sem duplicação por locale              |
| 3. Atualizar apresentação  | Hero, About, cartão e metadados                                                       | Texto aprovado; typewriter, legibilidade mobile e foto preservados                      |
| 4. Atualizar trajetória    | Entradas recentes e experiência anterior compacta                                     | Cargos e períodos da matriz; contribuições qualitativas verificáveis                    |
| 5. Produtos e formação     | Seções aprovadas, com Sandicts e ADS; Kaizen proporcional                             | Status explícito, ausência de funcionalidades planejadas apresentadas como entregues    |
| 6. Competências e contato  | Seleção de badges, contexto e chamadas profissionais                                  | Tecnologias sustentadas; formulário continua funcional nos dois idiomas                 |
| 7. Revisão e entrega       | Revisão factual/linguística, gates e browser; PR para developer                       | Nenhum dado confidencial, erro de lint, regressão de idioma ou quebra de link conhecida |

Recomenda-se uma PR de conteúdo/modelo de dados e outra para novas seções se o diff visual crescer muito. A separação final deve deixar cada mudança revisável e funcionando; não criar uma sequência de PRs que precise de todas para compilar. Não há prazo ou estimativa de horas confirmados nesta solicitação.

## 10. Validação e critérios de aceite

### Conteúdo e equivalência

- WeFit e Chãozão presentes com cargos/períodos verdadeiros e contribuições delimitadas.
- Full Stack Developer e Product Engineer apresentados consistentemente.
- Datas, nomes, URLs, status, autoria e tecnologias iguais nas duas versões.
- Inglês e português naturais; o About aplicado e a fonte principal prevalecem sobre alternativas não aprovadas.
- Nenhuma métrica inventada, Tech Lead presumido, produto comercialmente lançado sem evidência ou inglês fluente inferido do EF SET.
- Nenhum requisito da vaga de referência incorporado como competência sem evidência.

### Código, visual e funcionamento

- Instalação reproduzível, `npm run ci`, `git diff --check` e busca de segredos nos arquivos alterados.
- Testar invariantes relevantes: período aberto, data com precisão apenas de ano, paridade dos IDs, ausência de experiências/projetos perdidos e equivalência dos fatos. Evitar testes que apenas repitam os textos da implementação.
- Verificar se traduções longas não quebram hero, cards, timeline, tooltips e CTAs em telas estreitas e largas.
- Testar idioma/persistência, teclado/foco, ordem de headings, links descritivos, contraste, nomes acessíveis e movimento reduzido.
- A animação deve apagar do fim ao início, chegar a vazio e depois escrever a próxima frase.
- Verificar destinos públicos, redirecionamentos e anchors. Sites externos podem bloquear robôs: distinguir esse bloqueio de link inexistente, sem declarar uma verificação que não ocorreu.
- Formulário: validar campos e troca de idioma sem enviar email real. Um teste de entrega só acontecerá se autorizado especificamente.
- Conferir que componentes renderizam, hooks cuidam de estado/efeitos, utilitários permanecem puros e dados/mensagens não escondem regras visuais.

Nesta fase, os links profissionais e o estado atual de funcionalidades dos produtos não foram auditados externamente. Esses checks são passos de implementação, não evidências de aprovação atual.

## 11. Confirmações e como avançar sem inventar

| Informação                                                        | Necessidade                                      | Conduta enquanto faltar                                          |
| ----------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------- |
| Inclusão de novas seções de Produtos/Formação e ordem proposta    | Decisão de apresentação                          | Manter o plano como proposta; nenhuma seção foi criada           |
| Tipo dos vínculos sobrepostos                                     | Só para exibir jornada/contrato                  | Preservar datas, omitir modalidade não confirmada                |
| Cargo formal Tech Lead na StartU                                  | Só se desejar esse título                        | Usar Full Stack Developer e descrever coordenação técnica        |
| Divisão histórica da Rota Sul em cargos distintos                 | Só se desejar separar fases                      | Usar o registro consolidado atual da fonte principal             |
| Nome oficial/natureza da formação Rocketseat e credencial EF SET  | Só para cartões/certificados completos           | Omitir título de certificado não confirmado e links inexistentes |
| Mês exato da conclusão de ADS                                     | Não bloqueia formação                            | Exibir concluído em 2025                                         |
| Permissão/recorte público de GO e Porto                           | Só para estudo de caso detalhado                 | Usar WeFit e atuação Full Stack sem detalhes corporativos        |
| Demonstração pública e funções atuais de Kaizen                   | Só para destaque independente                    | Manter menção curta de produto pessoal em criação                |
| Funções de Sandicts efetivamente concluídas hoje                  | Necessária para listar funcionalidades entregues | Mostrar MVP em desenvolvimento e responsabilidades confirmadas   |
| Domínio definitivo do portfólio e URLs novas de empresas/projetos | Necessária para novos destinos/canonical         | Preservar links aprovados, validar antes de trocar               |
| Contexto de GraphQL e tecnologias citadas só no PDF/referência    | Só para destacar essas competências              | Priorizar stack já sustentada pelas fontes principais            |

As informações pendentes não impedem planejar nem atualizar futuramente as partes comprovadas. Para iniciar a execução, a decisão essencial é aprovar o recorte editorial e as seções propostas; detalhes opcionais podem ser omitidos até confirmação.

## 12. Implementação local aprovada — 13/10/2026

### Resultado

- Hero e cartão de perfil apresentam Full Stack Developer/Desenvolvedor Full Stack e Product Engineer. About utiliza a base editorial aprovada em cinco parágrafos equivalentes em EN/PT; idade e duração calculadas não entram mais na biografia.
- Metadados e convite de contato refletem engenharia, produto e experiência do usuário. A foto, a identidade espacial, o formulário e os quatro princípios filosóficos foram preservados.
- Navegação por âncoras para About/Sobre, Produtos, Experiência, Competências e Contato; todos os destinos existem.
- Experiências incluem WeFit, Chãozão e a trajetória anterior. Meses, períodos sobrepostos e cargos seguem a fonte principal. StartU permanece Full Stack; Rota Sul usa o período consolidado. Não há métricas inventadas, dados de clientes ou autoria original atribuída ao trabalho da WeFit.
- Cada card de empresa mostra cargo, período e um resumo sempre visível. Contribuições adicionais usam `details/summary`, operável por clique, toque e teclado, sem depender de hover. Empresa é heading h3; link externo, quando existente, é separado da expansão.
- Sandicts aparece como produto de autoria solo, de janeiro/2026–atual e MVP em desenvolvimento ativo, com responsabilidades e tecnologias confirmadas. Não há lista de funcionalidades planejadas apresentada como entregue. Kaizen permanece mencionado proporcionalmente no About.
- Competências por contexto e dez badges selecionados; NestJS, Java e Spring Boot ganham representação. GraphQL deixa de ser destaque por falta de contexto confirmado.
- Formação destaca ADS concluído em 2025, sem inventar mês. Português nativo e inglês B1 por autoavaliação; certificados sem URL/natureza confirmadas e cursos não concluídos ficam omitidos nesta apresentação.

### Organização e semântica

Fatos compartilhados estão em `professional-experiences.data.ts`, `personal-projects.data.ts`, `education.data.ts` e `portfolio-profile.data.ts`, próximos do montador server `get-portfolio-content.ts`. As mensagens contêm redação traduzida; datas, nomes de empresas, URLs, tecnologias e IDs não são repetidos por idioma.

O montador retorna `PortfolioContent` tipado, sem a conversão `as unknown as` anterior. `format-professional-period.ts` faz a formatação pura de ano/mês e períodos abertos, rejeitando datas inválidas. Os componentes novos têm pasta própria, tipos e estilos próprios; `ExperienceCard` pertence a JourneySection. A expansão nativa não requer hook de estado adicional.

A animação de digitação não foi alterada: a revisão do hook confirma remoção do último caractere até zero antes da próxima frase, e tratamento existente de movimento reduzido. Não se atribui a esta revisão um teste temporal completo da animação nem um teste de preferência de movimento no navegador.

### Evidências executadas

- `npm run ci`: passou integralmente, incluindo formatação, lint sem erros/avisos, tipos, estrutura de 152 módulos, 14 testes e build de produção.
- Primeira tentativa de build foi impedida pelo acesso restrito do compilador nativo SWC ao diretório no Windows; nova execução com a permissão apropriada passou. Nenhuma alteração no código foi necessária para esse impedimento ambiental.
- Testes adicionados cobrem precisão de ano/mês, período aberto, datas inválidas, IDs únicos, cobertura dos dois idiomas, ausência de fatos duplicados nas experiências traduzidas e estado de MVP/formação.
- `git diff --check` e busca heurística de segredos nos arquivos alterados: passaram, sem achados. A busca não substitui uma ferramenta de auditoria especializada.
- Navegador no build de produção: conteúdo EN/PT, `html lang`, metadados, persistência do idioma, âncoras e expansão das contribuições por teclado verificados. Tela estreita com viewport CSS de 400 px e tela larga de 1600 px não apresentaram overflow horizontal.
- Formulário validado com dados inválidos: três erros traduzidos e nome preservado ao trocar idioma. Nenhum email real enviado. Console sem erros/avisos nas verificações.
- Capturas locais de revisão em `docs/worklog/previews/`, ignoradas pelo Git. Prévia local na porta 3003; não é publicação nem deploy.

### Links e pendências delimitadas

Sandicts, GitHub e Behance responderam HTTP 200. StartU, Declink e SantaGroup foram acessíveis pela ferramenta de navegação; Visite AI foi reconhecido, sem conteúdo textual extraído. O LinkedIn retornou 405 para HEAD e 999 para GET, bloqueando a verificação automatizada: endereço aprovado preservado, sem afirmar uma verificação manual concluída.

O endereço antigo `https://www.rotasul.tur.br/` não resolveu DNS na verificação direta e a ferramenta de navegação também falhou. Seu botão foi retirado, mantendo a experiência; confirmar um destino público atual antes de reintroduzi-lo. WeFit, Chãozão, RZ Arquitetura e Sierra Móveis não receberam URLs inventadas.

Permanecem opcionais: credenciais completas, divisão de cargos da Rota Sul, modalidades dos vínculos sobrepostos, funcionalidades públicas atuais dos produtos e domínio definitivo do portfólio. As partes comprovadas foram implementadas sem depender dessas informações. Alterações disponíveis localmente na branch `codex/conteudo-profissional`, sem commit, push, merge, promoção para main ou deploy nesta etapa.

## 13. Revisão das contribuições confirmada pelo usuário — 14/10/2026

- WeFit: o vínculo permanece atual; as contribuições descritas são do Porto GO e foram redigidas no passado. O nome do produto foi confirmado diretamente pelo usuário para contextualizar esse trabalho. A transferência foi informada como futura; não se inventam nome, data ou entregas de um próximo produto, nem se atribui criação original do GO.
- Chãozão: destaque para a reformulação dos fluxos de login/cadastro e aquisição de planos, do design à implementação. Google Login/One Tap e o modelo de planos continuam contextualizados. Melhorar conversão é o objetivo do trabalho; não há afirmação de aumento medido. A referência genérica ao Asaas saiu dos destaques por não representar a principal contribuição confirmada.
- StartU: desempenho é a contribuição central. Incluídos o planejamento da arquitetura e a criação de um repositório de backend em NestJS, separando a lógica de servidor antes concentrada no Next.js, e a refatoração de dados. Performance melhorada é uma contribuição qualitativa confirmada pelo usuário; escalabilidade e legibilidade aparecem como objetivos, sem métricas inventadas ou exposição de manifestações de clientes.
- Português e inglês receberam conteúdo equivalente. Os ajustes ficam nas mensagens de conteúdo; contratos, componentes, estilos, cargos e períodos não exigem alteração.

Fonte desta revisão: esclarecimentos fornecidos pelo usuário nesta conversa, posteriores à consulta inicial do vault. Nenhum arquivo do vault foi alterado.

Validações desta revisão: formatação, lint, tipos e os 14 testes existentes passaram. O servidor local respondeu HTTP 200 em português e inglês, com as contribuições atualizadas nos três cards. `git diff --check` e busca heurística de segredos passaram. Como a mudança é editorial em JSON, o build de produção não foi repetido; a compilação de desenvolvimento foi verificada nos dois idiomas. Os testes continuam emitindo o aviso anterior do Node sobre detecção de módulos TypeScript, sem falhas.

## 14. Visite AI e links confirmados — 14/10/2026

O usuário confirmou que desenvolveu o design na Visite AI, planejando com os responsáveis pelo produto e seguindo até a implementação do código. Resumo e contribuições em português e inglês passam a explicitar essa atuação, mantendo o cargo e as demais contribuições já confirmadas.

Incluídos nos dados compartilhados os endereços fornecidos pelo usuário: [RZ Arquitetura](https://www.rzarquitetura.com.br/) e [Sierra Móveis](https://www.sierra.com.br/). Ambos foram acessíveis pela ferramenta de navegação e identificaram as respectivas empresas. Os cards reutilizam o link externo existente, sem alterar componentes ou duplicar URLs nas traduções. As informações pessoais desta revisão vieram diretamente do usuário; os sites foram consultados para verificar os destinos, sem inferir novas responsabilidades profissionais.

Validações: formatação, lint, tipos, três testes de conteúdo profissional e `git diff --check` passaram; busca heurística de segredos sem achados. Respostas HTTP 200 em português e inglês, com o novo texto da Visite AI e os dois links confirmados dentro dos respectivos cards. Build de produção não repetido para esta alteração de conteúdo; compilação de desenvolvimento verificada.

## 15. Formação, certificado de inglês e badges — 14/10/2026

- Formação complementar na Rocketseat confirmada pelo usuário: backend com Node.js, frontend com Next.js, fundamentos de backend Java, Go e AWS. São descrições das áreas estudadas; não se inventam títulos oficiais de certificados, datas, carga horária ou experiência profissional nessas tecnologias.
- O PDF enviado pelo usuário e a página pública [EF SET](https://cert.efset.org/XGQjqF), acessível no navegador, confirmaram 66/100, C1 Advanced e emissão em 13/08/2024. A avaliação cobre leitura e compreensão oral. O site exibe mês/ano e link para consulta; a autoavaliação atual B1 continua separada do resultado certificado. O certificado não é usado para afirmar fluência falada avançada.
- Português e inglês aparecem em itens verticais distintos. As tecnologias dos três grupos de competências usam badges visuais, mantendo a semântica de lista e sem sugerir controles interativos.
- Fatos de formação e certificado ficam em `education.data.ts`; traduções nas mensagens EN/PT; o montador entrega contratos tipados à seção. Componentes renderizam e os estilos locais definem badges e disposição dos elementos. O PDF original não foi alterado ou incorporado aos arquivos públicos do site.

Validações: formatação, lint sem avisos, tipos, estrutura (152 arquivos), 14 testes e build de produção passaram. O teste de conteúdo também verifica a cobertura das formações nos dois idiomas e a separação entre autoavaliação B1 e certificado. O build foi executado em uma cópia temporária com as mesmas dependências instaladas, sem usar o diretório de saída do servidor de desenvolvimento.

Navegador: seção conferida em EN/PT, badges, cinco formações, certificado com URL correta, foco visível do link e idiomas em coluna. Telas de 400 px e largura padrão foram verificadas, sem overflow horizontal. Capturas locais em `docs/worklog/previews/skills-badges.png`, `education-languages.png` e `education-mobile-en.png`. `git diff --check` e busca heurística de segredos passaram. Persistem apenas os avisos anteriores do Node sobre detecção de módulos nos testes; sem falhas. Datas e nomes oficiais das formações Rocketseat permanecem opcionais e não foram presumidos. Sem commit ou publicação.

## 16. Título e anos das formações Rocketseat — 14/10/2026

O usuário confirmou a conclusão em 2024 para Node.js, Next.js, Java e Go, e em 2025 para AWS. Esses anos foram registrados por formação em `education.data.ts`, sem presumir mês ou dia. O título passou a ser “Formação complementar — Rocketseat”, com lista das cinco formações abaixo e conclusão individual em texto secundário; a apresentação equivalente em inglês foi mantida. Os nomes oficiais de eventuais certificados permanecem sem confirmação e não foram inventados.

Passaram: formatação, lint, tipos, estrutura (152 arquivos), 14 testes, build de produção em cópia temporária, `git diff --check` e busca heurística de segredos. O teste de conteúdo foi ajustado ao contrato de formação com ano individual e verifica a precisão apenas de ano. Navegador: título combinado e cinco conclusões conferidos em EN/PT, inclusive em 400 px, sem overflow horizontal. Captura em `docs/worklog/previews/rocketseat-completion-years.png`. Sem commit ou publicação.

## 17. Retrato pessoal de astronauta — 14/10/2026

A pedido do usuário, a imagem da seção Sobre foi substituída pelo retrato fornecido em estilo anime, com roupa de astronauta à beira-mar. O arquivo do projeto se chama `public/lucas-lima-astronaut-anime.png`; referência e dimensões intrínsecas (1122 × 1402) foram atualizadas nos dados do perfil. Textos alternativos equivalentes em EN/PT descrevem a nova imagem. O enquadramento circular existente foi preservado.

Validações: formatação, lint, tipos e `git diff --check` passaram. Arquivo copiado conferido por SHA-256 com a origem; revisão dos metadados de conteúdo sem segredos. A imagem otimizada pelo Next carregou no navegador e o enquadramento foi conferido, com captura em `docs/worklog/previews/astronaut-profile.png`. Testes de lógica e build de produção não foram repetidos nesta troca de recurso estático e texto alternativo. Sem commit ou publicação.

## 18. Competências adicionais de design — 14/10/2026

Incluídos Adobe Photoshop, Adobe Illustrator e Ilustração digital nos badges de Produto e design, conforme confirmação do usuário. Os nomes dos programas ficam nos dados compartilhados; Ilustração digital/Digital illustration vem das mensagens traduzidas e é incorporada pelo montador de conteúdo. Componentes e estilos existentes foram reutilizados.

Formatação, lint, tipos, três testes de conteúdo e `git diff --check` passaram; busca heurística de segredos sem achados. O servidor respondeu HTTP 200 em EN/PT e os três novos rótulos foram conferidos dentro do grupo correto. Build de produção não repetido para esta ampliação pontual do conteúdo; a compilação de desenvolvimento foi verificada nos dois idiomas. Sem commit ou publicação.

## 19. Rótulo da mensagem de contato — 14/10/2026

Rótulo atualizado para “Mensagem intergaláctica” em português e “Intergalactic Message” em inglês, conforme pedido do usuário. Formatação dos dois JSON e `git diff --check` passaram; as duas alterações de texto foram revisadas sem segredos. O servidor respondeu HTTP 200 em EN/PT, com o novo rótulo associado ao campo `message`. Nenhum formulário foi enviado; testes de lógica e build não foram repetidos para esta troca de texto.
