# Testing Strategy

## Core

Unit Test。

## Database

当前 V0.2.1：

- Schema / Enum Contract Test
- Repository 通过 TypeScript 编译约束

V0.2.2 增加真实 PostgreSQL Repository Integration Test。

测试数据库必须独立于生产库。

## Metadata Provider

TMDB 测试使用：

```text
packages/providers/fixtures/tmdb/
```

覆盖：

- Bearer Authorization
- Movie Snapshot
- TV Snapshot
- Alternative Titles
- External IDs
- Canonical Genres
- HTTP Error

单元测试不需要真实 TMDB Token，也不实时联网。

## Release Parser（未来）

建立独立 Release Name Fixtures。

## Resource Provider（未来）

使用 Contract Test + Raw Response Fixtures。

## CI 最低要求

```text
repo:validate
lint
typecheck
test
build
```
