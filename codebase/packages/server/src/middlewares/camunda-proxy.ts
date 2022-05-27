import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const camundaProxyMiddleware = ({
  camundaServerUrl,
  applicationContextPath,
  loggerLevel,
}: ProcessConfig) => {

  const camundaProxy = initializeProxyMiddleware({ 
    // filter: [ '/api/**', '!/api/colleague-inbox/**' ],
    mountPath: `${emptyIfRoot(applicationContextPath())}/camunda`,
    targetUrl: camundaServerUrl(),
    clearCookies: false,
    logLevel: loggerLevel(), 
    logger: 'camunda',
    overridenOptions: {
      cookieDomainRewrite: '',
    }
  });

  return camundaProxy;
};
