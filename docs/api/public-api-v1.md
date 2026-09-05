# Public API V1 Direction

Base：

```text
/api/v1
```

## Media

```text
GET /media/search?q=
GET /media/movie/:tmdbId
GET /media/tv/:tmdbId
```

## Releases

```text
GET /media/movie/:tmdbId/releases
GET /media/tv/:tmdbId/releases
GET /releases/:id
```

筛选参数未来：

```text
resolution
source
hdr
provider
subtitle
```

## Shares

```text
GET /releases/:id/shares
```

是否返回真实 Share URL 由权限策略控制。

## User Mutation

未来：

```text
POST /submissions
POST /shares/:id/verify
POST /reports
```

## API 边界

未来区分：

- Public API
- Internal API
- Admin API

不要直接把 Worker 内部控制接口暴露为 Public API。

## 长期消费场景

目标允许：

- NAS Scripts
- MoviePilot 类插件
- MediaSync 类工具
- 其他个人媒体管理工具

把本站当成结构化 Resource Provider。
