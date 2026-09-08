# Next Session

## 当前任务

先完成 V0.2.3 Media Catalog UI Foundation 的桌面与响应式验收。

重点验收真实数据：

```text
/movie/693134
/tv/1399
/browse
/search?q=Dune
```

确认：

- Poster / Backdrop 正常
- 大屏宽度不留无意义空白
- Movie Detail 信息层级合理
- TV Season Grid 正常
- 搜索结果使用 Poster Grid
- API unavailable / empty state 可读

## 下一阶段

V0.2.4 Media Identity Hardening。

### 1. External ID Identity

重点审查：

```text
UNIQUE(provider, external_id)
```

TMDB Movie / TV 数字 ID 属于不同 media type namespace，不能未经验证假设全局唯一。

### 2. PostgreSQL Unique / NULL Semantics

继续审查：

- media_titles
- media_external_ids
- seasons
- episodes

### 3. Identity Regression Tests

覆盖：

- Movie / TV 同数字 TMDB ID
- Alternative Titles
- External IDs

## 然后进入 V0.3

Release Foundation：

- Resolution
- Source
- Video Codec
- Bit Depth
- HDR / Dolby Vision
- Audio
- Subtitle
- Release Group
- Size / File Count
- TV Coverage

Detail 页已经预留 Release List。

## 暂时不要

- Share
- PanSou
- Community

Release 模型稳定后再进入这些阶段。
