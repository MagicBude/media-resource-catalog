# Architecture Overview

## 当前结构

```text
apps/
├─ web
└─ api

packages/
├─ core
├─ database
├─ providers
└─ catalog
```

## 核心领域

```text
Media → Release → Share → Provenance
```

## 当前 Media Import Flow

```text
TMDB Metadata Provider
  ↓
MediaCatalogSnapshot
  ↓
MediaImportService
  ↓
MediaCatalogService
  ↓
MediaCatalogStore
  ↓
MediaRepository
  ↓ PostgreSQL Transaction
PostgreSQL
```

Provider 不直接操作数据库。

API Route 也不直接编排多个 Repository 写操作。

## 当前 Read/Search Flow

```text
Web
 ↓
Fastify API
 ↓
MediaCatalogService
 ↓
MediaRepository
 ↓
PostgreSQL
```

## 未来 Resource Discovery

```text
Media
 ↓
Resource Provider
 ↓
ResourceCandidate[]
 ↓
Parser
 ↓
Matcher
 ↓
Deduplicator
 ↓
Pipeline
 ↓
Release / Share / Provenance
```

当前阶段仍不实现这条链。
