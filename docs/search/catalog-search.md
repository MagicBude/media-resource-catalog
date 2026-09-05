# Catalog Search

Catalog Search 搜索**正式 Media Catalog**。

## 输入

支持目标：

```text
中文名
原名
英文名
别名
年份
TMDB ID
IMDb ID
豆瓣 ID
```

## 搜索字段

主要：

- `media_titles.title`
- `media_external_ids`
- year

## V0.x 技术

先使用：

- PostgreSQL
- `pg_trgm`
- Full Text Search

不要过早引入 Elasticsearch / OpenSearch。

## 搜索结果

返回 Media，不直接返回几十条链接。

卡片应该可以显示：

```text
Poster
Title
Original Title
Year
TMDB
4K Release Count
1080p Release Count
Total Release Count
```

后面的资源统计等 Release 模型落地后再加入。
