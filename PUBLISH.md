# 🚀 怎么把这个 repo 传到 GitHub（手把手）

> 写这份文档时，本地仓库**已经初始化好、文件也暂存好了**（`git init` + `git add` 完成，但还没 `commit`）。
> 所以你有了 GitHub 之后，从下面 **第 2 步** 开始抄命令就行。
>
> 所有命令都在这个文件夹里跑：
> `C:\Users\you\vscode-reader`
> 用 **PowerShell** 或 VSCode 的终端（`Ctrl+\``）打开它，先 `cd` 进来：
> ```powershell
> cd "C:\Users\you\vscode-reader"
> ```

---

## 第 0 步 · 注册 GitHub（只做一次）

1. 打开 https://github.com → **Sign up**，用邮箱注册、起个用户名（下面叫它 `<你的用户名>`）。
2. 记住用户名——后面命令要用。

---

## 第 1 步 · 设置 git 身份（只做一次，决定 commit 署名）

> ⚠️ 这里填的**邮箱会随每条 commit 永久公开**在 GitHub 上。两个选择：

**选择 A · 用 GitHub 隐私邮箱（推荐，不暴露真邮箱）**
GitHub 自动给你一个 `noreply` 邮箱，格式是：
`<数字ID>+<你的用户名>@users.noreply.github.com`
（在 GitHub → Settings → Emails → "Keep my email addresses private" 勾上后能看到确切地址）

```powershell
git config --global user.name  "<你的用户名>"
git config --global user.email "<那串>+<你的用户名>@users.noreply.github.com"
```

**选择 B · 用真邮箱（简单，但邮箱会公开）**
```powershell
git config --global user.name  "your-name"
git config --global user.email "you@example.com"
```

> 只想给这一个仓库用某身份、不影响全局？把上面的 `--global` 去掉，在本文件夹里跑即可。

---

## 第 2 步 · 提交（本地，安全）

```powershell
git commit -m "init: VSCode Reader 描金阅读主题"
```

> 如果它报 `Author identity unknown`，说明第 1 步没做——回去设 `user.name` / `user.email`。

确认提交成功：
```powershell
git log --oneline
```
应看到一行带你刚才那句话的提交记录。

---

## 第 3 步 · 在 GitHub 上建一个空仓库

1. 登录 GitHub → 右上角 **+** → **New repository**。
2. **Repository name**：建议 `vscode-reader`（或你喜欢的名字）。
3. **Description**（可选）：`VSCode 描金阅读主题 · kimi 风格`
4. **Public / Private**：
   - **Public** = 开源、任何人可见（要分享就选这个）
   - **Private** = 只有你能看（以后可在设置里一键转 Public）
5. ⚠️ **不要**勾 "Add a README / .gitignore / license"——我们本地已经有了，勾了会冲突。
6. 点 **Create repository**。

建完 GitHub 会显示一个仓库地址，长这样：
`https://github.com/<你的用户名>/vscode-reader.git`

---

## 第 4 步 · 连接并推送

把下面的 `<你的用户名>` 换成你的，仓库名若不是 `vscode-reader` 也一起换：

```powershell
git remote add origin https://github.com/<你的用户名>/vscode-reader.git
git push -u origin main
```

**第一次 push 会要你登录**：
- 弹出浏览器/窗口让你授权 GitHub —— 按提示登录授权即可。
- 或者它让你输 **用户名 + 密码**：密码那里**不能用账号密码**，要用 **Personal Access Token**（见下方「常见问题」）。

push 成功后，刷新 GitHub 仓库页面，文件就都上去了 ✨

---

## 第 5 步 · 放一张截图（让首页好看）

1. 在仓库文件夹里新建 `docs` 文件夹，把你的阅读界面截图存成 `docs/screenshot.png`。
2. 然后：
```powershell
git add docs/screenshot.png
git commit -m "docs: 加界面截图"
git push
```
（README 里已经写好 `![screenshot](docs/screenshot.png)`，图一传上去首页就会显示。）

---

## 以后改了东西，怎么再传？

每次改完文件，三连：
```powershell
git add -A
git commit -m "说明这次改了啥"
git push
```

---

## 常见问题

**Q：push 时让我输密码，输账号密码却失败？**
A：GitHub 早就不收账号密码了，要用 **Personal Access Token (PAT)**：
GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token → 勾 `repo` 权限 → 生成后复制那串。push 要密码时**粘贴这串 token** 当密码。
（更省事的办法：装 [GitHub CLI](https://cli.github.com/) `gh`，跑 `gh auth login` 走浏览器授权，之后 push 再也不用输。）

**Q：想用更简单的图形界面，不想敲命令？**
A：装 [GitHub Desktop](https://desktop.github.com/)，登录后 "Add Local Repository" 选这个文件夹，点 "Publish repository" 就行，可视化操作。

**Q：传错了 / 想删库重来？**
A：本地 `Remove-Item -Recurse -Force .git` 可清掉 git 记录重新来；GitHub 上的库在仓库 Settings 最底下能 Delete。

**Q：会不会把我的小说或私人东西传上去？**
A：不会。`.gitignore` 已挡掉 `novel-data.js` / `my-*.txt` 等；repo 里本来也不含任何小说正文、真实章名、私人立绘或日历。可在 push 前用 `git ls-files` 看一眼到底会传哪些文件。

---

## 当前仓库里有什么（共 9 个文件）

| 文件 | 作用 |
|---|---|
| `README.md` | 项目说明（你已改过） |
| `LICENSE` | MIT 开源协议 |
| `.gitignore` | 挡掉私人/版权文件 |
| `theme.css` | 描金皮肤 |
| `dashboard.js` | 描金仪表盘（目录/钉记/提醒/印记/电台，全可手动编辑） |
| `icons-data.js` | 金色狐/玫瑰图标 |
| `widgets/emblem.js` | 狐玫纹章浮窗 |
| `chapters.example.js` | 用户填自己章名的模板 |
| `sample-novel.txt` | 示例正文（占位） |
| `settings.snippet.jsonc` | 一键复制的 VSCode 设置 |
