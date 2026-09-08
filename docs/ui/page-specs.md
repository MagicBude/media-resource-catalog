# Page Specifications

## `/`

定位：影视资料库首页，而不是架构 Demo 或后台控制台。

当前：

- 紧凑 Hero
- 主搜索入口
- 最近入库 Poster Grid
- Movie / TV 分区

只展示本地 Catalog 已存在的数据。

## `/browse`

当前基础筛选：

- All
- Movie
- TV

当前排序：

- 最近 Metadata 更新

后续再增加：

- Genre
- Year
- Region
- Rating
- Popularity
- 最近新增 Release

不要在 Schema 尚无对应字段时伪造筛选项。

## Media Card

当前：

```text
[Poster]
[Movie / TV]
Title
Original Title
Year                TMDB ID
```

未来 Release 接入后可增加：

```text
4K
3 Releases
5 Shares
```

资源数量必须来自真实 Release / Share 数据。

## `/search?q=`

只返回本地 Media。

表现：Poster Grid，而不是数据库结果表格。

匹配能力当前包括：

- Primary Title
- Original Title
- Alternative Title
- External ID
- `tmdb:<id>`
- `imdb:<id>` 等前缀

Local Empty → TMDB Candidate 属于后续显式导入流程，当前不自动写库。

## `/movie/{tmdbId}` / `/tv/{tmdbId}`

顶部：

- Backdrop
- Poster
- 中文 / 当前语言标题
- 原名
- 年份
- Type
- Runtime（Movie）
- Status
- Genres
- Overview
- TMDB / IMDb / Wikidata 等 External Links

主体第一优先区：

- Release List Placeholder（V0.3 接入真实数据）

TV 额外：

- Season Poster Grid
- Season Name
- Year
- Episode Count

资料区：

- Media Information
- Alternative Titles

### 不再使用

以下信息不能继续占据 Detail 首屏大卡片：

- `Titles: 37`
- `External IDs: 3`
- `TMDB 693134` 大号 Identity Card
- `9 个季记录` 纯计数

这些可以作为细节存在，但不能取代真实影视内容。

## Release Card — V0.3 目标

```text
[4K] [REMUX] [DV] [HDR] [Atmos]

Release Name

UHD BluRay REMUX
HEVC 10bit
78.43 GB

115 × 3
光鸭 × 1

最近验证 2 天前
```

## `/release/{id}` — 后续

展示：

- 完整 Release Name
- Media
- Coverage
- 视频
- 音频
- 字幕
- 大小
- Release Group
- Shares
- 来源摘要
