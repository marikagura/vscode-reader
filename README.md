# 🌙 VSCode Reader · 描金阅读

把 VSCode 变成一间 **kimi** 风格的读书房——拿来读小说、读长文、读 Markdown。
近黑底 + 金线浮雕，左侧是可拖动、可折叠的描金仪表盘（目录 / 进度 / 钉记 / 提醒 / 印记 / 电台），中间是书页，右边留给你的 AI 助手。

> 这是一套 **VSCode 注入主题**（Custom CSS/JS），不是扩展商店里的 color theme。
> 纯前端、零构建：几个 `.css` / `.js` 文件 + 几行 settings 即可。

![screenshot](docs/screenshot.png) <!-- 放一张你自己的截图 -->

---

## ✨ 特性

- **描金皮肤** `theme.css`：暖夜近黑底、金标题栏/侧栏/书页框/滚动条、图标统一描金、角落金藤纹、隐藏文件名/路径条让书页贴顶。
- **描金仪表盘** `dashboard.js`（左侧浮层，可整体滚动 / 一键折叠成金狐手柄）：
  - **目录** —— 点章名设为当前章；进度条 + `N / 总数` 实时跟随；支持「跳到第 N 章」输入框；记住你读到哪（localStorage）。
  - **钉记 / 摘抄 / 提醒** —— 全部 **点一下就能改**、可增删、自动持久。
  - **印记** —— 金线狐 / 玫瑰徽章（旋转封缄环）。
  - **电台** —— 独立可拖浮窗，真放在线电台流，多台可切（lo-fi / trance / 古典 / 古风 / 华语），转盘金点 + 走时 + live。
- **狐玫纹章** `widgets/emblem.js`：呼吸、可拖的角标。
- 所有浮窗位置、折叠状态、阅读进度都记在浏览器本地，重开还在。

---

## 📦 安装

### 1. 装注入器扩展
在 VSCode 扩展面板搜索并安装 **「Custom CSS and JS Loader」**（`be5invis.vscode-custom-css`）。

### 2. 放文件
把本仓库克隆/下载到一个固定位置，例如 `C:\Users\you\mucha-reader\`。

### 3. 配 settings
打开 `settings.json`，参照 [`settings.snippet.jsonc`](settings.snippet.jsonc) 填入 `vscode_custom_css.imports`（把 `<你的路径>` 换成你的绝对路径），并复制推荐的排版 + 配色。

> 💡 强烈建议**单独建一个「读书」Profile**（VSCode 右下角齿轮 → Profiles），把这些设置放进去，不污染你写代码的环境。

### 4. 启用
命令面板（`Ctrl/Cmd+Shift+P`）→ **Enable Custom CSS and JS** → **完全退出 VSCode 再重开**（不是 Reload Window）。
之后每次改了这些 `.css/.js`，运行 **Reload Custom CSS and JS** 再彻底重开即可。

### 5. 字体（可选但推荐）
- 西文 chrome 字体：[Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond)
- 中文正文：[Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC) 或 [霞鹜文楷 LXGW WenKai](https://github.com/lxgw/LxgwWenKai)
装到系统字体即可；没装会自动回退到系统衬线体。

---

## 📖 用法

- 用 VSCode 打开你自己的 `.txt` 小说 → 就是书页。
- 想让侧栏目录显示真实章名：复制 `chapters.example.js` 为 `chapters.js`，填入你的章名，并在 imports 里排在 `dashboard.js` 之前。
- **正文搜索**直接用 VSCode 自带 `Ctrl/Cmd+F`。
- 左侧仪表盘：点目录章名 = 设为当前章；钉记/提醒/摘抄点一下改；电台 ‹ › 切台。
- 折叠：仪表盘左上角 `«`；屏幕左缘的金狐手柄 `»` 展开。

---

## 🎨 自定义

- **配色**：所有金色集中在 `theme.css` / `dashboard.js` 顶部的 CSS 变量（`--gold` 系列、`--rose` 系列）。
- **图标**：`icons-data.js` 是从通用素材生成的金色狐/玫瑰（base64）。想换成你自己的图，替换其中的 data-URI 即可。
- **电台台单**：`dashboard.js` 里的 `STATIONS` 数组，按格式加行即可（流地址会变动，失效就换源）。

---

## ⚠️ 说明

- 本仓库**不含任何小说正文 / 受版权保护的章节目录**——示例目录与示例文本均为占位，请放你自己合法持有的书。
- 电台为第三方公开流（SomaFM / 1.FM / RauteMusik / Venice Classic 等），可用性不保证、可能随时变更；请遵循各服务的使用条款。失效就在 `dashboard.js` 的 `STATIONS` 里换源。
- 注入式主题会修改 VSCode 的 `workbench.html`（由 Custom CSS 扩展完成）；VSCode 升级后可能需要重新 **Enable Custom CSS and JS**。

---

## 🙏 致谢 / 灵感

配色与气质源自一个私人的「night」主题房间，kimi-room。
桌宠、个人立绘等私有素材未包含在内。

## 📄 License

[MIT](LICENSE) · 随意使用、修改、分享。
