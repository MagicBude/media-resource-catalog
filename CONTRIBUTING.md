# CONTRIBUTING

## 分支与提交

推荐小步提交，每个提交只解决一个明确问题。

Conventional Commit 示例：

```text
feat(database): 建立 Media 与 External ID 模型

补充 Media、Media Title、External ID 与 Genre 表结构，
增加唯一约束、迁移和 Repository 测试。

验证：
- pnpm lint
- pnpm typecheck
- pnpm test
- pnpm build
```

## 提交前

至少运行：

```bash
pnpm check
```

涉及数据库：

```bash
pnpm db:generate
pnpm db:migrate
```

## 文档

新增或修改架构、Schema、API、Provider、路线图时，代码与文档必须一起提交。

## 禁止

- 未经说明的大范围格式化
- 混入与任务无关的重构
- 用删除测试的方式让 CI 通过
- Provider 直接写正式 Release
- 低置信度自动匹配
- 把 Share 当 Release
