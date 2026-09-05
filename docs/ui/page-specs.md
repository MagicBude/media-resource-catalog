# Page Specifications

## `/`

Hero + 搜索入口。

首页不是全功能控制台。

## `/search?q=`

只返回 Media。

## `/browse`

筛选：

- type
- genre
- year
- region
- sort

排序：

- 热门
- 评分
- 上映日期
- 最近更新
- 最近新增资源

## `/movie/{tmdbId}` / `/tv/{tmdbId}`

顶部：

- Backdrop
- Poster
- 中文名
- 原名
- 年份
- Genre
- Runtime
- Rating
- TMDB / IMDb / 豆瓣

主体：

- 简介
- 演职员
- Release List

Release 筛选：

- Resolution
- Source
- HDR
- Codec
- Subtitle
- Share Provider

## Release Card

目标：

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

## `/release/{id}`

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
