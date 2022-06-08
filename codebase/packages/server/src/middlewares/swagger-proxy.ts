import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import express, { Request, Response } from 'express';
import { Logger } from 'pino';

import { createLogger, defaultRequestSerializer, defaultResponseSerializer, defaultErrorSerializer } from '@pma-common/logger';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const swaggerProxyMiddleware = ({ 
  swaggerServerUrl,
  loggerLevel,
}: ProcessConfig) => {

  const swaggerProxyLogger = createLogger({ name: 'camunda' });

  const swaggerProxy = initializeProxyMiddleware({ 
    mountPath: `/swagger-ui`,
    //pathRewrite: { '^/api': '' },
    targetUrl: swaggerServerUrl(),
    logLevel: loggerLevel(), 
    logger: swaggerProxyLogger,
    httpProxyOptions: {
      onProxyReq: swaggerProxyReqHandler(swaggerProxyLogger)
    }
  });

  return swaggerProxy;
};

const swaggerProxyReqHandler = (logger: Logger) => (proxyReq: ClientRequest, req: Request, res: Response) => {
  logger.info('swaggerProxyReqHandler');
}