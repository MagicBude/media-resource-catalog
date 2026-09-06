# PROJECT_STATUS

## 当前版本

`V0.2.1 Media Catalog / Metadata Foundation`

## 当前目标

把影视资料库本身的基础模型做正确，再进入 Release / Share。

## 已完成设计与代码

### Foundation

- pnpm Workspace
- Next.js Web
- Fastify API
- PostgreSQL / Drizzle
- Core Package
- ESLint / TypeScript / Vitest
- Docker PostgreSQL
- GitHub Actions
- 分类文档与 AI 交接体系

### Media Catalog Metadata Foundation

正式落地：

```text
media
media_titles
media_external_ids
genres
media_genres
seasons
episodes
```

新增：

- Media Domain Types
- Media Repository
- Metadata Provider Contract
- Resource Provider Contract
- TMDB Client
- TMDB Metadata Provider
- TMDB → Domain Snapshot Mapper
- Movie / TV Fixtures
- Provider Tests
- Schema Tests

## 2026-09-06 本地验收发现并修复

第一轮本地验证暴露了四个工程兼容问题：

1. Repository validator 只接受单行右箭头，不接受文档中的纵向箭头。
2. ESLint 10 `require-await` 抓到同步 Fastify handler 与测试 mock。
3. Drizzle Kit 的运行时 loader 无法通过 Core 源码入口解析 `.js` 重导出。
4. 数据库子包没有主动加载仓库根目录 `.env`。

当前修复包已针对以上问题修正，等待用户重新执行完整验证。

## 核心不变量

```text
Media → Release → Share → Provenance
```

## 下一步

本轮先完成：

```bash
pnpm repo:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose up -d postgres
pnpm db:generate
pnpm db:migrate
pnpm run check
```

全部通过后提交 V0.2.1，再进入 V0.2.2 Media Import & Read API。
