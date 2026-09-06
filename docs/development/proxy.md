# Proxy Configuration

外部 Metadata / Resource Provider 的代理配置必须是**运行环境配置**，
不能写死在代码里。

## 原则

仓库只声明标准环境变量：

```text
HTTP_PROXY
HTTPS_PROXY
NO_PROXY
```

具体代理地址属于每台电脑自己的根目录 `.env`，该文件不提交 Git。

例如某台电脑当前本地代理实际监听在 `127.0.0.1:7790`，那么只在
这台电脑自己的 `.env` 写：

```text
HTTP_PROXY=http://127.0.0.1:7790
HTTPS_PROXY=http://127.0.0.1:7790
NO_PROXY=127.0.0.1,localhost
```

另一台电脑如果使用其他端口，就填写那台电脑自己的值；如果可以直连，
则让 `HTTP_PROXY` / `HTTPS_PROXY` 留空。

## Node

真实 Media Import 命令通过：

```text
--env-file-if-exists=../../.env
--use-env-proxy
```

在 Node 进程启动时读取本机 `.env` 并启用标准代理变量。

因此无需：

- 在代码中写死 `127.0.0.1`
- 写死 7790 / 7890 / 10809 等端口
- 根据某一种代理软件写专用逻辑
- 把本机代理配置提交 Git

## 本地地址

`NO_PROXY` 默认建议包含：

```text
127.0.0.1,localhost
```

避免本地 API / 开发服务被错误送入代理。

## Import CLI

以下两种形式都接受：

```bash
pnpm media:import movie 693134 zh-CN
pnpm media:import -- movie 693134 zh-CN
```
