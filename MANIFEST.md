# MANIFEST

本文件是仓库当前结构的唯一总清单。

## apps

### `apps/web`

Next.js：

- `/`
- `/search`
- `/movie/[tmdbId]`
- `/tv/[tmdbId]`

### `apps/api`

Fastify：

- `/health`
- `/api/v1/media/search`
- `/api/v1/media/:type/:tmdbId`

CLI：

- `src/cli/import-media.ts`

## packages

### `packages/core`

纯领域类型。

### `packages/database`

PostgreSQL / Drizzle：

- 7 张 Media Catalog 表
- Migration
- MediaRepository
- Repository Integration Test

### `packages/providers`

- Metadata Provider Contract
- Resource Provider Contract
- TMDB Client / Provider / Fixtures

### `packages/catalog`

应用层：

- MediaCatalogService
- MediaImportService
- MediaCatalogStore Contract
- Media Read / Search DTO

## docs

入口：`docs/README.md`

## scripts

- `scripts/validate-repository.mjs`

## 后续按职责再创建

- `apps/worker`
- `packages/release-parser`
- `packages/matcher`
- `packages/pipeline`
- `packages/search`
- `packages/auth`
- `packages/ui`
- `packages/config`
