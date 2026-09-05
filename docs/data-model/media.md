# Media Model

## media

计划字段：

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

created_at
updated_at
metadata_updated_at
```

唯一约束：

```text
(type, tmdb_id)
```

不要假设 Movie 与 TV ID 一定处于完全相同命名空间。

## media_titles

不要把全部语言标题塞在 `media`。

```text
id
media_id

title
language
region
kind
```

kind：

```text
primary
original
translated
alternative
alias
```

例：

```text
星际穿越       zh-CN translated
星際效應       zh-TW translated
Interstellar  en-US primary
```

## media_external_ids

```text
id
media_id
provider
external_id
external_url
created_at
```

provider 预留：

```text
tmdb
imdb
douban
tvdb
anidb
bangumi
other
```

优先唯一约束：

```text
(provider, external_id)
```

## Genre

`genres`

```text
id
slug
name
```

`media_genres`

```text
media_id
genre_id
```

V0.2 首先使用 TMDB Genre Mapping，不重新发明电影分类体系。
