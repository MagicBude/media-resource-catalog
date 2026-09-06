# Local Development

## 当前环境

推荐：

- Node.js 24+
- pnpm 11+
- PostgreSQL 18+

用户当前 Windows 开发机已经使用 PostgreSQL 18.6。

## Root `.env`

```text
DATABASE_URL=postgresql://mrc:mrc@127.0.0.1:5432/mrc_dev
DATABASE_TEST_URL=
API_HOST=127.0.0.1
API_PORT=4100
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:4100
TMDB_ACCESS_TOKEN=
```

## 开发启动

```bash
pnpm dev
```

## 真实导入 TMDB

先配置 `TMDB_ACCESS_TOKEN`，然后：

```bash
pnpm media:import -- movie 693134
pnpm media:import -- tv 1399
```

## 搜索

导入后：

```text
http://127.0.0.1:3000/search?q=Dune
```

或：

```text
http://127.0.0.1:4100/api/v1/media/search?q=tmdb:693134
```

## 可选测试数据库

建议创建：

```text
mrc_test
```

并把 `DATABASE_TEST_URL` 指向它。

如果暂时不创建，本地集成测试会自动跳过；CI 仍然会真跑。


## 代理

外部 Provider 不写死代理地址。需要代理的开发机在本机根目录 `.env`
配置 `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY`。

详见：`docs/development/proxy.md`。
