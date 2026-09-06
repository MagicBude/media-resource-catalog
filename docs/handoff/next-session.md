# Next Session

## 当前首先完成 V0.2.1 验收

执行：

```bash
pnpm repo:validate
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose up -d postgres
pnpm db:generate
pnpm db:migrate
pnpm run check
```

`pnpm db:generate` 生成的 migration 需要一起提交。

## 全部通过后

进入：

**V0.2.2 Media Import & Read API**

### 1. Application Transaction Service

```text
MediaCatalogSnapshot
 ↓
Transaction
 ↓
MediaRepository
```

### 2. TMDB Import

```text
movie + tmdbId
tv + tmdbId
```

### 3. Read API

```text
GET /api/v1/media/movie/:tmdbId
GET /api/v1/media/tv/:tmdbId
```

### 4. Catalog Search

正式数据库优先：

- media.title
- media_titles.title
- external IDs

## 暂时不要做

- Release
- Share
- PanSou
- User
- Points
- AI
- Auto Transfer
