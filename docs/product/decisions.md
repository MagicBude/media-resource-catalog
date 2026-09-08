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


## D-013 Media UI 以影视内容优先

Media Catalog 的公开界面必须优先展示：

```text
Poster / Backdrop
Title / Original Title
Year / Type / Runtime / Genres
Overview
Release
```

数据库验收信息（Title Count、External ID Count、内部 Identity Card）不得占据 Detail 的主要视觉层级。

V0.3 开始后，Release List 固定为 Media Header 下方第一主体内容区。

UI 可以参考成熟影视产品共同的信息架构，但禁止一比一复制某一个站点。

状态：V0.2.3 确定。
