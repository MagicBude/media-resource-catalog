# PROJECT_STATUS

## 当前版本

`V0.2.3 Media Catalog UI Foundation`

## 当前目标

把已经跑通的 Media 数据闭环从“开发验收页”升级为真正可浏览的影视资料库界面，同时继续保持：

```text
TMDB
  ↓
MediaImportService
  ↓
MediaCatalogSnapshot
  ↓
PostgreSQL Transaction
  ↓
Read / Search / Browse API
  ↓
Catalog Web UI
```

核心领域模型不变：

```text
Media → Release → Share → Provenance
```

当前仍然只正式建设 Media。

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

- `packages/catalog`
- `MediaCatalogService`
- `MediaImportService`
- Snapshot 事务持久化
- 本地 Catalog Search
- Movie / TV Read API
- TMDB Import CLI
- PostgreSQL Repository Integration Test
- CI PostgreSQL service
- Node 标准环境代理支持

### 真实 TMDB 数据验收

真实导入已验证：

```text
TMDB Movie 693134 《沙丘2》
TMDB TV 1399 《权力的游戏》
```

真实数据暴露并修复了 `media_titles` 跨 Region 同名 Alternative Title 冲突。
当前标题身份使用：

```text
(media_id, title, kind, language, region)
```

Migration：

```text
0000_magical_maelstrom
0001_strong_phalanx
```

### V0.2.3 Media Catalog UI Foundation

本阶段将 Web 从数据库 Debug Dashboard 改造为影视资料库产品界面：

- 全局 Header / Navigation / Search
- 首页最近入库
- `/browse` 发现页
- 电影 / 剧集筛选入口
- 海报墙 Media Card
- 搜索结果 Poster Grid
- Movie Detail Backdrop + Poster + Overview
- TV Detail Backdrop + Poster + Season Grid
- Genres / 状态 / 时长 / 外部链接
- Alternative Titles 弱化到资料区
- Release 区域提前预留正式位置
- Responsive Layout
- Loading / Empty / API unavailable 状态
- TMDB attribution

## 当前 API

```text
GET /health
GET /api/v1/media?type=&limit=
GET /api/v1/media/search?q=&limit=
GET /api/v1/media/movie/:tmdbId
GET /api/v1/media/tv/:tmdbId
```

`GET /api/v1/media` 当前用于浏览最近更新的本地 Media，可选 `movie` / `tv`。

## 当前 Web

```text
/
/browse
/search?q=
/movie/:tmdbId
/tv/:tmdbId
```

视觉原则：

- Poster / Backdrop 承担主要视觉信息
- 数据库 ID / Title Count 不做首屏主体
- 页面保持高信息密度，但不能表现成后台管理系统
- Release 是未来详情页第一优先内容区
- 不复制单一站点 UI，吸收成熟影视站的信息层级与海报浏览模式

## 当前导入命令

配置每台机器自己的 `.env`：

```text
TMDB_ACCESS_TOKEN=...
HTTP_PROXY=
HTTPS_PROXY=
NO_PROXY=127.0.0.1,localhost
```

然后：

```bash
pnpm media:import movie 693134 zh-CN
pnpm media:import tv 1399 zh-CN
```

CLI 同时兼容额外的 `--`。

## 尚未实现

- TMDB Search Fallback / Candidate Import
- Credits / Cast
- Episode Details Import
- Genre / Year 等完整 Browse Filter
- Rating / Popularity
- Release
- Share
- Provenance 正式表
- PanSou
- Community

## 下一步

### V0.2.4 Media Identity Hardening

优先稳定 Media 身份模型：

1. 审查 `media_external_ids` 的 TMDB Movie / TV namespace
2. 增加 Movie / TV 同数字 TMDB ID 回归测试
3. 审查 Nullable 字段参与唯一索引时的 PostgreSQL 语义
4. 明确 canonical TMDB identity 与 External ID 的职责

完成后进入：

### V0.3 Release Foundation

详情页已经为 Release List 预留正式位置，不需要再次推翻 UI。
