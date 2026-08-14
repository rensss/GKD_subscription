# 华住会首页广告通用关闭规则设计

## 目标

在华住会首页出现任意沿用当前弹窗布局的广告时，自动点击底部居中的关闭控件，不绑定具体广告文案、图片或活动内容。

## 当前上下文

- 应用包名：`com.htinns`
- 首页 Activity：`com.huazhu.main.RnMainActivity`
- 当前手机快照中，广告弹窗的关闭控件是无文字、无资源 ID 的可点击 `ViewGroup`。
- 关闭控件是弹窗容器的最后一个子节点，包含一个 `ImageView`，底部与弹窗容器对齐，并水平居中。

## 方案

在 `src/apps/com.htinns.ts` 新增“首页-广告关闭”规则组：

- 仅在 `com.huazhu.main.RnMainActivity` 中匹配。
- 使用 `matchRoot: true`，避免首页节点变化时从局部事件节点开始导致漏匹配。
- 使用结构和相对位置选择器，不匹配广告内容：

  ```text
  [childCount=2] > @[clickable=true][childCount=1][index=parent.childCount.minus(1)][bottom=parent.bottom][left=parent.left.plus(parent.width.minus(width).div(2))] > ImageView
  ```

- 使用默认 `click` 行为，优先点击无障碍节点，必要时回退到控件中心坐标。
- 使用 `actionMaximum: 1` 与 `resetMatch: 'match'`，同一弹窗只点击一次；广告关闭后再次出现时可以重新触发。
- 不改变现有“网络提示”“首页-立即签到”“会员-签到”规则。

## 取舍与边界

- 不采用广告文字/图片匹配：无法覆盖新广告。
- 不采用固定屏幕坐标：不同分辨率和布局变化下容易误点或失效。
- 结构规则依赖华住会广告弹窗继续使用当前关闭控件布局；若后续改成顶部关闭按钮或改变弹窗节点层级，需要追加结构分支。

## 验证

1. 用仓库 `pnpm run check` 校验 TypeScript、订阅结构和 GKD 选择器语法。
2. 构建订阅，确认生成结果包含新的规则组。
3. 在当前连接的华住会首页快照上确认选择器命中关闭控件，而不命中广告内容区域或首页其他按钮。
