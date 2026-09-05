# Architecture Overview

## 目标结构

```text
apps/
├─ web
├─ api
└─ worker                 # 后续

packages/
├─ core
├─ database
├─ providers              # 后续
├─ release-parser         # 后续
├─ matcher                # 后续
├─ pipeline               # 后续
├─ search                 # 后续
├─ auth                   # 后续
├─ ui                     # 后续
└─ config                 # 后续
```

当前 V0.1 只创建有真实代码的：

- `apps/web`
- `apps/api`
- `packages/core`
- `packages/database`

## 核心领域流

```text
Media
  ↓
Release
  ↓
Share
  ↓
Provenance
```

## Resource Discovery 流

```text
Media
  ↓
Provider Manager
  ↓
ResourceCandidate[]
  ↓
Parser
  ↓
Matcher
  ↓
Normalizer
  ↓
Deduplicator
  ↓
Review / Policy
  ↓
Repository
```

## 设计目标

- Core 不依赖基础设施
- Provider 不污染数据库
- Raw Data 可追溯
- API 与 Web 解耦
- 后台任务可独立扩展
