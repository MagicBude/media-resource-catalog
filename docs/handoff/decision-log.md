# Decision Log

## 2026-09-05

### 产品形态

决定从“类似影巢 / 癫影 / FRAMEHDR / 聚影 / RDhub 的影视资源网站”出发，但不复制单一竞品。

组合思路：

- HDHive：数据思维
- FRAMEHDR：浏览体验
- 聚影：社区治理
- PanSou：Provider 能力
- MediaSync / Mediary Scout：外部 API 消费场景

### 核心模型

确定：

```text
Media → Release → Share → Provenance
```

### 数据库

确定 PostgreSQL，不采用 SQLite 作为正式生产数据库。

### 技术

确定：

- pnpm Monorepo
- TypeScript
- Next.js
- Fastify
- PostgreSQL
- Drizzle

### 开发范围

V0.1 只做 Foundation。

V0.2 从 Media Catalog 开始。

### 文档

确认必须使用分类 docs 与可交接文档体系。

根目录保持一个总 `MANIFEST.md`，不滚雪球式新增版本 Manifest。
