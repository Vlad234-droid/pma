import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const actuatorProxyMiddleware = ({ 
  actuatorServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  if (actuatorServerUrl() === undefined) {
    return [];
  }

  const apiProxy = initializeProxyMiddleware({ 
    mountPath: `/api/actuator`,
    //pathRewrite: { '^/api': '' },
    targetUrl: actuatorServerUrl()!,
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiProxy;
};
