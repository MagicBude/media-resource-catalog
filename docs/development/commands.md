# Commands

## 全仓

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm run check
pnpm repo:validate
```

推荐显式写 `pnpm run check`，方便区分“项目 package.json 脚本”与 pnpm 自身行为。

## Database

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

`db:generate` 不要求数据库在线。

`db:migrate` 与 `db:studio` 需要有效的 `DATABASE_URL`。

## 推荐日常流程

修改前：

```bash
git status
```

修改后：

```bash
pnpm run check
git diff --check
git status
```

涉及 Schema：

```bash
pnpm db:generate
pnpm db:migrate
pnpm run check
```

## 注意

不要在未确认工作区状态时使用破坏性 Git 命令。

如果覆盖包需要删除旧文件，应明确给用户 `git rm` 指令，而不是假定已经删除。
