# Data Model Overview

## 主实体

```text
Media
├─ MediaTitle
├─ ExternalId
├─ Genre
├─ Season
│  └─ Episode
└─ Release
   ├─ ReleaseFile
   └─ Share
      └─ ShareVerification

SourceRecord
└─ EntitySource

User
├─ Favorite
├─ Submission
├─ Report
└─ PointLedger
```

## ID 策略

内部业务实体使用 UUID。

对外 Media URL 优先使用稳定外部身份：

```text
/movie/{tmdbId}
/tv/{tmdbId}
```

Release / Share 等内部实体可以使用 UUID。

## 时间字段

关键实体统一保留：

- `created_at`
- `updated_at`

来源类实体额外保留：

- `discovered_at`
- `first_seen_at`
- `last_seen_at`
- `last_verified_at`
