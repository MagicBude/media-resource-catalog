# Next Session

## 下一任务

进入 **V0.2 Media Catalog / Schema Foundation**。

不要先做 UI 花活。

## 推荐顺序

### 1. 正式 Media Schema

实现：

```text
media
media_titles
media_external_ids
genres
media_genres
seasons
episodes
```

### 2. Constraint

重点确认：

```text
(type, tmdb_id)
(provider, external_id)
(media_id, season_number)
(season_id, episode_number)
```

### 3. Repository

建立：

- MediaRepository
- Title / External ID Query
- Transaction Tests

### 4. TMDB Contract

再创建：

```text
packages/providers
```

但 Provider Contract 要保持通用。

### 5. Fixture

建立真实 TMDB Fixture，不依赖测试时实时网络。

### 6. Validation

至少：

```bash
pnpm db:generate
pnpm db:migrate
pnpm check
```

## 本阶段不要做

- PanSou
- Release
- Share
- User
- Points
- AI
- Auto Transfer

先把 Media Catalog 做正确。
