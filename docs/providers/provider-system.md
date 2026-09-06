# Provider System

Provider 现在明确分成**两类**，不要混为一个接口。

# 1. Metadata Provider

回答：

> 这是什么影视作品，它的标准元数据是什么？

首个实现：

```text
TMDB
```

Contract 方向：

```ts
interface MetadataProvider {
  id: string;
  name: string;

  getMovieSnapshot(id: number): Promise<MediaCatalogSnapshot>;
  getTvSnapshot(id: number): Promise<MediaCatalogSnapshot>;
}
```

Metadata Provider 返回规范化 Snapshot，但**不直接写数据库**。

正确：

```text
TMDB
 ↓
Metadata Snapshot
 ↓
Application Service
 ↓
Repository
```

# 2. Resource Provider

回答：

> 这个明确 Media 有哪些资源候选？

未来首个实现：

```text
PanSou
```

Contract：

```text
ResourceProvider
  ↓
ResourceCandidate[]
```

正确：

```text
PanSou
 ↓
Candidate
 ↓
Parser
 ↓
Matcher
 ↓
Deduplicator
 ↓
Pipeline
 ↓
Repository
```

# 3. 共同原则

- Provider 不拥有数据库。
- Provider 原始网络响应属于外部输入。
- 失败、超时与解析错误不能污染正式数据。
- 测试优先使用 Fixture，不依赖实时网络。
- Provider 的 ID 必须稳定。
