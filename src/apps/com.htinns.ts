import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.htinns',
  name: '华住会',
  groups: [
    {
      key: 1,
      name: '网络提示',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          activityIds: 'com.huazhu.loading.LoadingActivity',
          matches: ['[text="继续使用"]'],
        },
      ],
    },
    {
      key: 2,
      name: '首页-签到',
      fastQuery: false,
      matchRoot: true,
      matchTime: 60000,
      forcedTime: 60000,
      resetMatch: 'app',
      rules: [
        {
          key: 1,
          activityIds: 'com.huazhu.main.RnMainActivity',
          action: 'clickCenter',
          actionMaximum: 1,
          matches: [
            '[desc="签到"][clickable=true][visibleToUser=true]',
            '[desc="会员签到"][clickable=true][visibleToUser=true]',
          ],
        },
        {
          key: 2,
          preKeys: [1],
          activityIds: '.reactnative.v2.RNContainerActivity',
          action: 'clickCenter',
          actionMaximum: 1,
          matches: ['[text="立即签到"]'],
        },
        {
          key: 3,
          preKeys: [2],
          activityIds: '.reactnative.v2.RNContainerActivity',
          action: 'clickCenter',
          actionMaximum: 1,
          matches: ['[text="开心收下"]'],
        },
        {
          key: 4,
          preKeys: [1],
          activityIds: '.reactnative.v2.RNContainerActivity',
          action: 'back',
          actionMaximum: 1,
          matches: ['[text="签到·任务中心"]'],
          excludeMatches: ['[text="立即签到"]', '[text="开心收下"]'],
        },
        {
          key: 5,
          preKeys: [3],
          activityIds: '.reactnative.v2.RNContainerActivity',
          action: 'back',
          actionMaximum: 1,
          matches: ['[text="签到·任务中心"]'],
        },
      ],
    },
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
  ],
});
