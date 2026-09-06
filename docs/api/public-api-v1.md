# Public API V1 Direction

Base：

```text
/api/v1
```

## 当前已实现

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
pnpm media:import -- movie 693134
```

不在没有认证系统的情况下公开一个任意写数据库的 Import Endpoint。

## 后续

Release / Share API 等对应领域模型完成后再加入。

Public / Internal / Admin API 最终仍需要分离。
