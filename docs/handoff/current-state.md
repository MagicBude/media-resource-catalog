# Current State

## Repository

```text
https://github.com/MagicBude/media-resource-catalog.git
```

## 当前阶段

V0.2.1 Media Catalog / Metadata Foundation，本地验收修复中。

## 已实现

- Media / Titles / External IDs / Genres
- Seasons / Episodes
- MediaRepository
- Metadata / Resource Provider Contract
- TMDB Client / Provider / Normalizer
- TMDB Fixtures / Tests

## 2026-09-06 本地验收信息

已确认：

- TypeScript 全部通过。
- Unit Tests 全部通过。
- Build 全部通过。

首轮失败属于工程兼容：

- repo validator 表示法过严
- ESLint 10 require-await
- drizzle-kit workspace 源码运行时解析
- root `.env` 加载路径

修复覆盖包已生成，下一步重新验证。

## 仍然不变

```text
Media → Release → Share → Provenance
```

TMDB = Metadata Provider。

PanSou = Resource Provider。

Provider 不直接写正式数据库实体。
