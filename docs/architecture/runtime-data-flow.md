# Runtime Data Flow

## Catalog Search

```text
Browser
  ↓
Web
  ↓
API
  ↓
Search Service
  ↓
PostgreSQL
  ↓
Media Results
```

如果本地没有作品，未来可以明确触发 TMDB Import，而不是让每次前台搜索直接无界依赖 TMDB。

## Resource Discovery

```text
User opens Media
  ↓
Discover more resources
  ↓
API / Worker
  ↓
Provider Registry
  ↓
PanSou / Other Provider
  ↓
Candidate
  ↓
Parser
  ↓
Matcher
  ↓
Dedup
  ↓
Candidate Inbox / Auto Policy
  ↓
Release + Share + Provenance
```

## Share Verification

```text
Share
  ↓
Verification Job
  ↓
Result
  ↓
share_verifications
  ↓
Aggregate current status
```

不要只覆盖 `shares.status` 而丢掉历史判断。
