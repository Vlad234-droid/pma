import { IncomingMessage, ServerResponse } from 'http';

import { Request, Response, Router } from 'express';
import { Logger } from 'pino';
import { is as mimeTypeIs } from 'type-is';

import { createLogger } from '@pma-common/logger';
import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';


export const camundaProxyMiddleware = (processConfig: ProcessConfig) => {

  const { camundaServerUrl, applicationContextPath, loggerLevel } = processConfig;
  const camundaProxyLogger = createLogger({ name: 'camunda' });
  const appRouter = Router();

  appRouter.get('/', (req, res) => {
    if (req.originalUrl === '/camunda') {
      res.redirect(`${emptyIfRoot(applicationContextPath())}/camunda/app/`);
    }
  });

  appRouter.use(initializeProxyMiddleware({
    // filter: [ '/api/**', '!/api/colleague-inbox/**' ],
    mountPath: '/camunda',
    // pathRewrite: {
    //   [`^/camunda`]: `${emptyIfRoot(applicationContextPath())}/camunda`,
    //   [`^${emptyIfRoot(applicationContextPath())}/camunda`]: `${emptyIfRoot(applicationContextPath())}/camunda`,
    // },
    // pathRewrite: (p) => {
    //   let rewritten = p;
    //   if (p.startsWith('/camunda')) {
    //     rewritten = `${emptyIfRoot(applicationContextPath())}${p}`;
    //   }
    //   console.log(` !!! CAMUNDA PROXY :: ${p} >>> ${rewritten} `);
    //   return rewritten;
    // },
    targetUrl: camundaServerUrl(),
    clearCookies: false,
    logLevel: loggerLevel(),
    logger: camundaProxyLogger,
    httpProxyOptions: {
      cookieDomainRewrite: '',
      // onProxyRes: camundaProxyResHandler(camundaProxyLogger, processConfig),
    }
  }));

  appRouter.use((req, res) => {
    // fallback to return 404 if proxy fails
    res.status(404).send();
  });

  return appRouter;
};

/*
const camundaProxyResHandler = (logger: Logger, { applicationContextPath }: ProcessConfig) =>
    (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => {

  if (proxyRes.statusCode && [301, 302, 307, 308].includes(proxyRes.statusCode)) {
    console.log(`proxyRes.location: ${proxyRes.headers.location}`);
    let redirectLocation = proxyRes.headers.location as string;
    if (redirectLocation && applicationContextPath() !== '/' && redirectLocation.startsWith(applicationContextPath())) {
      redirectLocation = redirectLocation.slice(applicationContextPath().length);

    }

    proxyRes.headers.location = redirectLocation;

    // application/javascript
    // application/html
    // application/json
    // text/html
    // text/css
    // text/plain
  } else if (proxyRes.headers['content-type'] && mimeTypeIs(proxyRes.headers['content-type'], ['text', 'html', 'css', 'json', 'javascript'])) {
    console.log(`content-type = ${proxyRes.headers['content-type']}`);
  } else {
    // just copy proxy response to res
  }
};
*/