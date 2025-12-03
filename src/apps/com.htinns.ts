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
  ],
});
