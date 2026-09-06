# Current State

## Repository

```text
https://github.com/MagicBude/media-resource-catalog.git
```

## 当前阶段

V0.2.2 Media Import & Read/Search。

## 已形成可运行闭环

```text
TMDB
 ↓
Import CLI
 ↓
Catalog Application Service
 ↓
PostgreSQL
 ↓
Fastify Read/Search API
 ↓
Next.js Search / Detail
```

## 核心架构仍然是

```text
Media → Release → Share → Provenance
```

当前只建设 Media。

## 当前包

- core
- database
- providers
- catalog

## 当前 API

- Search
- Movie Detail
- TV Detail

## 重要边界

- TMDB Provider 不写数据库。
- Catalog Service 编排 Use Case。
- Repository 管 SQL 与 Transaction。
- API 不直接操作多个数据库表。
- Web 不直连数据库。
