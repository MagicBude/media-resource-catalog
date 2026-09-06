# TV Model

V0.2.1 已正式落地 Season / Episode Schema。

## seasons

```text
id
media_id
tmdb_id

season_number
name
overview
air_date
poster_path
episode_count

created_at
updated_at
```

唯一：

```text
(media_id, season_number)
```

TMDB Season ID 也建立唯一索引。

## episodes

```text
id
season_id
tmdb_id

episode_number
name
overview
air_date
runtime
still_path

created_at
updated_at
```

唯一：

```text
(season_id, episode_number)
```

TMDB Episode ID 也建立唯一索引。

## 当前导入范围

TV Details 本身可以给出 Season Summary，所以 TMDB TV Snapshot 当前先包含 Season。

Episode 需要进一步请求 Season Details。

Episode 网络抓取与原子写入留到后续 Media Import Service，不在 Provider 内偷偷写数据库。

## 原则

Media 是整部 TV Show。

Season / Episode 是内容结构。

Release Coverage 再描述资源覆盖：

- episode
- season
- season pack
- series pack
