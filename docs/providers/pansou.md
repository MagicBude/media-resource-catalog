# PanSou Provider Plan

## 定位

PanSou 是 Resource Discovery Provider，不是 Media Catalog。

## 使用方式

用户首先已经处于明确 Media：

```text
/movie/693134
```

系统构造多个 Query：

```text
Dune Part Two 2024
沙丘2 2024
Dune.Part.Two.2024
```

然后交给 PanSou。

## 返回处理

PanSou 返回：

```text
Raw Search Result
```

我们转换为：

```text
ResourceCandidate
```

之后：

```text
Parser
Matcher
Deduplicator
Policy
Repository
```

## 不做

- 不直接复制 PanSou 的全部搜索 UI 作为产品主体。
- 不让 PanSou 搜索结果直接成为正式 Release。
- 不把 Provider 排名当成数据库真实性。
