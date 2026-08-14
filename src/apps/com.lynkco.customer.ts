import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.lynkco.customer',
  name: 'Lynk',
  groups: [
    {
      key: 1,
      name: '签到有礼',
      fastQuery: true,
      actionMaximum: 2,
      resetMatch: 'app',
      rules: [
        {
          key: 0,
          name: '进入签到详情',
          activityIds: 'com.geely.lynkco.main.activity.LynkCoTabMainActivity',
          fastQuery: false,
          matchTime: 60000,
          forcedTime: 60000,
          matchRoot: true,
          actionMaximum: 1,
          matches: '[vid="signIn"][text="签到有礼"][visibleToUser=true]',
        },
        {
          key: 1,
          name: '立即签到',
          activityIds:
            'com.geely.lynkco.weex.core.activity.WeexAppHostActivity',
          fastQuery: false,
          matchTime: 60000,
          forcedTime: 60000,
          matchRoot: true,
          actionMaximum: 1,
          action: 'clickCenter',
          matches: '[text="立即签到"]',
        },
      ],
    },
  ],
});
