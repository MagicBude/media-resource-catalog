# PROJECT_STATUS

## 当前版本

`V0.2.2 Media Import & Read/Search`

## 当前目标

完成第一条真正可运行的 Media Catalog 闭环：

```text
TMDB
  ↓
MediaImportService
  ↓
MediaCatalogSnapshot
  ↓
PostgreSQL Transaction
  ↓
Read / Search API
  ↓
Web Search
```

## 已完成

### V0.1 Foundation

- Monorepo
- Next.js
- Fastify
- PostgreSQL / Drizzle
- ESLint / TypeScript / Vitest
- CI
- 分类文档与 Handoff

### V0.2.1 Metadata Foundation

- Media / Titles / External IDs / Genres
- Seasons / Episodes
- MediaRepository
- TMDB Metadata Provider
- Fixtures / Tests

### V0.2.2 Import & Read/Search

新增：

- `packages/catalog`
- `MediaCatalogService`
- `MediaImportService`
- Snapshot 事务持久化
- 本地 Catalog Search
- Movie / TV Read API
- TMDB Import CLI
- `/search`
- `/movie/[tmdbId]`
- `/tv/[tmdbId]`
- PostgreSQL Repository Integration Test
- CI PostgreSQL service

## 真实 TMDB 数据验收

已确认真实 TMDB 请求、代理、Token 与 PostgreSQL Transaction 链路可到达持久化阶段。

真实 Movie `tmdb:693134` 暴露出 `media_titles` 旧唯一约束过窄：

```text
Duna 2 / MX / alternative
Duna 2 / BR / alternative
```

属于两条合法的 Region-specific Alternative Title。

当前 Schema 已修正标题身份为：

```text
(media_id, title, kind, language, region)
```

并补充 Provider Fixture 与 PostgreSQL Integration Test。

应用本补丁后，需要基于仓库现有 migration journal 运行一次：

```bash
pnpm db:generate
```

生成新的 `0001_*` migration，再执行：

```bash
pnpm db:migrate
```

不要修改已经提交的 `0000` migration。

## 当前 API

```text
GET /health
GET /api/v1/media/search?q=
GET /api/v1/media/movie/:tmdbId
GET /api/v1/media/tv/:tmdbId
```

## 当前导入命令

配置 `.env`：

```text
TMDB_ACCESS_TOKEN=...
```

然后：

```bash
pnpm media:import -- movie 693134
pnpm media:import -- tv 1399
```

## 搜索

当前基础搜索支持：

- Primary Title
- Original Title
- Alternative Title
- Raw IMDb ID
- `tmdb:693134`
- `imdb:tt15239678`
- 其他已存 External ID 前缀查询

## 尚未实现

- TMDB Search Fallback
- Credits
- Episode Details Import
- Browse 页面
- Release
- Share
- Provenance 正式表
- PanSou
- Community

## 下一步

V0.2.3：

1. TMDB Search / On-demand Import Flow
2. Catalog Search + TMDB Fallback
3. 更完整 Movie / TV Detail UI
4. Episode Details
5. Browse 基础
6. 搜索排序与 Year Filter

当前仍然不要进入 Release / Share，先让 Media Catalog 完整可用。
