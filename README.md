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

- **Media**：电影 / 剧集本身。
- **Release**：具体资源版本，例如 `2160p · UHD BluRay REMUX · Dolby Vision · Atmos`。
- **Share**：该 Release 在 115、光鸭等平台上的一个分享位置。
- **Provenance**：记录数据来自哪里、由谁提交、何时发现。

详细产品设计、数据模型、Provider、搜索、页面、社区、路线图均已拆分到 `docs/`。

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

**V0.1 Foundation**

目标仅是建立稳定、可测试、可交接的工程基线。

下一阶段是 **V0.2 Media Catalog**：

- TMDB Provider
- Media
- Media Titles
- External IDs
- Genres
- 搜索
- Movie / TV Detail

详见 `PROJECT_STATUS.md` 与 `docs/roadmap/roadmap.md`。

## 技术栈

- pnpm Workspace
- TypeScript
- Next.js
- Fastify
- PostgreSQL
- Drizzle ORM
- Vitest
- ESLint
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
pnpm check
```

等价于：

```bash
pnpm repo:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## 文档体系

```text
docs/
├─ product/
├─ architecture/
├─ data-model/
├─ providers/
├─ search/
├─ ui/
├─ community/
├─ api/
├─ security/
├─ development/
├─ roadmap/
└─ handoff/
```

入口见 `docs/README.md`。
