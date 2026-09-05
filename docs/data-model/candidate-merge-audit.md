# Candidate, Merge & Audit

## resource_candidates

Provider 结果先进入 Candidate：

```text
id
provider_id
query

raw_title
raw_url
raw_payload

parsed_media_title
parsed_year
parsed_release

match_status
matched_media_id
matched_release_id

status

created_at
processed_at
```

status：

```text
new
parsed
matched
accepted
rejected
duplicate
failed
```

## Release Deduplication

不能仅依赖 Release Name 完全一致。

可生成 `normalized_key`，参与因素：

```text
media
coverage
resolution
source
codec
HDR
release_group
size bucket
```

但 normalized key 不是绝对真理。

流程：

```text
Exact
 ↓
High Confidence
 ↓
Potential Duplicate
 ↓
Manual Review
```

## Entity Redirect / Merge

未来 `entity_redirects`：

```text
entity_type
from_id
to_id
reason
created_by
created_at
```

保证合并后旧引用仍可追踪。

## Audit Log

未来 `audit_logs`：

```text
actor_id
action
entity_type
entity_id
before
after
metadata
created_at
```

覆盖：

- Merge
- Edit
- Hide
- Restore
- Verify
- Moderate
