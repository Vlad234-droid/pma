import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { ServerOptions } from 'http-proxy';

import { Request, Response, Router } from 'express';
import { Logger } from 'pino';
import { is as mimeTypeIs } from 'type-is';

import { createLogger } from '@pma-common/logger';
import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';


export const swaggerProxyMiddleware = (processConfig: ProcessConfig) => { 
  
  const { applicationContextPath, swaggerServerUrl, loggerLevel }= processConfig;

  const swaggerProxyLogger = createLogger({ name: 'swagger' });

  const swaggerProxy = initializeProxyMiddleware({ 
    mountPath: `/swagger-ui`,
    // pathRewrite: { '^/swagger-ui': '/swagger-ui' },
    pathRewrite: (p) => {
      let rewritten = p;
      if (p.startsWith('/swagger-ui')) {
        rewritten = `${p}`;
      }
      console.log(` !!! SWAGGER PROXY :: ${p} >>> ${rewritten} `);
      return rewritten;
    },
    targetUrl: swaggerServerUrl(),
    logLevel: loggerLevel(), 
    logger: swaggerProxyLogger,
    httpProxyOptions: {
      onProxyReq: swaggerProxyReqHandler(swaggerProxyLogger)
    }
  });

  return swaggerProxy;
};

const swaggerProxyReqHandler = (logger: Logger) => (proxyReq: ClientRequest, req: Request, res: Response, options: ServerOptions) => {
  logger.info('swaggerProxyReqHandler');
}