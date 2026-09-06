# Module Boundaries

## packages/core

纯领域类型、枚举和值对象。

不得依赖数据库、HTTP、TMDB、Next.js、Fastify。

## packages/database

PostgreSQL / Drizzle 基础设施：

- Schema
- Migration
- Repository
- Transaction
- Query

`MediaRepository.saveSnapshot()` 是数据库层的原子持久化边界。

## packages/providers

外部 Provider Adapter。

### Metadata Provider

TMDB → `MediaCatalogSnapshot`

### Resource Provider

未来 PanSou → `ResourceCandidate[]`

Provider 不直接写数据库。

## packages/catalog

V0.2.2 新增的 Application Layer。

负责：

- Media Catalog Use Case
- Import Orchestration
- Read/Search Application Contract

它不包含：

- SQL
- Fastify Route
- Next.js UI

## apps/api

HTTP Boundary 与 Concrete Wiring。

负责把：

```text
Catalog Service
Database Repository
TMDB Provider
```

组装起来。

## apps/web

Presentation Layer，只通过 API 读取 Catalog。

不得直连 PostgreSQL。
