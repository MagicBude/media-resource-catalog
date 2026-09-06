# Testing Strategy

## Unit

当前覆盖：

- Core
- Catalog Service
- API Route
- TMDB Client / Provider
- Database Schema

## PostgreSQL Integration Test

V0.2.2 开始增加真实数据库测试：

```text
MediaRepository integration
```

测试会：

1. 执行正式 Drizzle Migration
2. 写入 MediaCatalogSnapshot
3. 读取完整 Media Detail
4. 测试 Title Search
5. 测试 External ID Search

## 本地

`.env` 中配置：

```text
DATABASE_TEST_URL=postgresql://mrc:mrc@127.0.0.1:5432/mrc_test
```

即可真跑。

不配置时 Integration Test 自动 skip，不会误用 `mrc_dev`。

## CI

GitHub Actions 自动启动 PostgreSQL 18：

```text
mrc_test
```

因此 CI 会真实执行数据库 Integration Test。

## 原则

测试数据库永远与开发 / 生产数据库分离。
