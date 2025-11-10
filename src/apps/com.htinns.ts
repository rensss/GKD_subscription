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
  ],
});
