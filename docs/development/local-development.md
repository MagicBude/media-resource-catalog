# Local Development

## 推荐环境

- Node.js 24+
- pnpm 11+
- PostgreSQL 17+
- Docker（可选）

## 初始化

```bash
pnpm install
docker compose up -d postgres
cp .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm dev
```

PowerShell：

```powershell
pnpm install
docker compose up -d postgres
Copy-Item .env.example .env
pnpm db:generate
pnpm db:migrate
pnpm dev
```

## 地址

```text
Web    http://127.0.0.1:3000
API    http://127.0.0.1:4100
Health http://127.0.0.1:4100/health
```

## PostgreSQL

默认本地 Docker：

```text
database: mrc_dev
user: mrc
password: mrc
port: 5432
```

仅用于本地开发。

生产凭据不能复用。
