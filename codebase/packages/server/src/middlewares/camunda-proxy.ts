import { Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { getIdentityData, emptyIfRoot } from '@pma-connectors/onelogin';
import yn from 'yn';

import { isDEV, isLocal, ProcessConfig } from '../config';

export const camundaProxyMiddleware = (config: ProcessConfig) => {
  const proxyMiddlewareOptions: Options = {
    target: config.proxyApiServerUrl(),
    changeOrigin: true,
    autoRewrite: true,
    pathRewrite: { ['^/camunda']: `${emptyIfRoot(config.applicationPublicUrl())}/camunda` },
    cookieDomainRewrite: "", // remove domain from cookies, if any
    logLevel: 'debug',
  };

  proxyMiddlewareOptions.onError = (e) => {
    console.log('e', e);
  };

  if (!isDEV(config.buildEnvironment()) && config.useOneLogin()) {
    proxyMiddlewareOptions.onProxyReq = function (proxyReq, req, res) {
      const identityData = getIdentityData(res as Response);

      console.log('[HPM] Clear all cookies');
      //proxyReq.setHeader('Cookie', '');

      console.log(` => LOGGER_LOG_AUTH_TOKEN = ${process.env.LOGGER_LOG_AUTH_TOKEN}`);
      console.log(` => BUILD_ENV = ${config.buildEnvironment()}`);
      console.log(identityData);

      proxyReq.setHeader('Authorization', `Bearer ${identityData?.access_token}`);

      if (isLocal(config.buildEnvironment()) || yn(process.env.LOGGER_LOG_AUTH_TOKEN, { default: false })) {
        console.log('[HPM] Authorization: bearer-jwt-identity', identityData?.access_token);
      }
    };
  }

  return createProxyMiddleware(proxyMiddlewareOptions);
};
