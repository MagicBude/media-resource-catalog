# Module Boundaries

## packages/core

拥有：

- 领域类型
- 枚举
- 值对象
- Contract
- 纯规则

不拥有：

- SQL
- HTTP
- UI
- 外部 Provider 实现

## packages/database

拥有：

- Drizzle Schema
- Migration
- Repository
- Transaction

不拥有：

- TMDB 请求
- PanSou 请求
- Release Parser
- Media Matching

## packages/providers（后续）

拥有：

- Provider Contract
- Provider Registry
- 各外部 Provider Adapter

输出：

```text
ResourceCandidate[]
```

## packages/release-parser（后续）

只解析 Release Name。

不判断“这是 TMDB 哪个作品”。

## packages/matcher（后续）

负责：

```text
Candidate → Media Match + Confidence
```

## packages/pipeline（后续）

负责编排，而不是重新实现 Parser / Matcher。

## apps/api

HTTP Boundary。

## apps/web

Presentation Boundary。

## apps/worker（后续）

后台任务：

- Metadata Refresh
- Provider Discovery
- Share Verification
- Candidate Processing
- Cleanup
- Statistics
