import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const apiProxyMiddleware = ({ apiServerUrl, loggerLevel, useRequireIdentityToken }: ProcessConfig) => {
  const apiProxy = initializeProxyMiddleware({
    mountPath: `/api/yc/v1`,
    targetUrl: apiServerUrl(),
    logLevel: loggerLevel(),
    requireIdentityToken: useRequireIdentityToken(),
    logger: 'api',
  });

  return apiProxy;
};

export const apiIdentityProxyMiddleware = ({
  apiIdentityServerUrl,
  loggerLevel,
  useRequireIdentityToken,
}: ProcessConfig) => {
  if (apiIdentityServerUrl() === undefined) {
    return [];
  }

  const apiIdentityProxy = initializeProxyMiddleware({
    mountPath: `/api/iam/v1`,
    targetUrl: apiIdentityServerUrl()!,
    logLevel: loggerLevel(),
    requireIdentityToken: useRequireIdentityToken(),
    logger: 'api',
  });

  return apiIdentityProxy;
};

export const apiManagementProxyMiddleware = ({
  apiManagementServerUrl,
  loggerLevel,
  useRequireIdentityToken,
}: ProcessConfig) => {
  if (apiManagementServerUrl() === undefined) {
    return [];
  }

  const apiManagementProxy = initializeProxyMiddleware({
    mountPath: `/api/actuator`,
    targetUrl: apiManagementServerUrl()!,
    logLevel: loggerLevel(),
    requireIdentityToken: useRequireIdentityToken(),
    logger: 'api',
  });

  return apiManagementProxy;
};
