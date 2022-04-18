import { Response } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import { getIdentityData } from '@pma-connectors/onelogin';
import yn from 'yn';

import { isDEV, isLocal, ProcessConfig } from "../config";

export const apiProxyMiddleware = (config: ProcessConfig) => {

  const proxyMiddlewareOptions: Options = {
    target: config.proxyApiServerUrl(),
    changeOrigin: true,
    autoRewrite: true,
    pathRewrite: { ['^/api']: '' },
    logLevel: 'debug',
  };

  proxyMiddlewareOptions.onError = (e) => {
    console.log('e', e);
  };
  
  if (!isDEV(config.buildEnvironment()) && config.useOneLogin()) {
    proxyMiddlewareOptions.onProxyReq = function (proxyReq, req, res) {
      const identityData = getIdentityData(res as Response);

      console.log('[HPM] Clear all cookies');
      proxyReq.setHeader('Cookie', '');

      proxyReq.setHeader('Authorization', `Bearer ${identityData?.access_token}`);

      if (isLocal(config.buildEnvironment()) || yn(process.env.LOGGER_LOG_AUTH_TOKEN, { default: false })) {
        console.log('[HPM] Authorization: bearer-jwt-identity', identityData?.access_token);
      }
    };
  }

  return createProxyMiddleware(
    ['/api/**', '!/api/v1/camunda/**', '!/api/colleague-inbox/**', '!/api/manager-bff/**'],
    proxyMiddlewareOptions,
  );

}