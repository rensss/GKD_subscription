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
      name: '首页-立即签到',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'match',
      rules: [
        {
          activityIds: 'com.huazhu.reactnative.v2.RNContainerActivity',
          matches: ['[text="立即签到"]'],
        },
      ],
    },
    {
      key: 3,
      name: '会员-签到',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'app',
      rules: [
        {
          activityIds: 'com.huazhu.main.RnMainActivity',
          matches: ['[text="签到"]'],
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
