# Contribution & Governance

## 投稿流程

不要给用户一个巨大的自由输入表。

正确：

```text
1 搜索 Media
2 确认作品
3 添加资源
4 粘贴 Share URL
5 粘贴 Release Name / Filename
6 Parser 自动识别
7 用户确认
8 提交
```

## 奖励原则

借鉴社区资源站的治理经验，但不复制具体积分数值。

原则：

- 奖励有效贡献
- 不奖励重复
- 自动聚合不冒充人工贡献
- 失效 / 垃圾数据不刷积分

## Point Ledger

未来：

```text
point_ledger
├─ user_id
├─ amount
├─ reason
├─ reference_type
├─ reference_id
└─ created_at
```

不要只维护一个不可追溯的 `users.points`。

## Report

未来 `reports`：

```text
reporter_id
entity_type
entity_id
reason
detail
status
resolved_by
resolved_at
created_at
```

reason：

```text
invalid
wrong_media
wrong_release
duplicate
spam
malicious
copyright
other
```
