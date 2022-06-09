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
  
  const { applicationContextPath,  swaggerServerUrl, loggerLevel }= processConfig;

  const swaggerProxyLogger = createLogger({ name: 'swagger' });
  const appRouter = Router();

  appRouter.get('/', (req, res) => {
    if (req.originalUrl === '/swagger-ui') {
      res.redirect(`${emptyIfRoot(applicationContextPath())}/swagger-ui/index.html`);
    }
  });

  appRouter.use(initializeProxyMiddleware({
    //filter: [ '/swagger-ui.html', '/swagger-ui', '/api-docs' ], 
    filter: (pathname: string, req: Request) => {
      console.log(` !!! SWAGGER_PROXY :: pathname: '${pathname}'`);
      if (pathname == '/swagger-ui.html') return true;
      if (pathname.startsWith('/swagger-ui/')) return true;
      if (pathname.startsWith('/api-docs/')) return true;
      return false;
    },
    mountPath: `/`,
    // pathRewrite: { '^/swagger-ui': '/swagger-ui' },
    pathRewrite: (p) => {
      let rewritten = p;
      // if (p.startsWith('/swagger-ui')) {
      //   rewritten = `${p}`;
      // }
      // console.log(` !!! SWAGGER PROXY :: ${p} >>> ${rewritten} `);
      return rewritten;
    },
    targetUrl: swaggerServerUrl(),
    logLevel: loggerLevel(), 
    logger: swaggerProxyLogger,
    httpProxyOptions: {
      onProxyReq: swaggerProxyReqHandler(swaggerProxyLogger, processConfig)
    }
  }));

  appRouter.use((req, res) => {
    // fallback to return 404 if proxy fails
    res.status(404).send();
  });

  return appRouter;
};

const swaggerProxyReqHandler = (logger: Logger, { applicationContextPath }: ProcessConfig) => (proxyReq: ClientRequest, req: Request, res: Response, options: ServerOptions) => {
  logger.info('swaggerProxyReqHandler');
  if (applicationContextPath() !== '/' && applicationContextPath().startsWith('/')) {
    proxyReq.setHeader('x-forwarded-prefix', applicationContextPath());
  }
}