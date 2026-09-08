# Current State

## Repository

```text
https://github.com/MagicBude/media-resource-catalog.git
```

## 当前阶段

V0.2.3 Media Catalog UI Foundation。

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
Fastify Browse / Read / Search API
 ↓
Next.js Home / Browse / Search / Detail
```

## 核心架构仍然是

```text
Media → Release → Share → Provenance
```

当前只正式建设 Media。

## 当前包

- core
- database
- providers
- catalog

## 当前 Web

- `/`
- `/browse`
- `/search`
- `/movie/[tmdbId]`
- `/tv/[tmdbId]`

Web 已从最小数据库验收页切换到正式影视资料库 UI：

- Poster Wall
- Backdrop Detail Hero
- Movie / TV Metadata
- Season Grid
- Release Placeholder

## 当前 API

- Media Browse / Recent
- Search
- Movie Detail
- TV Detail

## 重要边界

- TMDB Provider 不写数据库。
- Catalog Service 编排 Use Case。
- Repository 管 SQL 与 Transaction。
- API 不直接操作多个数据库表。
- Web 不直连数据库。
- UI 不伪造不存在的 Rating / Release / Share 数据。

## 真实数据验收

已验证真实 TMDB Movie 693134《沙丘2》写入 PostgreSQL。

真实 Alternative Title 暴露过旧唯一约束无法表达相同标题文本跨 Region 的情况，已经修复为：

```text
media_id + title + kind + language + region
```

当前 Migration 链包括：

```text
0000_magical_maelstrom
0001_strong_phalanx
```

不得重写已经提交的 Migration 历史。

## Proxy

代理配置属于每台开发机自己的 `.env`：

```text
HTTP_PROXY
HTTPS_PROXY
NO_PROXY
```

禁止写死 7790 / 7890 等端口。

## UI 决策

- 不复制单一网站。
- 吸收成熟影视站共同的信息层级。
- Poster / Backdrop 优先于数据库统计信息。
- Detail 第一主体区域已经预留 Release List。
- V0.3 接入 Release 时不再次推翻详情页结构。
