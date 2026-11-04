import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.alibaba.android.rimet',
  name: '钉钉',
  groups: [
    {
      key: 1,
      name: '自动打卡-快捷入口',
      desc: '在首页顶部快捷栏点击打卡进入考勤页面',
      fastQuery: true,
      matchTime: 15000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          key: 1,
          name: '点击首页顶部打卡快捷图标',
          action: 'clickCenter',
          matches: ['[vid="im_ding_kit_item_txt"][text="打卡"]'],
        },
      ],
    },
    {
      key: 2,
      name: '自动打卡-工作台备用入口',
      desc: '若首页无打卡快捷图标，则通过底部工作台进入',
      fastQuery: false,
      matchTime: 15000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          key: 1,
          name: '点击底部工作台',
          action: 'clickCenter',
          matches: ['[vid="home_app_item"][desc="工作台"]'],
        },
      ],
    },
    {
      key: 3,
      name: '考勤页面-自动打卡',
      desc: '进入考勤打卡页面后等待定位完成并点击打卡按钮',
      fastQuery: false,
      matchRoot: true,
      matchTime: 30000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          key: 1,
          name: '点击上班/下班打卡文本(若无障碍可见)',
          activityIds:
            'com.alibaba.lightapp.runtime.ariver.TheOneActivityMainTask',
          action: 'clickCenter',
          actionDelay: 2000,
          anyMatches: [
            '[text^="上班打卡"][visibleToUser=true]',
            '[text^="下班打卡"][visibleToUser=true]',
            '[text="外勤打卡"][visibleToUser=true]',
          ],
        },
        {
          key: 2,
          name: '坐标点击打卡大圆钮(WebView兜底)',
          activityIds:
            'com.alibaba.lightapp.runtime.ariver.TheOneActivityMainTask',
          action: 'clickCenter',
          actionDelay: 2500,
          matches: ['[vid="h5_web_content"]'],
          position: {
            left: 'width * 0.5',
            top: 'height * 0.421',
          },
        },
      ],
    },
    {
      key: 4,
      name: '打卡结果-弹窗确认',
      desc: '自动点击打卡成功或极速打卡弹窗中的"我知道了"或"确定"',
      fastQuery: true,
      matchTime: 15000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          matches: ['[text="我知道了" || text="确定"][visibleToUser=true]'],
        },
      ],
    },
  ],
});
