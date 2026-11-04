import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.alibaba.android.rimet',
  name: '钉钉',
  groups: [
    {
      key: 1,
      name: '自动打卡',
      fastQuery: false,
      matchRoot: true,
      matchTime: 60000,
      forcedTime: 60000,
      resetMatch: 'app',
      rules: [
        {
          key: 1,
          name: '点击底部工作台',
          action: 'clickCenter',
          actionMaximum: 1,
          resetMatch: 'app',
          anyMatches: [
            '[text="工作台"][visibleToUser=true]',
            '[desc="工作台"][visibleToUser=true]',
          ],
          excludeMatches: [
            '[text="考勤打卡"][visibleToUser=true]',
            '[desc="考勤打卡"][visibleToUser=true]',
            '[text*="上班打卡"]',
            '[text*="下班打卡"]',
            '[text*="打卡成功"]',
          ],
        },
        {
          key: 2,
          preKeys: [1],
          name: '进入考勤打卡',
          action: 'clickCenter',
          actionMaximum: 1,
          resetMatch: 'app',
          anyMatches: [
            '[text="考勤打卡"][visibleToUser=true]',
            '[desc="考勤打卡"][visibleToUser=true]',
          ],
          excludeMatches: [
            '[text*="上班打卡"]',
            '[text*="下班打卡"]',
            '[text*="打卡成功"]',
          ],
        },
        {
          key: 3,
          preKeys: [2],
          name: '点击上班/下班打卡',
          action: 'clickCenter',
          actionDelay: 1000,
          actionMaximum: 1,
          resetMatch: 'app',
          anyMatches: [
            '[text^="上班打卡"][visibleToUser=true]',
            '[text^="下班打卡"][visibleToUser=true]',
            '[desc^="上班打卡"][visibleToUser=true]',
            '[desc^="下班打卡"][visibleToUser=true]',
            '[text="打卡"][clickable=true][visibleToUser=true]',
          ],
        },
        {
          key: 4,
          preKeys: [3],
          name: '确认打卡结果',
          action: 'clickCenter',
          actionDelay: 500,
          actionMaximum: 1,
          resetMatch: 'app',
          anyMatches: [
            '[text="我知道了"][visibleToUser=true]',
            '[desc="我知道了"][visibleToUser=true]',
            '[text="确定"][visibleToUser=true]',
            '[desc="确定"][visibleToUser=true]',
          ],
        },
      ],
    },
    {
      key: 2,
      name: '极速打卡-弹窗确认',
      fastQuery: true,
      matchTime: 15000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          anyMatches: [
            '[text*="打卡成功"] + [text="我知道了" || text="确定"]',
            '[text*="极速打卡"] + [text="我知道了" || text="确定"]',
            '[text*="自动打卡"] + [text="我知道了" || text="确定"]',
            '[text="我知道了" || text="确定"][visibleToUser=true]',
          ],
        },
      ],
    },
  ],
});
