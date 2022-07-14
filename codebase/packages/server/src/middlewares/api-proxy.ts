import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const apiProxyMiddleware = ({ 
  apiServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  const apiProxy = initializeProxyMiddleware({ 
    mountPath: `/api/yoc/v1`,
    targetUrl: apiServerUrl(),
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiProxy;
};

export const apiIdentityProxyMiddleware = ({ 
  apiIdentityServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  if (apiIdentityServerUrl() === undefined) {
    return [];
  }

  const apiIdentityProxy = initializeProxyMiddleware({ 
    mountPath: `/api/identity/v1`,
    targetUrl: apiIdentityServerUrl()!,
    logLevel: loggerLevel(), 
    logger: 'api',
  });

  return apiIdentityProxy;
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

