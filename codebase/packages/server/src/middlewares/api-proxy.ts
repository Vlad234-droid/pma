import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const apiProxyMiddleware = ({ 
  apiServerUrl,
  applicationContextPath,
  loggerLevel,
}: ProcessConfig) => {

  const apiProxy = initializeProxyMiddleware({ 
    filter: [ '/api/**', '!/api/colleague-inbox/**' ],
    mountPath: `/api`,
    pathRewrite: { '^/api': '' },
    targetUrl: apiServerUrl(),
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiProxy;
};
