# Decision Log

## 2026-09-05

### 核心模型

```text
Media → Release → Share → Provenance
```

### 数据库

PostgreSQL + Drizzle。

### 技术栈

pnpm / TypeScript / Next.js / Fastify。

### V0.1

Foundation 完成并提交。

## 2026-09-06 — V0.2.1

### Provider 分类

将 Provider 明确拆成：

```text
Metadata Provider
Resource Provider
```

理由：

TMDB 与 PanSou 解决的问题完全不同，不应该被一个含糊 Provider Contract 强行统一。

### TMDB

使用 API Read Access Token Bearer Authentication。

TMDB Provider：

- 只读
- 输出 MediaCatalogSnapshot
- 不直接操作 Repository

### Genre

当前 canonical genre name 固定使用 TMDB `en-US` genre list。

理由：

避免使用 `zh-CN` / `ja-JP` 等 Media Details 时反复覆盖 Genre 主名称。

未来真正需要多语言 Genre 时单独增加翻译表。

### Alternative Titles

没有可靠语言信息时使用：

```text
language = und
```

不根据国家 / 地区猜语言。

### ESLint

ESLint 9 已 EOL，因此升级至 ESLint 10 维护线，并使用当前支持 ESLint 10 的 typescript-eslint 8.x。
