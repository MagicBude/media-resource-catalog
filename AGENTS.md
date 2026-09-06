# AGENTS.md

所有 AI / Codex / 自动化代理进入仓库后必须先阅读本文件。

## 1. 项目不变量

Media Resource Catalog 是结构化影视资源资料库，不是普通盘搜站。

```text
Media → Release → Share → Provenance
```

未经用户明确批准不得推翻这四层。

## 2. 必须先阅读

1. `PROJECT_STATUS.md`
2. `MANIFEST.md`
3. `docs/README.md`
4. `docs/handoff/current-state.md`
5. `docs/handoff/next-session.md`
6. 当前任务对应分类文档

## 3. Provider 分类

### Metadata Provider

例：

```text
TMDB
```

负责 Media Metadata，返回 `MediaCatalogSnapshot`。

不得直接写数据库。

### Resource Provider

例：

```text
PanSou
```

负责资源发现，返回 `ResourceCandidate[]`。

不得直接写 Release / Share。

## 4. 架构边界

### packages/core

只允许：

- Domain Types
- Value Objects
- Enums
- Contracts
- 纯业务逻辑

禁止依赖 Next.js / Fastify / Drizzle / PostgreSQL / 第三方 API。

### packages/database

负责：

- Schema
- Migration
- Repository
- Transaction
- Query

禁止负责 TMDB / PanSou 网络请求与 Release 解析。

### packages/providers

负责外部 Provider Adapter。

禁止拥有数据库写权限。

### apps/api

只做 HTTP Boundary、输入验证、调用 Service 与 Response Mapping。

复杂业务编排不得堆进 Route。

### apps/web

不得直连 PostgreSQL。

## 5. 匹配规则

低置信度禁止自动猜测。

优先级：

1. External ID
2. TMDB ID
3. Title + Year
4. Alternative Title + Year
5. 辅助字段

## 6. 数据原则

- Release 与 Share 分离。
- 一个 Release 可有多个 Share。
- 自动发现先进入 Candidate。
- Raw Source 要可追踪。
- 规范值与原始值分离。
- 重要状态修改最终必须可审计。

## 7. 当前阶段

当前：V0.2 Media Catalog。

暂时不要实现：

- Release / Share
- PanSou Pipeline
- 在线播放
- 自动转存
- 自动下载
- STRM
- Emby / Jellyfin
- AI Agent
- Premium
- 论坛 / 私信

除非 `PROJECT_STATUS.md` 已明确推进到对应阶段。

## 8. 文档同步

修改架构、Schema、API、Provider、状态、开发命令或路线图时同步：

- `PROJECT_STATUS.md`
- `MANIFEST.md`
- `CHANGELOG.md`
- 对应 `docs/*`
- `docs/handoff/*`

根目录永远只维护一个总 `MANIFEST.md`。

## 9. 验证

完成变更后：

```bash
pnpm run check
```

涉及 Schema：

```bash
pnpm db:generate
pnpm db:migrate
pnpm run check
```

## 10. Git

使用 Conventional Commits。

提交正文说明：

- 为什么改
- 改了什么
- Schema / API 是否变化
- 如何验证
- Migration / 兼容性注意事项
