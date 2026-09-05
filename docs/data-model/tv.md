# TV Model

## seasons

```text
id
media_id

season_number
name
overview

air_date
poster_path
episode_count
```

唯一：

```text
(media_id, season_number)
```

## episodes

```text
id
season_id

episode_number
tmdb_id

name
overview

air_date
runtime
still_path
```

唯一：

```text
(season_id, episode_number)
```

## 原则

Media 是整部 TV Show。

Season / Episode 是内容结构。

Release Coverage 再说明一个资源覆盖：

- 单集
- 单季
- 多季
- 全剧
- 特别篇

不要把“季”建成独立 Media。
