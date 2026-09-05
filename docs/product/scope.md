# Product Scope

## V0.x 核心范围

### Media

支持：

- 电影
- 电视剧
- 动漫电影
- 动漫剧集
- 纪录片
- 综艺

底层 Media Type 首先归一为：

```text
movie
tv
```

类型、Genre、Region 等负责进一步分类。

### Metadata

主身份源：

- TMDB

External ID 预留：

- TMDB
- IMDb
- 豆瓣
- TVDB
- AniDB
- Bangumi
- Other

### Resource Discovery

首批：

- Manual
- PanSou

未来可扩展：

- HDHive
- Telegram
- Import
- Other API

### Share Provider

数据模型从第一天支持多平台。

UI 首期优先：

- 115
- 光鸭

模型预留：

- 夸克
- 阿里云盘
- 百度网盘
- 123
- 天翼
- UC
- PikPak
- 迅雷
- Other

## 明确暂缓

- 在线播放
- 自动转存
- 自动下载
- STRM
- Emby / Jellyfin
- MoviePilot Plugin
- AI Agent
- App
- Premium
- 支付
- 私信
- 论坛
- 复杂推荐系统
