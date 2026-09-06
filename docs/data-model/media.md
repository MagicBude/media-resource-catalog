# Media Model

V0.2.1 已正式落地。

## media

字段：

```text
id
type
tmdb_id

title
original_title
original_language
overview

release_date
first_air_date
status

poster_path
backdrop_path
runtime

metadata_updated_at
created_at
updated_at
```

唯一约束：

```text
(type, tmdb_id)
```

## media_titles

```text
id
media_id
title
language
region
kind
created_at
```

kind：

```text
primary
original
translated
alternative
alias
```

Alternative Title 如果只有 Region 而没有可靠 Language：

```text
language = und
```

禁止通过 Country 猜 Language。

## media_external_ids

```text
id
media_id
provider
external_id
external_url
created_at
```

当前 Provider Enum：

```text
tmdb
imdb
douban
tvdb
anidb
bangumi
wikidata
other
```

唯一约束：

```text
(provider, external_id)
```

## genres

```text
id
tmdb_id
slug
name
created_at
updated_at
```

当前：

```text
slug = tmdb-{genreId}
name = TMDB en-US canonical name
```

## media_genres

多对多连接：

```text
media_id
genre_id
```

复合主键：

```text
(media_id, genre_id)
```
