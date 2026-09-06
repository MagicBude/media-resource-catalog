# Product Decisions

## D-001 核心模型

```text
Media → Release → Share → Provenance
```

状态：已确定。

## D-002 Release 与 Share 分离

状态：已确定。

## D-003 TMDB 为主要 Media 身份源

稳定 URL 方向：

```text
/movie/{tmdbId}
/tv/{tmdbId}
```

状态：已确定。

## D-004 PostgreSQL

PostgreSQL + Drizzle。

状态：已确定。

## D-005 搜索分层

Catalog Search 与 Resource Discovery 分离。

状态：已确定。

## D-006 Resource Provider 不直接写库

Resource Provider 只返回 Candidate。

状态：已确定。

## D-007 低置信度不猜测

状态：已确定。

## D-008 文档交接优先

状态：已确定。

## D-009 暂不做播放 / 自动转存

状态：已确定。

## D-010 积分使用 Ledger

状态：已确定。

## D-011 Provider 分成 Metadata 与 Resource 两类

Metadata Provider：

```text
TMDB
```

Resource Provider：

```text
PanSou
```

二者职责与输出模型不同，不用一个大而全接口强行统一。

状态：V0.2.1 确定。

## D-012 Metadata Provider 不直接写数据库

TMDB 输出 `MediaCatalogSnapshot`。

由 Application Service / Repository 负责持久化。

状态：V0.2.1 确定。
