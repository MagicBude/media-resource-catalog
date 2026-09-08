# Information Architecture

## Public — 当前

```text
/
├─ /browse
├─ /search
├─ /movie/{tmdbId}
└─ /tv/{tmdbId}
```

## Public — 后续

```text
/release/{id}
```

## User（后续）

```text
/account
/favorites
/contributions
```

## Admin（后续）

```text
/admin
├─ candidates
├─ submissions
├─ reports
├─ duplicates
├─ shares
├─ providers
├─ jobs
└─ users
```

## 全局导航

```text
MRC | 首页 | 发现 | 电影 | 剧集 | [全局搜索]
```

原则：

- 导航优先进入真实 Catalog，不展示架构说明作为主功能。
- 全局搜索常驻。
- 不为尚未存在的 Release / Share 页面放置可点击死链接。

## 首页层级

第一层：

```text
找到你真正想要的那个版本。
[ 搜索电影、剧集、别名、TMDB / IMDb ID ]
```

第二层：

- 最近入库
- 电影
- 剧集

当前没有 Rating / Popularity 数据，所以不伪造“热门”“排行榜”。
等正式字段进入 Schema 后再增加。

## Detail 层级

```text
Backdrop
  ├─ Poster
  ├─ Title / Original Title
  ├─ Year / Type / Runtime / Status
  ├─ Genres
  ├─ Overview
  └─ External Links

Release List            ← V0.3 正式接入

TV Seasons              ← TV only

Information
Alternative Titles
```

数据库验收指标（Title Count、External ID Count 等）不是面向用户的主要信息层。
