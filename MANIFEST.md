# MANIFEST

本文件是仓库当前结构的**唯一总清单**。

后续版本直接更新本文件，不新增版本化 MANIFEST。

## 根目录

- `README.md`
- `AGENTS.md`
- `PROJECT_STATUS.md`
- `MANIFEST.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `.env.example`
- `docker-compose.yml`
- `eslint.config.mjs`
- `tsconfig.base.json`
- `pnpm-workspace.yaml`
- `package.json`

## apps

### `apps/web`

Next.js 前台。

### `apps/api`

Fastify REST API，当前提供 `/health`。

## packages

### `packages/core`

纯领域层。

当前包含：

- Media Type
- Media Title Kind
- External ID Provider
- Media Catalog Snapshot 类型

### `packages/database`

PostgreSQL / Drizzle。

当前正式表：

- `media`
- `media_titles`
- `media_external_ids`
- `genres`
- `media_genres`
- `seasons`
- `episodes`

当前 Repository：

- `MediaRepository`

### `packages/providers`

外部 Provider 适配层。

当前包含：

- Metadata Provider Contract
- Resource Provider Contract
- TMDB Client
- TMDB Metadata Provider
- TMDB Snapshot Mapper
- TMDB Fixtures / Tests

## docs

详细索引见 `docs/README.md`。

## scripts

- `scripts/validate-repository.mjs`

## 尚未创建的未来包

只在真实职责出现时创建：

- `apps/worker`
- `packages/release-parser`
- `packages/matcher`
- `packages/pipeline`
- `packages/search`
- `packages/auth`
- `packages/ui`
- `packages/config`
