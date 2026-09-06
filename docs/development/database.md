# Database Development

## 技术

- PostgreSQL
- Drizzle ORM
- drizzle-kit

## 当前正式 Media Catalog 表

```text
media
media_titles
media_external_ids
genres
media_genres
seasons
episodes
```

## 环境变量位置

项目统一使用仓库根目录：

```text
/.env
```

`packages/database` 的运行时与 `drizzle.config.ts` 都会显式加载这个根 `.env`，
不要求在子包内复制第二份环境变量文件。

## Migration

修改 Schema 后：

```bash
pnpm db:generate
```

生成不要求数据库在线。

执行 Migration 前：

```bash
docker compose up -d postgres
```

然后：

```bash
pnpm db:migrate
```

## Drizzle Kit Runtime Boundary

`drizzle-kit generate` 会通过自己的 loader 加载 `src/schema.ts`。

因此 Schema 的运行时枚举字面量保持在 Schema 文件本地，不通过
workspace TypeScript 源码入口导入。

`schema.test.ts` 会把数据库 enumValues 与 `packages/core` 的领域常量比较，
用于防止两边静默漂移。

这属于工具链边界适配，不代表数据库层拥有领域定义权。

## 原则

- Migration 提交 Git。
- Provider 不直接写数据库。
- Raw Data 与正式实体分离。
- 已执行到共享环境的历史 Migration 不随意重写。
