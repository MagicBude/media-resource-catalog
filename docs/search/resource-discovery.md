# Resource Discovery

Resource Discovery 与 Catalog Search 完全不同。

## 触发条件

用户已经选中明确 Media 后：

```text
发现更多资源
```

## 流程

```text
Media
 ↓
Query Builder
 ↓
Provider Registry
 ↓
Candidate[]
 ↓
Release Parser
 ↓
Media Matcher
 ↓
Release Deduplicator
 ↓
Share Deduplicator
 ↓
Review / Policy
 ↓
Persist
```

## 为什么分开

如果从首页直接对所有 Provider 搜关键词，会退化成普通盘搜站。

本项目先明确：

> 这是什么作品？

再问：

> 这个作品有哪些版本？
