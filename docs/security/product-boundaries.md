# Security & Product Boundaries

## 不保存

项目本体不应保存：

- 影视视频文件
- 用户网盘密码
- 用户长期敏感 Cookie
- DRM 绕过工具
- 付费限制绕过逻辑

## 保存

核心保存：

- 影视元数据
- Release 描述
- 第三方 Share 位置
- Provenance
- 有效性状态
- 用户贡献记录
- Audit

## 下架与治理

长期需要：

- Report
- Hide
- Remove
- Restore
- Audit
- Copyright / Rights complaint reason

## 凭据

外部 API Token 通过环境变量 / Secret 管理。

禁止提交 `.env`。

只提交 `.env.example`。

## Provider

Provider 返回的数据是外部输入，必须视为不可信：

- URL 要校验
- Raw Payload 不直接渲染 HTML
- 文本字段要做长度限制
- API 错误与超时隔离
