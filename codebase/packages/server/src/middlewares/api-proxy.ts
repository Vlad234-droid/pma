import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const apiProxyMiddleware = ({ 
  apiServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  const apiProxy = initializeProxyMiddleware({ 
    mountPath: `/api/v1`,
    targetUrl: apiServerUrl(),
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiProxy;
};

export const apiManagementProxyMiddleware = ({ 
  apiManagementServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  if (apiManagementServerUrl() === undefined) {
    return [];
  }

  const apiManagementProxy = initializeProxyMiddleware({ 
    mountPath: `/api/actuator`,
    targetUrl: apiManagementServerUrl()!,
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiManagementProxy;
};

