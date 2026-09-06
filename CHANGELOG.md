# CHANGELOG

## Unreleased


### V0.2.2 — Media Import & Read/Search

#### Fixed

- 清理 V0.2.2 新增代码中的 ESLint 10 type-aware 问题：移除不必要类型断言与无意义 `async`，并调整测试 Promise Mock。


#### Added

- 新增 `packages/catalog` 应用层。
- 新增 `MediaCatalogService` 与 `MediaImportService`。
- `MediaRepository.saveSnapshot()` 使用 PostgreSQL Transaction 原子同步
  Media、Titles、External IDs、Genres 与 Seasons。
- 新增本地 Catalog Search。
- 新增 Movie / TV Read API。
- 新增 `pnpm media:import -- <movie|tv> <tmdbId>` TMDB 导入命令。
- 新增 Web `/search`、`/movie/[tmdbId]`、`/tv/[tmdbId]` 最小闭环页面。
- 新增 PostgreSQL Repository Integration Test。
- GitHub Actions 增加 PostgreSQL 18 测试服务。

#### Fixed

- Media Import CLI 改为使用 Node 标准环境代理支持，不再依赖任何写死的代理地址或端口。
- 支持每台开发机通过本地 `.env` 独立配置 `HTTP_PROXY`、`HTTPS_PROXY` 与 `NO_PROXY`。
- Import CLI 同时兼容带或不带 `--` 的参数形式。

#### Changed

- API 运行时开始真实连接 `mrc_dev`。
- 搜索优先查询正式本地数据库，不直接把每次搜索转发 TMDB。
- CI 会真实执行 Migration + Repository SQL 集成测试。


### V0.2.1 — Media Catalog / Metadata Foundation

#### Added

- 正式 Media Catalog Schema：
  - `media`
  - `media_titles`
  - `media_external_ids`
  - `genres`
  - `media_genres`
  - `seasons`
  - `episodes`
- Media Domain Types 与 Media Catalog Snapshot。
- `MediaRepository`。
- `packages/providers`。
- Metadata Provider / Resource Provider 两类 Contract。
- TMDB Bearer Token Client。
- TMDB Movie / TV Metadata Provider。
- TMDB Movie / TV Snapshot Mapper。
- TMDB Fixtures 与无网络单元测试。
- `docs/providers/tmdb.md`。

#### Fixed

- 修复 TMDB Provider 纯类型依赖未使用 `import type` 导致的 ESLint 10 错误。
- 构建前清理 `dist`，并禁止 TypeScript Build 编译测试文件，避免 Vitest 重复执行 `src` 与 `dist` 中的同一测试。
- 忽略 `*.tsbuildinfo` TypeScript 增量编译缓存，避免工作区产生无意义未跟踪文件。

#### Changed

- ESLint 升级至 10.x。
- Metadata Provider 与 Resource Provider 明确分离。
- `.env.example` 使用 `TMDB_ACCESS_TOKEN`。
- Database package 主动加载仓库根目录 `.env`。
- Drizzle Schema 不再通过 workspace 源码入口导入运行时枚举，避免 drizzle-kit loader 解析失败。
- Repository validator 同时接受横向与纵向核心模型表示。

#### Fixed

- 修复 `/health` handler 在 ESLint 10 下的 `require-await`。
- 修复 TMDB Fetch Mock 在 ESLint 10 下的 `require-await`。
- 修复 `pnpm db:generate` 的 `Cannot find module './media/types.js'`。
- 修复 `pnpm db:migrate` 在根目录 `.env` 已存在时仍报告 `DATABASE_URL is required`。
- 修复核心架构文档存在但 `repo:validate` 误判缺失的问题。

### V0.1 — Foundation

- 建立工程、数据库、CI、文档与交接基线。
