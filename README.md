# Media Resource Catalog

面向电影与剧集的结构化影视资源资料库，统一整理作品、资源版本、分享位置、来源追踪与社区贡献。

> **Find the release you actually want.**  
> **找到你真正想要的那个版本。**

## 项目定位

Media Resource Catalog 不是普通“网盘关键词搜索器”。

核心领域模型固定为：

```text
Media
  ↓
Release
  ↓
Share
  ↓
Provenance
```

详细产品设计、数据模型、Provider、搜索、页面、社区、路线图均拆分在 `docs/`。

## 新 AI / Codex 接手时先读

按顺序阅读：

1. `AGENTS.md`
2. `PROJECT_STATUS.md`
3. `MANIFEST.md`
4. `docs/README.md`
5. `docs/handoff/current-state.md`
6. `docs/handoff/next-session.md`
7. 再按任务阅读对应分类文档

不要只读 README 就开始改代码。

## 当前阶段

**V0.2.3 Media Catalog UI Foundation**

当前已经具备真实可运行的 Media Catalog：

- TMDB Movie / TV Metadata Import
- PostgreSQL Transactional Snapshot
- Titles / External IDs / Genres / Seasons
- Browse / Search / Detail API
- 首页 / 发现 / 搜索
- Movie Detail
- TV Detail + Season Grid
- Poster / Backdrop

当前仍然没有正式 Release / Share 数据。
详情页已经为 V0.3 Release List 预留位置。

详见 `PROJECT_STATUS.md` 与 `docs/handoff/next-session.md`。

## 技术栈

- pnpm Workspace
- TypeScript
- Next.js
- Fastify
- PostgreSQL
- Drizzle ORM
- Vitest
- ESLint 10
- GitHub Actions

## 本地启动

首次克隆：

```bash
pnpm install
cp .env.example .env
pnpm db:migrate
pnpm dev
```

如果使用本地 PostgreSQL，先按 `docs/development/database.md` 创建数据库。

**不要因为换电脑或新建数据库而重新执行 `db:generate`。**
仓库已经提交的 Migration 直接通过 `pnpm db:migrate` 应用。
只有 Schema 发生正式变更时才运行 `pnpm db:generate` 创建下一条 Migration。

默认地址：

- Web: `http://127.0.0.1:3000`
- API: `http://127.0.0.1:4100`
- API Health: `http://127.0.0.1:4100/health`

## 真实 TMDB 导入

根目录 `.env`：

```text
TMDB_ACCESS_TOKEN=...
HTTP_PROXY=
HTTPS_PROXY=
NO_PROXY=127.0.0.1,localhost
```

代理地址由每台电脑独立填写，禁止写死进仓库。

导入：

```bash
pnpm media:import movie 693134 zh-CN
pnpm media:import tv 1399 zh-CN
```

## 质量检查

```bash
pnpm run check
```

等价于：

```bash
pnpm repo:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 文档入口

见 `docs/README.md`。
