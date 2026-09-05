# PROJECT_STATUS

## 当前版本

`V0.1 Foundation`

## 当前目标

建立可安装、可检查、可构建、可交接的 Monorepo 基线。

## 已确定但尚未全部实现的产品核心

```text
Media → Release → Share → Provenance
```

已经形成完整设计文档，见 `docs/`。

## 当前代码已有

- pnpm Workspace
- Next.js Web 骨架
- Fastify API 骨架
- `/health`
- `packages/core`
- PostgreSQL / Drizzle 基础包
- 最小 `media` 表占位 Schema
- Vitest
- ESLint
- TypeScript
- Docker PostgreSQL
- GitHub Actions
- 文档与交接体系

## 当前尚未实现

- TMDB Provider
- 正式 Media Schema
- Media Titles
- External IDs
- Genres
- Seasons / Episodes
- Release
- Share
- Provenance
- Candidate Pipeline
- PanSou Provider
- 用户系统
- 投稿 / 举报 / 积分
- Public API V1

## 下一步

进入 **V0.2 Media Catalog / Schema Foundation**：

1. 设计并落地 `media`
2. `media_titles`
3. `media_external_ids`
4. `genres`
5. `media_genres`
6. `seasons`
7. `episodes`
8. TMDB 配置与 Provider Contract
9. Fixture
10. Repository Tests

开始前阅读：

- `docs/data-model/media.md`
- `docs/data-model/tv.md`
- `docs/providers/provider-system.md`
- `docs/roadmap/roadmap.md`
- `docs/handoff/next-session.md`

## 当前验证状态

压缩包生成端已完成：

- JSON 文件语法检查
- 必需文档存在性检查
- ZIP 文件清单检查

由于生成环境不提供 npm registry 访问，依赖安装后的：

```text
pnpm install
pnpm check
```

需要在用户本机完成。
