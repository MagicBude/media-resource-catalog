# Catalog Search

Catalog Search 搜索正式 PostgreSQL Media Catalog。

## 当前 V0.2.2 支持

标题：

- `media.title`
- `media.original_title`
- `media_titles.title`

External ID：

- Raw IMDb，例如 `tt15239678`
- `tmdb:693134`
- `imdb:tt15239678`
- `douban:...`
- `tvdb:...`
- `anidb:...`
- `bangumi:...`
- `wikidata:...`

## API

```text
GET /api/v1/media/search?q=Dune
GET /api/v1/media/search?q=tmdb:693134
GET /api/v1/media/search?q=imdb:tt15239678
```

## 重要原则

当前搜索只搜**正式本地 Catalog**。

TMDB Search Fallback 属于下一阶段，并且即使加入，也必须明确区分：

```text
Local Result
External Candidate
```

不能让每次搜索悄悄把第三方结果直接写入数据库。
