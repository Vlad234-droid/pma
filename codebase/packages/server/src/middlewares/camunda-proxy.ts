import { Router } from 'express';

import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';

export const camundaProxyMiddleware = ({ camundaServerUrl, applicationContextPath, loggerLevel }: ProcessConfig) => {
  const appRouter = Router();

  appRouter.get('/', (req, res) => {
    if (req.originalUrl === '/camunda') {
      res.redirect(`${emptyIfRoot(applicationContextPath())}/camunda/app/`);
    }
  });

  appRouter.use(
    initializeProxyMiddleware({
      // filter: [ '/api/**', '!/api/colleague-inbox/**' ],
      mountPath: '/camunda',
      // pathRewrite: {
      //   [`^/camunda`]: `${emptyIfRoot(applicationContextPath())}/camunda`,
      //   [`^${emptyIfRoot(applicationContextPath())}/camunda`]: `${emptyIfRoot(applicationContextPath())}/camunda`,
      // },
      pathRewrite: (p) => {
        let rewritten = p;
        if (p.startsWith('/camunda')) {
          rewritten = `${emptyIfRoot(applicationContextPath())}${p}`;
        }
        console.log(` !!! CAMUNDA PROXY :: ${p} >>> ${rewritten} `);
        return rewritten;
      },
      targetUrl: camundaServerUrl(),
      clearCookies: false,
      logLevel: loggerLevel(),
      logger: 'camunda',
      overridenOptions: {
        cookieDomainRewrite: '',
      },
    }),
  );

  appRouter.use((req, res) => {
    // fallback to return 404 if proxy fails
    res.status(404).send();
  });

  return appRouter;
};
