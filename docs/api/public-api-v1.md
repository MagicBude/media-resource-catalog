# Public API V1 Direction

Base：

```text
/api/v1
```

## 当前已实现

### Browse / Recent Media

```text
GET /api/v1/media
GET /api/v1/media?type=movie&limit=24
GET /api/v1/media?type=tv&limit=24
```

用途：

- 首页最近入库
- `/browse`
- Movie / TV 基础分类浏览

当前按 Media `updated_at` 倒序。

`type` 只接受：

```text
movie
tv
```

`limit` 最终由 Catalog Service 约束在 1–50。

### Search

```text
GET /api/v1/media/search?q=Dune
```

Response：

```json
{
  "items": []
}
```

### Media Detail

```text
GET /api/v1/media/movie/:tmdbId
GET /api/v1/media/tv/:tmdbId
```

404 表示作品尚未进入本地 Catalog。

## 当前未公开 Import API

真实 TMDB 导入当前通过 CLI：

```bash
pnpm media:import movie 693134 zh-CN
```

不在没有认证系统的情况下公开任意写数据库的 Import Endpoint。

## 后续

Release / Share API 等对应领域模型完成后再加入。

Public / Internal / Admin API 最终仍需要分离。
