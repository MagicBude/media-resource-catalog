# TMDB Metadata Provider

## 定位

TMDB 是 Media Catalog 的首个 Metadata Provider。

它负责：

- Movie Details
- TV Details
- Alternative Titles
- External IDs
- Canonical Genre List
- 外部 ID Find

它不负责：

- Release
- Share
- PanSou Search
- 数据库写入

## 认证

使用 TMDB API Read Access Token：

```http
Authorization: Bearer <TMDB_ACCESS_TOKEN>
```

环境变量：

```text
TMDB_ACCESS_TOKEN
```

真实 Token 永远不能提交 Git。

## 当前实现

```text
packages/providers/src/metadata/tmdb/
├─ client.ts
├─ normalize.ts
├─ provider.ts
├─ types.ts
└─ tests
```

## Movie Snapshot

组合：

```text
/movie/{id}
movie alternative_titles
movie external_ids
genre/movie/list?language=en-US
```

## TV Snapshot

组合：

```text
/tv/{id}
tv alternative_titles
tv external_ids
genre/tv/list?language=en-US
```

## 为什么 Genre 固定取 en-US

`genres.name` 当前作为 canonical name。

Media 详情可能使用 `zh-CN`，如果直接用详情里的 Genre Name，
同一个 Genre 会因为导入语言不同不断被覆盖。

因此：

- Media Title 可本地化。
- Genre Canonical Name 当前固定 en-US。
- 后续如需要多语言 Genre，再增加独立 Genre Translation 模型。

## Alternative Title

TMDB Alternative Titles 通常提供 Region，但并不总能可靠提供 Language。

所以当前映射：

```text
language = und
region = TMDB region
kind = alternative
```

不要根据国家代码猜语言。

## External IDs

当前映射：

Movie：

- tmdb
- imdb
- wikidata

TV：

- tmdb
- imdb
- tvdb
- wikidata

豆瓣等 ID 未来通过其他来源补充。

## Fixtures

测试数据：

```text
packages/providers/fixtures/tmdb/
```

测试不得要求开发者拥有真实 TMDB Token。
