# Current State

## 项目

Repository:

```text
https://github.com/MagicBude/media-resource-catalog.git
```

## 当前阶段

V0.1 Foundation。

## 当前代码状态

已经搭建：

- Web
- API
- Core
- Database
- CI
- Docs

业务功能尚未正式开始。

## 最重要的既定结论

1. 不做普通盘搜站。
2. 核心模型固定：
   `Media → Release → Share → Provenance`
3. Release 与 Share 分离。
4. PostgreSQL + Drizzle。
5. TMDB 作为主要影视身份源。
6. Catalog Search 与 Resource Discovery 分离。
7. Provider 只产 Candidate。
8. 低置信度匹配不得自动猜测。
9. PanSou 作为 Provider，不作为产品本体。
10. 先 Catalog，后自动化消费工具。

## 用户交付偏好

后续修改通常采用：

- 助手提供覆盖 ZIP
- 用户解压覆盖仓库根目录
- 若需删除文件，单独明确告诉用户删除路径与命令
- 不无限新增版本 MANIFEST
- 提交时给完整中文 Conventional Commit 标题 + 正文
- 文档必须足够让其他 AI / Codex 接手
