# Architecture Overview

## 当前结构

```text
apps/
├─ web
└─ api

packages/
├─ core
├─ database
└─ providers
```

V0.2.1 已经真实创建 `packages/providers`，因为 TMDB Metadata Provider 开始承担实际职责。

## 后续目标结构

```text
apps/
├─ web
├─ api
└─ worker                 # 后续

packages/
├─ core
├─ database
├─ providers
├─ release-parser         # 后续
├─ matcher                # 后续
├─ pipeline               # 后续
├─ search                 # 后续
├─ auth                   # 后续
├─ ui                     # 后续
└─ config                 # 后续
```

不存在真实职责的包不提前创建空壳。

## 核心领域流

```text
Media
  ↓
Release
  ↓
Share
  ↓
Provenance
```

## Metadata Flow

```text
TMDB Metadata Provider
  ↓
MediaCatalogSnapshot
  ↓
Application Service
  ↓
MediaRepository
  ↓
PostgreSQL
```

V0.2.1 已完成 Provider 与 Repository 两端，Application Service 留到 V0.2.2。

## Resource Discovery Flow（未来）

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
Normalizer
  ↓
Deduplicator
  ↓
Review / Policy
  ↓
Repository
```

## 设计目标

- Core 不依赖基础设施。
- Metadata Provider 与 Resource Provider 分离。
- Provider 不直接写数据库。
- Raw Data 可追溯。
- API 与 Web 解耦。
- 后台任务可独立扩展。
