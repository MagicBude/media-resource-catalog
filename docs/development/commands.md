# Commands

## 全仓

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
pnpm repo:validate
```

## Database

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## 推荐日常流程

修改前：

```bash
git status
```

修改后：

```bash
pnpm check
git diff --check
git status
```

涉及 Schema：

```bash
pnpm db:generate
pnpm db:migrate
pnpm check
```

## 注意

不要在未确认工作区状态时使用破坏性 Git 命令。

如果交付包需要删除旧文件，应明确给用户 `git rm` 指令，而不是假定已经删除。
