# Visual System

## 目标

Media Resource Catalog 应表现为高信息密度的影视资料库，而不是：

- 数据库 Debug Dashboard
- 后台管理系统
- 超大留白 Landing Page
- 对单一成熟站点的一比一复制

视觉结构参考成熟影视产品的共同模式：

- Poster Wall 负责浏览
- Backdrop + Poster 负责详情页第一印象
- Metadata 做信息层级，不做巨型统计卡
- Resource / Release 信息紧邻作品详情

## 基础视觉变量

当前 Web 由 `apps/web/app/globals.css` 维护基础 Token：

```text
Background   #090A0C
Surface      #101215
Surface 2    #15181C
Line         #252930
Text         #F4F5F7
Muted        #9AA1AB
Accent       #F0B323
Max Width    1540px
```

Accent 只用于：

- 当前重点
- Genre / Filter active
- 主要 CTA
- Release / Resource 重要状态

不要把 Accent 铺满页面。

## Media Art

Poster：

```text
2:3
```

Backdrop：

```text
Detail Hero 全宽裁切
object-fit: cover
渐变遮罩保证文字可读
```

当前 TMDB 图片只用于显示，正式数据仍来自本地 Catalog。

## 信息密度

Desktop Poster Grid 当前目标：

```text
6 columns @ 1540px
5 columns @ <= 1180px
4 columns @ <= 900px
3 columns @ <= 700px
2 columns @ <= 480px
```

卡片不堆无意义装饰。

## Detail Typography

Movie / TV Title：

```text
38–62px desktop
约 34px tablet/mobile
```

禁止回到早期 80–108px 的超大 Debug Hero 标题。

正文：

```text
14–16px
line-height 1.7–1.8
```

## Release Priority

V0.3 开始后 Detail 的第一主体内容必须是 Release：

```text
Media Header
↓
Release List
↓
Season / Credits / More Metadata
```

这体现项目与普通 TMDB 浏览站的差异。
