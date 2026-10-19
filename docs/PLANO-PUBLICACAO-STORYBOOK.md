# Plano de publicação do Storybook

## Objetivo e limite desta etapa

Disponibilizar o catálogo do Fradelli Design System pelo GitHub Pages e preparar sua divulgação posterior no portfólio. A publicação foi implementada em 19/10/2026; o registro abaixo complementa o planejamento original.

O projeto já usa React/Vite e gera `storybook-static/` com `npm run storybook:build`. O CI executa esse build dentro de `npm run ci`. O código-fonte do Design System é público; o pacote distribuído continua com seu processo próprio de acesso e release.

## 1. Hospedagem e endereço

- Usar GitHub Pages do repositório `fradelli/design-system`, com publicação por GitHub Actions.
- Endereço padrão esperado: `https://fradelli.github.io/design-system/`. Confirmar o endereço efetivo retornado pelo deployment antes de divulgar.
- Começar com o domínio fornecido pelo GitHub, sem compra ou configuração de domínio próprio.
- O catálogo público pode ser consultado sem instalação do pacote ou servidor local.

A consulta autenticada ao endpoint de Pages retornou HTTP 404 nesta revisão. Isso não comprova isoladamente se o recurso está desabilitado ou inacessível ao token: confirmar Settings → Pages e permissões na implementação. Falta de configuração será tratada como pré-requisito, sem presumir que uma publicação já existe.

## 2. Fluxo recomendado

1. Criar uma branch de publicação a partir de `origin/main` atualizado no Design System.
2. Preparar o build para servir pelo caminho de projeto `/design-system/` e conferir o resultado localmente nesse caminho.
3. Aproveitar a validação existente: depois de `npm run ci` passar, enviar `storybook-static/` como artefato de Pages.
4. Publicar o artefato somente em execução de `main`, com job dependente da validação. PRs executam os checks, sem publicar a versão pública.
5. Permitir execução manual para recuperar ou repetir uma publicação de `main`.
6. Abrir PR revisável; após aprovação e autorização de merge/publicação, integrar e acompanhar o primeiro deployment.
7. Verificar o endereço público e registrar URL, commit e resultado real antes de adicionar o link ao portfólio.

A recomendação é estender o workflow de CI com upload condicionado e um job de deploy dependente. Isso reaproveita o build já validado e evita criar uma segunda implementação dos gates. O nome do check `Validate package` deve ser preservado.

## 3. Arquivos e configuração envolvidos

Caminhos relativos ao repositório `design-system`:

| Arquivo / configuração                    | Trabalho previsto                                                                                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `.github/workflows/ci.yml`                | Reaproveitar o artefato após o gate; configurar upload e job de deploy para `main`; adicionar execução manual, tratamento de concorrência e URL do ambiente.             |
| `.storybook/main.ts`                      | Ajustar configuração de produção somente se a inspeção do build exigir correção dos caminhos de assets/iframe. Preservar desenvolvimento local e configuração de testes. |
| `README.md`                               | Adicionar URL pública, explicar atualização por `main` e distinguir catálogo de versão publicada do pacote.                                                              |
| `docs/governance/storybook-publishing.md` | Registrar operação, permissões, republicação, verificação e recuperação da versão anterior.                                                                              |
| Settings → Pages                          | Confirmar habilitação e escolher GitHub Actions como origem.                                                                                                             |
| Environment `github-pages`                | Permitir deploy de `main` e registrar a URL retornada pela ação.                                                                                                         |

Não versionar `storybook-static/`. O workflow publica esse diretório como artefato gerado.

Usar ações oficiais `configure-pages`, `upload-pages-artifact` e `deploy-pages`, verificando suas versões vigentes e fixando referências por SHA conforme o padrão do repositório. Restringir `pages: write` e `id-token: write` ao job que precisa publicar; PRs permanecem sem essas permissões. Usar o token nativo do workflow, sem criar PAT para hospedar o catálogo.

Não alterar o workflow Release para publicar o Storybook. Releases do pacote e hospedagem do catálogo continuam operações independentes.

## 4. Validação antes e depois da publicação

- Executar os gates configurados e revisar o workflow, o diff e padrões de segredos nos arquivos alterados.
- Servir o build estático no caminho de projeto; verificar arquivos CSS, JavaScript, ícones, fontes disponíveis e iframe sem erros de caminho.
- Conferir Foundations, Card, PendingButton, Alert, Sheet, Popover e Patterns/Form, incluindo navegação, Controls e estados interativos.
- Abrir uma URL direta de story e recarregar a página, preservando `/design-system/` antes da query `?path=...`.
- Conferir responsividade e teclado no build de produção, além dos testes de desenvolvimento já existentes.
- Depois do deploy, repetir os cenários essenciais na URL HTTPS pública e verificar falhas de carregamento e erros no navegador.
- Confirmar que exemplos continuam isolados e que ações demonstrativas não acionam email, autenticação ou serviços reais.
- Registrar o SHA efetivamente publicado e o link da execução. Se o build/deploy falhar, não divulgar o catálogo como publicado.

O build possui avisos já conhecidos de tamanho de chunks. Avaliar o carregamento real do catálogo; não ocultar avisos ou iniciar uma otimização geral sem evidência de necessidade.

## 5. Atualização e recuperação

O catálogo acompanha a branch `main`. Portanto, pode apresentar mudanças ainda não distribuídas em uma versão do pacote. Essa informação deve constar no README e na documentação de operação.

Tratar concorrência para que uma execução antiga não substitua uma publicação mais recente aprovada. Preservar o último deployment funcional quando uma nova validação falhar.

Para recuperar uma versão anterior, usar o procedimento suportado de republicação de artefato/commit validado, conforme a configuração final, ou uma PR de reversão. Não usar force push. Registrar qual commit passou a ser servido.

## 6. Próximas entregas no portfólio

Depois de validar a URL pública:

1. Planejar e implementar a adoção do candidato do pacote no portfólio, revisando padding, wrappers de vidro, fontes, foco e overrides existentes. Preservar estrelas, animações, conteúdo e idiomas do site.
2. Apresentar o Design System como projeto com resumo factual e links para catálogo e repositório. Manter equivalência editorial entre português e inglês; não inventar métricas, adesão ou escala.
3. Descrever o que já está implementado e validado. Não declarar adoção concluída em Kaizen/Sandicts antes das respectivas migrações.
4. Após validar o candidato nas telas e liberar a versão pelo fluxo do pacote, fixar a versão publicada no portfólio e atualizar seu lockfile pela instalação normal.
5. Validar o site e seguir seu fluxo de PR para `developer`, com promoção posterior para `main` quando autorizada.

Kaizen e Sandicts terão suas próprias entregas de migração. A publicação do Storybook não atualiza automaticamente nenhum aplicativo.

## 7. Critérios de aceite

- [x] URL pública HTTPS acessível, com catálogo e stories carregando corretamente.
- [x] Publicação de `main` condicionada à validação e sem deploy de PRs.
- [x] Links diretos, assets e iframe funcionam no caminho de projeto.
- [x] Fluxo usa ações oficiais, permissões restritas e nenhum novo segredo pessoal.
- [x] README e guia de operação descrevem URL, origem, atualização e recuperação.
- [x] Commit e execução publicados registrados; publicação do pacote continua separada.
- [x] Divulgação e migração do portfólio permanecem uma entrega posterior ao catálogo funcional.

## 8. Resultado e evidências da implementação

- Catálogo publicado: [Fradelli Design System](https://fradelli.github.io/design-system/).
- [PR #15](https://github.com/fradelli/design-system/pull/15) integrada em `main`, commit `aa1ca729c3b0bccacf46fb2d6d2b4ae04672cdd6`.
- [Execução de validação e publicação](https://github.com/fradelli/design-system/actions/runs/39253284082): `Validate package` e `Publish Storybook` concluídos com sucesso. Na PR, upload e deploy foram corretamente ignorados.
- `npm run ci` passou localmente: formatação, lint, tipos, 43 testes unitários, build do Storybook, 49 stories no Chromium e validações de distribuição e consumidores de teste. Auditoria da árvore raiz sem vulnerabilidades; os fixtures de Tailwind mantêm quatro avisos altos preexistentes, fora desta entrega.
- Preview estático validado sob `/design-system/`, incluindo viewport de 320 px. No endereço público, conferidos Foundations, Card, PendingButton, Sheet, interação de estados, abertura/fechamento de painel e recarregamento direto de story. Nenhum erro de console registrado nessa conferência.
- Pages usa GitHub Actions, com ambiente `github-pages` limitado à branch `main`. Permissões de escrita ficam no job de publicação; nenhum PAT ou segredo adicional foi criado.
- Não foi necessário alterar `.storybook/main.ts`: os caminhos relativos do build funcionam no prefixo do projeto. O workflow Release do pacote permanece independente.
- README e guia operacional foram entregues no Design System. Divulgação, adoção no portfólio e migrações de Kaizen/Sandicts continuam posteriores.

## Referências

- [Publicação do Storybook](https://storybook.js.org/docs/sharing/publish-storybook/)
- [Workflows personalizados para GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Publicação estática com Vite](https://vite.dev/guide/static-deploy.html)
