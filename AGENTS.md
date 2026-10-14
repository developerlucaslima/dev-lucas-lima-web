# AGENTS.md

## Finalidade

Este repositório mantém o site pessoal de Lucas Lima. O conteúdo e o código versionados aqui são a fonte de verdade. Use como referência o plano em `docs/PLANO-ARQUITETURA-E-QUALIDADE.md`; decisões aprovadas e instruções deste arquivo governam a execução do trabalho futuro.

## Fluxo de branches e PRs

- O trabalho de cada tarefa parte da branch compartilhada `developer`, atualizada a partir de `origin/developer`.
- Abra a PR da tarefa com destino a `developer`. Não envie PRs de tarefa diretamente para `main`.
- Nomeie branches de tarefa `codex/<ID>-<descricao-curta>` e mantenha escopo e evidência de cada tarefa em uma PR revisável.
- É permitido commitar diretamente em `developer` somente para documentação de governança que o usuário autorize expressamente. O desenvolvimento funcional continua via branch da tarefa e PR.
- Quando o conjunto acordado de trabalho estiver pronto e integrado em `developer`, promova-o para `main` por uma PR separada `developer` → `main`. Descreva a promoção como integração do conjunto pronto, sem reapresentar cada mudança como tarefa independente.
- Nunca presuma que uma tarefa isolada está pronta para promoção. Aguarde a orientação do usuário sobre o conjunto a liberar.
- Não faça merge, force push, publicação ou deploy sem autorização explícita correspondente.
- A branch remota legada `dev` existe. Não a trate como sinônimo de `developer`: compare históricos e confirme com o usuário antes de redirecionar, renomear ou excluir `dev`.
- A PR A01 foi aberta diretamente para `main` antes desta decisão e já foi integrada. Esta é uma exceção histórica; futuras PRs seguem o fluxo acima.

## Títulos e corpo das PRs

- Use o template `.github/pull_request_template.md`.
- Título: `[<ID>] tipo(escopo): resumo curto`, em português do Brasil. Preserve IDs reais; não invente ticket.
- PR de tarefa aponta para `developer`; promoção aponta de `developer` para `main`.
- Marque apenas validações executadas. Registre separadamente limitações e checks que não se aplicam.
- Este repositório não tem uma esteira de CI acordada; não prometa nem presuma gates automáticos.

## Escopo e cuidado

- Leia o plano arquitetural local antes de mudar organização ou arquitetura; abra somente as seções e arquivos relevantes para a tarefa.
- Documentação humana em português do Brasil, direta e sem dados pessoais desnecessários.
- Preserve histórico, comportamento público e conteúdo aprovado. Não implemente tarefas futuras só por estarem descritas no plano.
- Não introduza banco, autenticação, serviços ou dependências sem consumidor da tarefa atual.
- Não leia, escreva ou registre trabalho no Kaizen. O Kaizen é referência de arquitetura somente quando o usuário pedir comparação; sua árvore não pertence a este repositório.
- Valide proporcionalmente. Sempre execute `git diff --check` e busque segredos nos arquivos alterados. Documente quais comandos realmente passaram; código também exige lint, tipos, testes e build conforme configurados e aplicáveis.
- Mantenha o diário operacional em `docs/worklog/`; o conteúdo é local e está ignorado pelo Git.
