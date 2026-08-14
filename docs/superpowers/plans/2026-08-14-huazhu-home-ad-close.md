# 华住会首页广告关闭规则 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在华住会首页针对当前弹窗布局，增加不绑定广告文案或图片的通用关闭规则。

**Architecture:** 在现有华住会应用规则文件中新增一个规则组，限定首页 Activity，并通过弹窗子节点结构和相对位置定位底部居中的关闭控件。规则使用 `matchRoot` 从完整无障碍树查询，使用 `resetMatch: 'match'` 允许广告关闭后再次出现时重新触发。

**Tech Stack:** TypeScript、`@gkd-kit/define`、GKD 选择器、pnpm、ADB 无障碍快照。

## Global Constraints

- 仅修改华住会订阅规则源文件，不改变现有规则行为；`dist/` 只用于构建校验，不纳入本次提交。
- 规则只匹配 `com.huazhu.main.RnMainActivity`。
- 不匹配具体广告文案、图片或固定屏幕坐标。
- 选择器必须通过仓库 `pnpm run check` 的 GKD 选择器校验。
- 当前仓库要求 Node.js `>=22`、pnpm `>=9`。

## File Map

- Modify: `src/apps/com.htinns.ts` — 新增“首页-广告关闭”规则组。
- Validate only: `dist/gkd.json5`、`dist/README.md`、`dist/CHANGELOG.md`、`dist/gkd.version.json5` — 由 `pnpm run build` 临时生成并校验；构建后恢复，不纳入本次提交。
- Test: 不新增永久测试文件；使用一次性 Node 断言、仓库检查、构建结果检查和当前手机快照验证。

### Task 1: Add generic home-ad close rule

**Files:**
- Modify: `src/apps/com.htinns.ts` after the existing group `key: 3`.
- Validate only: `dist/*` through the existing build script; restore generated changes afterward.

**Interfaces:**
- Consumes: existing `defineGkdApp` configuration for `com.htinns`.
- Produces: a group named `首页-广告关闭` with `key: 4`; its last selector target is the clickable close `ViewGroup`.

- [x] **Step 1: Write the failing configuration test**

Run this assertion before editing the source. It intentionally fails because the new selector is not yet present:

```bash
node --input-type=module -e '
import { readFileSync } from "node:fs";
const selector = "[childCount=2] > @[clickable=true][childCount=1][index=parent.childCount.minus(1)][bottom=parent.bottom][left=parent.left.plus(parent.width.minus(width).div(2))] > ImageView";
const source = readFileSync("src/apps/com.htinns.ts", "utf8");
if (!source.includes(selector)) throw new Error("首页广告关闭选择器尚未添加");
console.log("selector present");
'
```

Expected: `Error: 首页广告关闭选择器尚未添加`.

- [x] **Step 2: Add the minimal rule configuration**

Insert this group after the existing `会员-签到` group in `src/apps/com.htinns.ts`:

```ts
    {
      key: 4,
      name: '首页-广告关闭',
      fastQuery: false,
      matchRoot: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'match',
      rules: [
        {
          activityIds: 'com.huazhu.main.RnMainActivity',
          action: 'click',
          matches: [
            '[childCount=2] > @[clickable=true][childCount=1][index=parent.childCount.minus(1)][bottom=parent.bottom][left=parent.left.plus(parent.width.minus(width).div(2))] > ImageView',
          ],
        },
      ],
    },
```

The target is the middle selector unit marked with `@`; the trailing `ImageView` only verifies that the close container has the same child shape observed on the phone.

- [x] **Step 3: Run the configuration test and repository checks**

Run:

```bash
node --input-type=module -e '
import { readFileSync } from "node:fs";
const selector = "[childCount=2] > @[clickable=true][childCount=1][index=parent.childCount.minus(1)][bottom=parent.bottom][left=parent.left.plus(parent.width.minus(width).div(2))] > ImageView";
const source = readFileSync("src/apps/com.htinns.ts", "utf8");
if (!source.includes(selector)) throw new Error("首页广告关闭选择器尚未添加");
const groupName = "name: " + String.fromCharCode(39) + "首页-广告关闭" + String.fromCharCode(39);
if (!source.includes(groupName)) throw new Error("规则组名称缺失");
console.log("configuration assertions passed");
'
pnpm run check
```

Expected: the Node assertion prints `configuration assertions passed`; `pnpm run check` exits 0 without selector or TypeScript errors.

- [x] **Step 4: Build and inspect generated output**

Run:

```bash
pnpm run build
git diff --check
git diff -- dist/gkd.json5 dist/README.md dist/CHANGELOG.md dist/gkd.version.json5
```

Expected: build exits 0; generated `dist/gkd.json5` contains `name:'首页-广告关闭'`, the same Activity ID, and the selector. After inspection, restore all generated `dist/*` changes so the working tree contains no distribution-artifact diff.

- [x] **Step 5: Verify selector shape against the current phone snapshot**

Keep the phone on the currently displayed Huazhu home ad and run:

```bash
adb shell dumpsys window 2>/dev/null | rg 'mCurrentFocus' | rg 'com.htinns/com.huazhu.main.RnMainActivity'
adb exec-out uiautomator dump /dev/tty 2>/dev/null | rg -o 'class="android.view.ViewGroup"[^>]*clickable="true"[^>]*bounds="\\[[^]]+\\]\\[[^]]+\\]"' | tail -5
```

Expected: the foreground window is `com.htinns/com.huazhu.main.RnMainActivity`; the snapshot still exposes the clickable close `ViewGroup` at the bottom center of the modal. Do not click the phone during this diagnostic step. If the modal has disappeared, reopen the same home page ad before repeating the check.

Validation note: the phone was later reloaded without any input click and stopped at the existing network prompt before the ad reappeared. A one-off GKD selector fixture modeled from the captured ad snapshot matched exactly one bottom-centered close `ViewGroup`.

- [x] **Step 6: Review final diff and commit the implementation**

Run:

```bash
git status --short
git diff --stat
git diff --check
git add -- src/apps/com.htinns.ts docs/superpowers/plans/2026-08-14-huazhu-home-ad-close.md
git commit -m "feat: close Huazhu home ads"
```

Expected: only the Huazhu source rule and this implementation plan are staged; `dist/*` remains unchanged; the commit succeeds after verification.
