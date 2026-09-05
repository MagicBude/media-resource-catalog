# MANIFEST

本文件是仓库当前结构的**唯一总清单**。

后续版本直接更新本文件，不新增 `V0_XX_MANIFEST.md`。

## 根目录

- `README.md`：项目入口
- `AGENTS.md`：AI / Codex 强制规则
- `PROJECT_STATUS.md`：当前阶段、完成情况、下一步
- `MANIFEST.md`：当前仓库总清单
- `CHANGELOG.md`：历史变化
- `CONTRIBUTING.md`：协作规范
- `.env.example`：环境变量模板
- `docker-compose.yml`：本地 PostgreSQL
- `eslint.config.mjs`
- `tsconfig.base.json`
- `pnpm-workspace.yaml`
- `package.json`

## apps

### `apps/web`

Next.js 前台骨架。

### `apps/api`

Fastify REST API 骨架，当前提供 `/health`。

## packages

### `packages/core`

纯领域层。

### `packages/database`

PostgreSQL / Drizzle 基础设施层。

## docs

详细索引见 `docs/README.md`。

分类：

- `product`
- `architecture`
- `data-model`
- `providers`
- `search`
- `ui`
- `community`
- `api`
- `security`
- `development`
- `roadmap`
- `handoff`

## scripts

- `scripts/validate-repository.mjs`

用于检查关键交接文档、核心目录与架构标记是否意外缺失。

## 当前未创建的未来包

以下目录只在真实职责开始实现时创建，不提前堆空壳：

- `apps/worker`
- `packages/providers`
- `packages/release-parser`
- `packages/matcher`
- `packages/pipeline`
- `packages/search`
- `packages/auth`
- `packages/ui`
- `packages/config`
