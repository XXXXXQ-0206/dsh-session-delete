# dsh-session-delete

**DeepSeek Harness 会话回收站与彻底删除插件。**

`dsh-session-delete` 为 DeepSeek Harness 增加安全、可恢复的会话删除流程。你可以在侧边栏会话操作菜单中移入回收站，在 Settings 中管理已归档会话，一键恢复，或批量彻底删除。活跃 Agent 与正在使用的会话默认受到保护。

## 功能亮点

- **侧边栏删除项**  
  「删除」直接加入原生会话操作菜单，与「重命名 / 分叉对话 / 归档对话」并列。

- **会话头部删除按钮**  
  当前会话也可以从对话页顶部移入回收站。

- **回收站管理器**  
  Settings → **会话回收站** 提供搜索、工作区分组、多选、批量还原与批量彻底删除。

- **真正的彻底删除**  
  同时清除持久化会话日志、投影缓存，以及只有记录没有日志的幽灵会话。

- **活跃会话保护**  
  拒绝删除正在运行或仍被使用的会话。

- **可恢复路径**  
  每次归档操作都可撤销，并在右下角显示撤销 Toast。

- **原生风格深色/浅色界面**  
  使用 DSH 设计令牌，优先跟随 `body[data-ds-dark-theme]`，并提供 OS 级兜底。

## 为什么采用这套流程？

删除 Harness 会话不只是移除一行记录。会话包含持久化事件日志、投影缓存、工作区归属，甚至可能还有进行中的工作。`dsh-session-delete` 把删除设计成两阶段操作：

```text
活跃会话 -> 归档（可恢复） -> 恢复 / 彻底删除
```

这样既保留日常操作的速度，又让不可逆删除变得更慎重。

## 安装

安装最新 Release：

```sh
dsh plugin --profile web add https://github.com/XXXXXQ-0206/dsh-session-delete/releases/download/v0.5.3/dsh-session-delete-0.5.3.tgz
```

也可以安装固定 Git 标签：

```sh
dsh plugin --profile web add github:XXXXXQ-0206/dsh-session-delete#v0.5.3
```

安装后重启 `dsh web`。

更新或卸载：

```sh
dsh plugin --profile web update dsh-session-delete
dsh plugin --profile web remove dsh-session-delete
```

## 使用方法

### 删除会话

1. 在侧边栏悬停目标会话行。
2. 打开会话操作菜单。
3. 点击 **删除**。
4. 会话移入回收站，并出现撤销 Toast。

### 还原或彻底删除

1. 打开 **Settings → 会话回收站**。
2. 选择一个或多个已归档会话。
3. 选择 **还原** 或 **彻底删除**。
4. 活跃会话会自动受到保护。

## 架构

这个 bundle 同时包含 Host 与 Browser 两端：

```text
index.js                    Host 入口：生命周期、工作区、归档与持久化
client.js                   Browser 半边：侧边栏操作、回收站 UI、Toast
client.css                  基于 DSH 设计令牌的组件样式
cordis.patch.yml            Web Profile bundle patch
packages/session-trash-host Host 实现与 HTTP 路由
```

Browser 通过插件自己的 `/api/session-trash/*` 路由与 Host 通信；非 GET 请求携带 `x-dsh-plugin` 头防止 CSRF。Host 操作按会话逐一执行，批量操作会收集并报告失败项。

## 开发

```sh
pnpm test
```

测试覆盖 Host 逻辑、归档/彻底删除行为与 HTTP 路由契约。

## License

MIT
