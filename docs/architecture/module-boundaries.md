# Module Boundaries

## packages/core

拥有：

- Domain Types
- Enum
- Value Object
- Contract 所需的纯领域类型
- 纯规则

不拥有：

- SQL
- HTTP
- UI
- TMDB / PanSou 实现

## packages/database

拥有：

- Drizzle Schema
- Migration
- Repository
- Transaction
- Query

不拥有：

- TMDB 请求
- PanSou 请求
- Release Parser
- Media 猜测匹配

## packages/providers

V0.2.1 已正式存在。

拥有两类外部适配：

### Metadata Provider

当前：

```text
TMDB
```

输出：

```text
MediaCatalogSnapshot
```

### Resource Provider

未来：

```text
PanSou
```

输出：

```text
ResourceCandidate[]
```

`packages/providers` 不拥有数据库写入权。

## packages/release-parser（后续）

只解析 Release Name。

不判断“这是 TMDB 哪个作品”。

## packages/matcher（后续）

负责：

```text
Candidate → Media Match + Confidence
```

## packages/pipeline（后续）

负责编排 Resource Discovery，不重新实现 Parser / Matcher。

## apps/api

HTTP Boundary。

下一阶段通过 Service 调用 Provider / Repository，而不是 Route 直接堆业务编排。

## apps/web

Presentation Boundary。

不得直连 PostgreSQL。

## apps/worker（后续）

后台任务：

- Metadata Refresh
- Resource Discovery
- Share Verification
- Candidate Processing
- Cleanup
- Statistics
