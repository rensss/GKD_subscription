import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.lynkco.customer',
  name: 'Lynk',
  groups: [
    {
      key: 1,
      name: '签到有礼',
      fastQuery: true,
      matchTime: 15000,
      forcedTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      rules: [
        {
          key: 0,
          name: '进入签到详情',
          matches: '[text="签到有礼"]',
        },
        {
          key: 1,
          name: '立即签到',
          activityIds:
            'com.geely.lynkco.weex.core.activity.WeexAppHostActivity',
          matches: '[text="立即签到"]',
        },
      ],
    },
  ],
});
