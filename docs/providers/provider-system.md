# Provider System

## 原则

Provider 是**资源发现适配器**，不是数据库 Repository。

接口方向：

```ts
export interface ResourceProvider {
  readonly id: string;
  readonly name: string;

  search(
    context: ProviderSearchContext,
  ): Promise<ResourceCandidate[]>;
}
```

Context 至少包含：

```text
Media ID
Media Type
TMDB ID
Titles[]
Year
Query
```

## 禁止

```text
PanSouProvider
  ↓
INSERT releases
```

## 正确

```text
PanSouProvider
  ↓
ResourceCandidate[]
  ↓
Pipeline
```

## Provider Registry

未来：

```text
packages/providers/
├─ contracts/
├─ manual/
├─ pansou/
└─ registry/
```

后续扩展 Provider 不应修改核心数据库模型。

## Raw Payload

Provider 的原始返回应可持久化到 Source Record / Candidate，以便：

- 重新解析
- 追踪来源
- 分析 Provider 质量
- 调查错误匹配
