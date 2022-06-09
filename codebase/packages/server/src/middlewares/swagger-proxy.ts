import { ClientRequest, IncomingMessage, ServerResponse } from 'http';
import { ServerOptions } from 'http-proxy';
import fetch from 'node-fetch';

import { Request, response, Response, Router } from 'express';
import { Logger } from 'pino';
import { is as mimeTypeIs } from 'type-is';

import { createLogger } from '@pma-common/logger';
import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { extractAuthToken, initializeProxyMiddleware } from './proxy';


export const swaggerProxyMiddleware = (processConfig: ProcessConfig) => { 
  
  const { applicationContextPath, applicationUrl, swaggerServerUrl, loggerLevel }= processConfig;

  if (swaggerServerUrl() === undefined) {
    return [];
  }
 
  const swaggerProxyLogger = createLogger({ name: 'swagger' });
  const appRouter = Router();

  //
  //
  //
  appRouter.get('/swagger-ui', (req, res) => {
    if (req.originalUrl === '/swagger-ui' || req.originalUrl === '/swagger-ui.html') {
      res.redirect(`${emptyIfRoot(applicationContextPath())}/swagger-ui/index.html`);
    }
  });

  //
  //
  //
  appRouter.get('/swagger-ui/swagger-initializer.js', (req, res) => {
    const swaggerInitJsBuffer = Buffer.from(`
      window.onload = function() {
        // the following lines will be replaced by docker/configurator, when it runs in a docker-container
        window.ui = SwaggerUIBundle({
          url: '',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          plugins: [
            SwaggerUIBundle.plugins.DownloadUrl
          ],
          layout: 'StandaloneLayout',
          configUrl: '${emptyIfRoot(applicationContextPath())}/api-docs/swagger-config',
          displayRequestDuration: true,
          operationsSorter: 'alpha',
          tagsSorter: 'alpha',
          'urls.primaryName': 'pma-api-v1',
          validatorUrl: ''
        });
      };
    `);

    res.contentType('application/javascript');
    res.send(swaggerInitJsBuffer);
  });

  //
  //
  //
  appRouter.get('/api-docs/swagger-config', (req, res) => {
    const swaggerConfig = {
      configUrl:`${emptyIfRoot(applicationContextPath())}/api-docs/swagger-config`,
      displayRequestDuration:true,
      oauth2RedirectUrl: `${applicationUrl().toString()}/swagger-ui/oauth2-redirect.html`,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      urls:[
        { url: `${emptyIfRoot(applicationContextPath())}/api-docs/pma-api-v1`, name: 'pma-api-v1' },
        { url: `${emptyIfRoot(applicationContextPath())}/api-docs/user-management-v1`, name: 'user-management-v1' },
        { url: `${emptyIfRoot(applicationContextPath())}/api-docs/x-actuator`, name: 'x-actuator' },
      ],
      'urls.primaryName': 'pma-api-v1',
      validatorUrl: '',
    };

    const swaggerConfigBuffer = Buffer.from(JSON.stringify(swaggerConfig));

    res.contentType('application/json');
    res.send(swaggerConfigBuffer);
  });

  //
  //
  //
  appRouter.get('/api-docs', async (req, res) => {
    
    const fetchApiDoc = async (url: string) => {
      const authToken = extractAuthToken(req, res);
      const response = await fetch(`${swaggerServerUrl()!.host}${url}`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${authToken}`,
        }
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        console.log(` !!! SWAGGER_PROXY :: Invalid response from API-DOCS, piping`);
        res.statusCode = response.status;
        response.headers.forEach((value, name) => {
          res.setHeader(name, value);
        })
        response.body.pipe(res);
        return undefined;
      }
    }
    
    const apiDoc = await fetchApiDoc(req.originalUrl);
    if (apiDoc) {
      const ajustedApiDoc = {
        ...apiDoc,
        security: undefined,
        servers: [
          { description: '', url: `${applicationUrl().toString()}/api`}
        ],
      };

      const swaggerConfigBuffer = Buffer.from(JSON.stringify(ajustedApiDoc));

      res.contentType('application/json');
      res.send(swaggerConfigBuffer);
    }
  });

  //
  //
  //
  appRouter.use(['/api-docs', '/swagger-ui'], initializeProxyMiddleware({
    filter: [ '/swagger-ui', '/api-docs' ], 
    // filter: (pathname: string, req: Request) => {
    //   console.log(` !!! SWAGGER_PROXY :: pathname: '${pathname}'`);
    //   if (pathname == '/swagger-ui.html') return true;
    //   if (pathname.startsWith('/swagger-ui/')) return true;
    //   if (pathname.startsWith('/api-docs/')) return true;
    //   return false;
    // },
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
    targetUrl: swaggerServerUrl()!,
    logLevel: loggerLevel(), 
    logger: swaggerProxyLogger,
    httpProxyOptions: {
      onProxyReq: swaggerProxyReqHandler(swaggerProxyLogger, processConfig)
    }
  }));

  //
  //
  //
  appRouter.use(['/api-docs', '/swagger-ui'], (req, res) => {
    // fallback to return 404 if proxy fails
    res.status(404).send();
  });

  return appRouter;
};

const swaggerProxyReqHandler = (logger: Logger, { applicationContextPath }: ProcessConfig) => 
    (proxyReq: ClientRequest, req: Request, res: Response, options: ServerOptions) => {

  logger.info('swaggerProxyReqHandler');
  if (applicationContextPath() !== '/' && applicationContextPath().startsWith('/')) {
    proxyReq.setHeader('x-forwarded-prefix', applicationContextPath());
  }
}