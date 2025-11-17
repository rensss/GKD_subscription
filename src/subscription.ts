import { defineGkdSubscription } from '@gkd-kit/define';
import { batchImportApps } from '@gkd-kit/tools';
import categories from './categories';
import globalGroups from './globalGroups';

export default defineGkdSubscription({
  id: 92384712947,
  name: 'Subscription',
  version: 0,
  author: 'rensss',
  checkUpdateUrl: './gkd.version.json5',
  supportUri: 'https://github.com/rensss/GKD_subscription/issues',
  categories,
  globalGroups,
  apps: await batchImportApps(`${import.meta.dirname}/apps`),
});
