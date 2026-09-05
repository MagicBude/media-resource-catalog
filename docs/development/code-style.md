# Code Style

## TypeScript

- strict
- 避免 `any`
- 纯类型使用 `import type`
- 公共函数明确输入输出
- 不滥用 Type Assertion
- 优先小函数
- 领域枚举集中维护

## 注释

需要注释：

- 为什么存在的架构约束
- 非明显解析规则
- 第三方兼容行为
- 易踩坑的数据约束

不需要：

```ts
// add one
count += 1;
```

这种重复代码本身含义的注释。

## 命名

代码内部优先英文。

文档优先中文，必要技术名词保留英文。

## 数据库

数据库列使用 snake_case。

TypeScript 字段使用 camelCase。

## UI

不要机械套默认组件库样式。

组件库服务于产品设计，不反过来决定产品视觉。
