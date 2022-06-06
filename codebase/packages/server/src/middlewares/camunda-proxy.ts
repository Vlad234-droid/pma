import { Router } from "express"

import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { initializeProxyMiddleware } from './proxy';
import path from "path";

export const camundaProxyMiddleware = ({
  camundaServerUrl,
  applicationContextPath,
  loggerLevel,
}: ProcessConfig) => {

  const appRouter = Router();

  appRouter.get('/', (req, res) => {
    if (req.originalUrl === '/camunda') {
      res.redirect('/camunda/app/');
    }
  });

  appRouter.use(initializeProxyMiddleware({ 
    // filter: [ '/api/**', '!/api/colleague-inbox/**' ],
    mountPath: path.join(applicationContextPath(), 'camunda'),
    targetUrl: camundaServerUrl(),
    clearCookies: false,
    logLevel: loggerLevel(), 
    logger: 'camunda',
    overridenOptions: {
      cookieDomainRewrite: '',
    }
  }));

  appRouter.use((req, res) => {
    // fallback to return 404 if proxy fails
    res.status(404).send();
  });

  return appRouter;
};
