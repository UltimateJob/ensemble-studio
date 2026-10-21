# 合奏 Ensemble

> 五个声部，一个成品。

人机同群的 Agent 交付工作台。官方提供行业工作室，也可以从零搭一个。

## 页面

| 文件 | 说明 |
|---|---|
| `site.html` | 官网（滚动驱动动画） |
| `login.html` | 登录 / 注册：手机、微信、邮箱 |
| `home.html` | 工作台总览 |
| `studio.html` | 群聊列表 + 账户 + 群设置抽屉 |
| `chat.html` | 群聊（顶栏 / 消息 / 输入框） |
| `builder.html` | 创建工作室 |
| `themes.html` | 四套主题对比 |
| `mobile.html` | 移动端四屏 |
| `desktop.html` | 三栏任务室（早期版本） |

直接双击 `index.html` 即可，无构建、无依赖。

## 主流程

```
login.html → studio.html → chat.html
```

## 设计

**珠光 Pearl**：白纸、灰底、黑字。

| | 值 |
|---|---|
| 底 | `#F3F4F7` |
| 卡 | `rgba(255,255,255,.97)` |
| 边 | `#E3E3E9` |
| 字 | `#0D0D10` |
| 主色 | `#16161A` |

字号 7 档（11/12/13/14/16/20/28），圆角 3 档（8/12/16）。

`tokens.css` 里有四套主题：`pearl` / `aurora` / `sunrise` / `mint`，`data-theme` 切换。

## 官网动效

用 CSS scroll-driven animations（`animation-timeline`），不依赖 JS：

- Hero 标题逐行升起
- 产品图随滚动缩放淡出
- 每个区块进入时 fade + translateY
- 流水线从左生长
- 深色章节时导航自动反色

系统开启"减弱动态效果"时全部关闭。

## 原型说明

数据为演示用途，不含真实客户信息。
