# Release Model

Release 是项目价值最高的实体之一。

## 定义

Release 表示一个**具体资源版本**，不是某个分享链接。

例：

```text
Dune.Part.Two.2024.2160p.UHD.BluRay.REMUX.DV.HDR.TrueHD.Atmos.7.1
```

## 计划字段

```text
id
media_id

title
original_title

release_type

season_from
season_to
episode_from
episode_to

resolution
source
video_codec
video_bit_depth

release_group

size_bytes
file_count

subtitle_languages
subtitle_type

edition
is_complete

normalized_key

created_at
updated_at
```

HDR、音频等后续可按复杂度拆关联表。

## release_type

```text
movie
season
episode
season_pack
series_pack
special
unknown
```

例：

```text
S01E03 → episode
S01 → season
S01-S05 → season_pack / series_pack
```

## resolution

```text
480p
576p
720p
1080p
1440p
2160p
4320p
unknown
```

UI 可显示 4K / 8K，但数据库保存技术标准值。

## source

规范化：

```text
web
web-dl
webrip
bluray
uhd-bluray
bluray-remux
uhd-remux
hdtv
dvd
encode
unknown
```

原始文本保留在 Raw Data。

## video_codec

```text
h264
h265
av1
vp9
mpeg2
other
unknown
```

## HDR

不能只用 Boolean。

需要表达：

- SDR
- HDR10
- HDR10+
- Dolby Vision
- HLG
- 组合 fallback

## 音频

至少需要：

- codec
- channels
- features

features 如：

- Atmos
- DTS:X

## Release File

未来 `release_files`：

```text
id
release_id
filename
extension
size_bytes
season_number
episode_number
created_at
```

它可以帮助判断剧集缺集，但不是所有 Release 都强制拥有完整文件列表。
