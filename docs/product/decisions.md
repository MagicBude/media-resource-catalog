# Product Decisions

这里记录已经明确的产品级决策，避免后续 AI 反复推翻。

## D-001 核心模型

采用：

```text
Media → Release → Share → Provenance
```

状态：已确定。

## D-002 Release 与 Share 分离

同一 Release 在不同网盘、不同分享者下的多个位置属于多个 Share，不得重复创建 Release。

状态：已确定。

## D-003 TMDB 为主要 Media 身份源

URL 计划优先使用：

```text
/movie/{tmdbId}
/tv/{tmdbId}
```

而不是内部 UUID。

状态：已确定。

## D-004 PostgreSQL

生产数据库使用 PostgreSQL + Drizzle。

原因：

- 多用户
- 投稿
- 并发
- 搜索
- 审计
- 后台任务

不同于本地优先项目，不采用 SQLite 作为正式生产方案。

## D-005 搜索分层

Catalog Search 与 Resource Discovery 是两套系统。

- Catalog Search 搜正式 Media DB。
- Resource Discovery 在具体 Media 上调用 Provider。

## D-006 Provider 不直接写库

Provider 只返回 Candidate。

## D-007 低置信度不猜测

匹配不明确必须进入人工审核。

## D-008 文档交接优先

项目需要让其他 AI / Codex 可以只凭仓库文档继续开发。

因此文档不是附属品，而是工程的一部分。

## D-009 暂不做播放/自动转存

先把 Catalog 做正确，再考虑消费层工具。

## D-010 积分使用 Ledger

未来积分不能只靠 `users.points`，需要 `point_ledger` 可审计记录。
