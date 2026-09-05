# AGENTS.md

本文件是所有 AI、Codex、自动化编码代理进入仓库后的第一份强制说明。

## 1. 项目不变量

Media Resource Catalog 是**结构化影视资源资料库**，不是普通盘搜站。

核心领域必须保持：

```text
Media → Release → Share → Provenance
```

除非用户明确批准架构迁移，否则不得推翻这四层。

## 2. 必须先阅读

开始修改前至少阅读：

1. `PROJECT_STATUS.md`
2. `MANIFEST.md`
3. `docs/README.md`
4. `docs/handoff/current-state.md`
5. `docs/handoff/next-session.md`
6. 与当前任务直接相关的分类文档

大型架构改动还必须阅读：

- `docs/architecture/`
- `docs/data-model/`
- `docs/product/decisions.md`

## 3. 架构边界

### packages/core

只允许：

- Domain Types
- Value Objects
- Enums
- Contracts
- 纯业务逻辑

禁止依赖：

- Next.js
- Fastify
- Drizzle
- PostgreSQL
- TMDB / PanSou SDK

### packages/database

负责：

- Schema
- Migration
- Repository
- Transaction
- Query

禁止：

- TMDB 网络请求
- PanSou 网络请求
- Release Name 解析
- Media 猜测匹配

### apps/api

负责 HTTP 边界、输入验证、应用调用与响应映射。

复杂领域逻辑不得堆进 Route Handler。

### apps/web

负责页面与交互。

不得直连 PostgreSQL。

## 4. Provider 规则

Provider 只能返回 `ResourceCandidate[]`。

禁止：

```text
Provider → INSERT releases
```

必须：

```text
Provider
  ↓
Candidate
  ↓
Parser
  ↓
Matcher
  ↓
Deduplicator
  ↓
Pipeline
  ↓
Repository
```

## 5. 匹配规则

低置信度匹配禁止自动猜测。

优先级：

1. External ID
2. TMDB ID
3. Title + Year
4. Alternative Title + Year
5. 其他辅助字段

不能因为“看起来像”就覆盖正式数据。

## 6. 数据原则

- Release 与 Share 严格分离。
- 一个 Release 可以有多个 Share。
- Share URL 不应是唯一长期身份；优先 Provider Share ID。
- Provider 原始数据必须保留 Provenance / Raw Record。
- 自动发现结果先进入 Candidate，不直接成为正式数据。
- 删除、合并、隐藏等重要操作最终都应可审计。
- 数据库保存规范值；原始输入另行保留。

## 7. 当前阶段限制

V0.1 不要提前实现：

- 在线播放
- 自动转存
- 自动下载
- STRM
- Emby / Jellyfin
- AI Agent
- Premium
- 复杂积分商城
- 论坛 / 私信
- 网盘 Cookie 托管

下一阶段优先完成 Media Catalog。

## 8. 文档同步

改变以下任何内容时必须同步文档：

- 架构边界
- Schema
- API
- Provider Contract
- 状态枚举
- 开发命令
- 路线图
- 当前阶段

对应更新：

- `PROJECT_STATUS.md`
- `MANIFEST.md`（只维护一个总文件）
- `CHANGELOG.md`
- 对应 `docs/*`

禁止不断新增 `V0_02_MANIFEST.md`、`V0_03_MANIFEST.md` 一类根目录版本文件。

## 9. 验证

完成变更后优先执行：

```bash
pnpm check
```

涉及数据库时额外验证：

```bash
pnpm db:generate
pnpm db:migrate
```

## 10. Git

使用 Conventional Commits，提交信息优先中文并带完整正文。

正文说明：

- 为什么改
- 改了什么
- 数据模型 / API 是否变化
- 如何验证
- 兼容性或迁移注意事项
