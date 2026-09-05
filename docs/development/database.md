# Database Development

## 技术

- PostgreSQL
- Drizzle ORM
- drizzle-kit

## Migration

修改 Schema 后：

```bash
pnpm db:generate
```

检查生成 SQL 后：

```bash
pnpm db:migrate
```

## 原则

- Migration 提交到 Git。
- 不手改已在多人环境执行过的历史 Migration。
- 破坏性 Schema 修改必须写迁移说明。
- 测试数据库与生产数据库隔离。
- Provider Raw Data 与正式实体不要混在同一字段里。

## V0.1

当前 `media` 表只是 Foundation 占位，不代表最终 Media Schema。

V0.2 必须按 `docs/data-model/media.md` 正式扩展。
