# Share & Provenance Model

## Share

Share 只表示：

> 某个 Release 在某个平台上的一个分享位置。

计划字段：

```text
id
release_id

provider
share_url
share_code
provider_share_id

status
submitted_by

first_seen_at
last_seen_at
last_verified_at
invalid_at

created_at
updated_at
```

provider：

```text
115
guangya
quark
aliyun
baidu
123pan
tianyi
uc
pikpak
xunlei
other
```

status：

```text
unknown
active
invalid
restricted
removed
pending
```

## 去重身份

不要只：

```text
UNIQUE share_url
```

优先：

```text
(provider, provider_share_id)
```

无法提取 Share ID 时再使用 canonical URL。

## Share Verification

计划 `share_verifications`：

```text
id
share_id
result
method
checked_by
detail
created_at
```

result：

```text
active
invalid
unknown
restricted
```

method：

```text
manual
automatic
provider
community
```

## Provenance

计划 `source_records`：

```text
id
source_type
source_name
provider_id
external_record_id
source_url
raw_title
raw_payload
discovered_at
created_at
```

source_type：

```text
manual
provider
import
api
admin
```

再通过 `entity_sources` 连接：

```text
source_record_id
entity_type
entity_id
relationship
```

entity_type：

```text
media
release
share
```

这样可以追踪“为什么这个 Release / Share 会存在”。
