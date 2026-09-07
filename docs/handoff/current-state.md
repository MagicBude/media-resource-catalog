# Current State

## Repository

```text
https://github.com/MagicBude/media-resource-catalog.git
```

## 当前阶段

V0.2.2 Media Import & Read/Search。

## 已形成可运行闭环

```text
TMDB
 ↓
Import CLI
 ↓
Catalog Application Service
 ↓
PostgreSQL
 ↓
Fastify Read/Search API
 ↓
Next.js Search / Detail
```

## 核心架构仍然是

```text
Media → Release → Share → Provenance
```

当前只建设 Media。

## 当前包

- core
- database
- providers
- catalog

## 当前 API

- Search
- Movie Detail
- TV Detail

## 重要边界

- TMDB Provider 不写数据库。
- Catalog Service 编排 Use Case。
- Repository 管 SQL 与 Transaction。
- API 不直接操作多个数据库表。
- Web 不直连数据库。


## 真实数据发现

V0.2.2 首次真实 TMDB Movie 导入已经成功通过：

```text
本机代理
→ TMDB Bearer Token
→ TMDB Metadata Provider
→ MediaCatalogSnapshot
→ PostgreSQL Transaction
```

在 `media_titles` 写入阶段发现旧唯一约束无法表示“相同标题文本、不同 Region”
的合法 TMDB Alternative Titles。

修复后标题身份使用：

```text
media_id + title + kind + language + region
```

下一操作必须由当前仓库运行 `pnpm db:generate` 生成新的 `0001_*`
migration；不得重写已提交的 `0000` migration。
