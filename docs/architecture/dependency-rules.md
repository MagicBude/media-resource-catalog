# Dependency Rules

推荐依赖方向：

```text
web ───────→ api

api ───────→ core
api ───────→ database
api ───────→ pipeline (future)

database ──→ core

providers ─→ core
parser ────→ core
matcher ───→ core
pipeline ──→ core
pipeline ──→ providers
pipeline ──→ parser
pipeline ──→ matcher
pipeline ──→ database
```

禁止反向依赖：

```text
core → database
core → Fastify
core → Next.js
database → PanSou
database → TMDB
provider → database write
web → PostgreSQL
```

如果未来新增包，需要先判断职责，而不是因为文件多就拆包。
