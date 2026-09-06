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

**V0.2 Media Catalog / Metadata Foundation**

当前已经进入正式 Media Catalog：

- Media
- Media Titles
- External IDs
- Genres
- Seasons
- Episodes
- Media Repository
- Metadata Provider Contract
- TMDB Metadata Provider
- TMDB Fixtures / Tests

下一步是 **V0.2.2 Media Import & Read API**：

- TMDB Snapshot → Repository 原子写入
- Movie / TV Import Service
- Media Read API
- Catalog Search 基础查询

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

```bash
pnpm install
docker compose up -d postgres
cp .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm dev
```

PowerShell：

```powershell
pnpm install
docker compose up -d postgres
Copy-Item .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm dev
```

默认地址：

- Web: `http://127.0.0.1:3000`
- API: `http://127.0.0.1:4100`
- API Health: `http://127.0.0.1:4100/health`

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

> 如果依赖尚未完整安装，pnpm 可能会先尝试补齐依赖。网络较慢时应先确保 `pnpm install` 成功。

## 文档入口

见 `docs/README.md`。
