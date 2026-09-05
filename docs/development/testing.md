# Testing Strategy

## Core

Unit Test。

重点：

- Value Object
- Enum Mapping
- Domain Rule

## Database

Repository Integration Test。

未来最好使用独立：

```text
mrc_test
```

禁止测试污染 `mrc_prod`。

## Release Parser

需要真实但脱敏的 Fixture Library：

```text
fixtures/release-names/
```

覆盖：

- 2160p REMUX
- 2160p WEB-DL
- 1080p BluRay
- S01E03
- S01-S08
- DV + HDR fallback
- Atmos
- 多字幕
- 非标准命名

## Matcher

重点验证：

- External ID 精确匹配
- Title + Year
- Alias + Year
- 低置信度拒绝自动猜测

## Provider

使用 Contract Tests + Fixtures。

网络可用性与解析正确性分开测试。

## API

Route Integration Test。

当前已有 `/health` 注入测试。

## CI

最低：

```text
repo:validate
lint
typecheck
test
build
```
