# A01 — Atualização de segurança de Next e React

- Data: 12/10/2026.
- Status: A01 concluída localmente. Publicação e validação remota não executadas.
- Branch: codex/A01-security-update; base main/95569f7.
- Escopo: corrigir dependências de Next/React e transitivas necessárias. Sem reorganização, migração para pnpm/Next 16, mudanças editoriais, email real ou deploy.
- Entradas: package.json, package-lock.json, next.config.ts, tsconfig.json, .eslintrc.json, prettier.config.js, .github/workflows/deployment.yml e o plano local.

## Mudanças

| Pacote         | Antes          | Depois        | Motivo                                                                      |
| -------------- | -------------- | ------------- | --------------------------------------------------------------------------- |
| next           | 15.2.3         | 15.5.27 exato | Versão corrigida na mesma major, indicada pelo audit da base                |
| @next/env      | 15.2.4 no lock | 15.5.27 exato | Alinhar dependência direta ao Next e evitar cópia divergente                |
| react          | 19.0.0 no lock | 19.0.8 exato  | Patch corrigido mantendo minor 19.0                                         |
| react-dom      | 19.0.0 no lock | 19.0.8 exato  | Mesma versão de React, peer compatível confirmado                           |
| next → postcss | 8.4.31         | 8.5.29        | Override restrita ao Next, mesma major 8; Next ainda fixa versão vulnerável |

package-lock.json regenerado pelo npm, sem edição manual. Não foi usado audit fix --force. A override é necessária enquanto a linha escolhida mantiver o pin antigo; reavaliá-la na migração do framework. Não é global: o PostCSS de ferramentas dev permanece fora da A01.

## Evidência de segurança

Audit da base: 21 pacotes sinalizados, incluindo Next crítico. Audit final: nenhum finding em next, @next/env, react ou react-dom; 17 pacotes residuais de ferramentas dev (16 high e 1 moderate). Audit final com omit=dev: zero findings de produção.

Contagens do npm audit são de pacotes sinalizados, não quantidade de CVEs independentes. Aplicabilidade individual exige avaliar o uso; a faixa vulnerável não prova exploração nem informa qual versão está publicada.

Advisories confirmados relevantes:

- [GHSA-9qr9-h5gf-34mp](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp): RCE em RSC; a base 15.2.3 está na faixa afetada.
- [GHSA-p293-qw3h-jr36](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36): RCE em servidores Windows; versões 13.4 até antes de 15.5.24 afetadas; escolhida 15.5.27.
- [GHSA-4jqv-mc3x-m676](https://github.com/vercel/next.js/security/advisories/GHSA-4jqv-mc3x-m676) e [GHSA-mcj8-r9mp-w47p](https://github.com/vercel/next.js/security/advisories/GHSA-mcj8-r9mp-w47p): faixa Next 15 antes de 15.5.27 reportada no audit inicial.
- [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp): PostCSS até 8.5.22 afetado; patch 8.5.23; escolhida 8.5.29 para dependência do Next.

Relatórios brutos de auditoria ficaram temporários fora do Git. Resumo sem segredos neste documento. Nenhum scan de produção remota/Checkmarx/CI foi executado.

## Validações

- Node 24.20.0 e npm 11.19.0 usados localmente; runtime Vercel não confirmado.
- npm install das versões exatas e override: passou.
- npm ci --ignore-scripts --no-audit --no-fund: passou; instalação reproduzível com scripts de ciclo de vida desabilitados.
- npm ls dos pacotes alvo: versões/peers coerentes, sem invalid.
- npm run lint: passou; avisos preexistentes de configuração sem plugin Next detectado e next lint depreciado, tratados em P1.
- npx --no-install tsc --noEmit --incremental false: passou.
- Prettier check em package.json e package-lock.json: passou.
- npm audit final: alvo limpo; 17 findings dev residuais.
- npm audit --omit=dev: zero findings.
- git diff --check: passou.
- npm run build: passou, incluindo compilação, lint/tipos e geração estática.
- Smoke de produção local: next start, GET / HTTP 200 e conteúdo principal presente; servidor encerrado; sem email.
- Revisão semântica: alteração limitada a versões/override, sem lógica ou componentes modificados; responsabilidade do pin transitivo documentada.

Não há suite de testes configurada no projeto atual. Esta atualização não altera regra de negócio/React e não adiciona teste espelho do manifesto. Regressão visual e fluxo real de envio continuam tarefas seguintes; nenhum email foi enviado.

## Pendências fora do escopo

P1 deve tratar ESLint/preset/peers, dependências dev sinalizadas, scripts e CI reproduzível. O histórico de diagnóstico do plano permanece válido para a base; este documento registra A01 na versão atual. Não afirmar que o repositório inteiro tem zero vulnerabilidades.

## Rollback

Reverter o incremento de manifesto/lock completo se surgir incompatibilidade e aplicar alternativa corrigida. Não restaurar 15.2.3 vulnerável como solução permanente. Publicação da PR autorizada posteriormente pelo usuário em 12/10/2026. Template local de PR adicionado com as seções do Kaizen e checks locais, sem mudança no workflow de CI/deploy. O diário operacional local é ignorado pelo Git; o plano e as evidências técnicas são versionados. Deploy e merge não autorizados nesta etapa.
