# MANIFEST

本文件是仓库当前结构的唯一总清单。

## apps

### `apps/web`

Next.js：

- `/` — 首页 / 最近入库
- `/browse` — 本地 Catalog 浏览
- `/search` — 本地搜索
- `/movie/[tmdbId]` — Movie Detail
- `/tv/[tmdbId]` — TV Detail + Seasons

主要 UI：

- `app/_components/site-header.tsx`
- `app/_components/media-card.tsx`
- `app/_components/media-detail.tsx`
- `app/_lib/catalog.ts`
- `app/globals.css`

### `apps/api`

Fastify：

- `/health`
- `GET /api/v1/media`
- `GET /api/v1/media/search`
- `GET /api/v1/media/:type/:tmdbId`

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
- `listRecent`
- Search / Read / Snapshot Transaction

### `packages/providers`

- Metadata Provider Contract
- Resource Provider Contract
- TMDB Client / Provider / Fixtures

### `packages/catalog`

应用层：

- MediaCatalogService
- MediaImportService
- MediaCatalogStore Contract
- Media Browse / Read / Search DTO

## docs

入口：`docs/README.md`

UI：

- `docs/ui/information-architecture.md`
- `docs/ui/page-specs.md`
- `docs/ui/visual-system.md`

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
