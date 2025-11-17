import { defineGkdApp } from '@gkd-kit/define';

export default defineGkdApp({
  id: 'com.lynkco.customer',
  name: 'Lynk',
  groups: [
    {
      key: 1,
      name: '签到有礼',
      fastQuery: true,
      matchTime: 10000,
      actionMaximum: 1,
      resetMatch: 'activity',
      rules: [
        {
          matches: ['[text="签到有礼"]'],
        },
      ],
    },
  ],
});
