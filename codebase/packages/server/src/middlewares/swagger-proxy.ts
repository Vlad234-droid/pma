import { ClientRequest } from 'http';
import { ServerOptions } from 'http-proxy';
import fetch from 'node-fetch';

import { Request, Response, Router } from 'express';

import { createLogger, Logger } from '@pma-common/logger';
import { emptyIfRoot } from '@pma-connectors/onelogin';

import { ProcessConfig } from '../config';
import { extractAuthToken, initializeProxyMiddleware } from './proxy';


export const swaggerProxyMiddleware = (processConfig: ProcessConfig) => { 
  
  const { buildEnvironment, applicationContextPath, applicationOrigin, swaggerServerUrl, loggerLevel }= processConfig;

  if (swaggerServerUrl() === undefined) {
    return [];
  }
 
  const swaggerProxyLogger = createLogger({ name: 'swagger' });
  const appRouter = Router();

  //
  //
  //
  appRouter.get([ '/swagger-ui', '/swagger-ui.html' ], (req, res) => {
    res.redirect(`${emptyIfRoot(applicationContextPath())}/swagger-ui/index.html`);
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
    const urls = [
      { url: `${emptyIfRoot(applicationContextPath())}/api-docs/pma-api-v1`, name: 'pma-api-v1' },
    ];

    if (processConfig.apiIdentityServerUrl()) {
      urls.push({ url: `${emptyIfRoot(applicationContextPath())}/api-docs/user-management-v1`, name: 'user-management-v1' });
    }
    if (processConfig.apiManagementServerUrl()) {
      urls.push({ url: `${emptyIfRoot(applicationContextPath())}/api-docs/x-actuator`, name: 'x-actuator' });
    }

    const swaggerConfig = {
      configUrl:`${emptyIfRoot(applicationContextPath())}/api-docs/swagger-config`,
      displayRequestDuration:true,
      oauth2RedirectUrl: `${applicationOrigin()}${emptyIfRoot(applicationContextPath())}/swagger-ui/oauth2-redirect.html`,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      urls,
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
  appRouter.get('/api-docs/:component', async (req, res) => {
    
    const fetchApiDoc = async (url: string) => {
      const authToken = extractAuthToken(req, res);
      const response = await fetch(`${swaggerServerUrl()!.origin}${emptyIfRoot(swaggerServerUrl()!.pathname)}${url}`, {
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

    const transformComponenApiDocs = async (suffix: string, prefixToStrip: string = '') => {
      const stripCompPrefix = (comps: Object, prefix = '') => {
        if (prefix === '') return comps;
        let result: Object = {};
        for (let path in comps) {
          if (path && path.startsWith(prefixToStrip)) {
            const newPath = path.substring(prefixToStrip.length) || '/';
            result = Object.assign(result, { [newPath]: comps[path] });
          } else {
            result = Object.assign(result, { [path]: comps[path] });
          }
        }
        return result;
      }

      const apiDoc = await fetchApiDoc(req.originalUrl);
      if (apiDoc) {
        const ajustedApiDoc = {
          ...apiDoc,
          components: {
            ...apiDoc.components,
            securitySchemes: undefined,
          },
          security: undefined,
          servers: [
            { 
              description: `${buildEnvironment().toUpperCase()} server`, 
              url: `${applicationOrigin()}${emptyIfRoot(applicationContextPath())}/${suffix}`
            },
          ],
          paths: stripCompPrefix(apiDoc.paths, prefixToStrip),
        };

        return ajustedApiDoc;
      } else {
        return {};
      }
    }

    const component = req.params.component;
    switch (component) {
      case 'pma-api-v1':
        const apiConfigBuffer = Buffer.from(JSON.stringify(await transformComponenApiDocs('api/pma/v1', '/v1')));
        res.contentType('application/json');
        res.send(apiConfigBuffer);
        break;
      case 'user-management-v1':
        const userManagementConfigBuffer = Buffer.from(JSON.stringify(await transformComponenApiDocs('api/identity/v1', '/v1')));
        res.contentType('application/json');
        res.send(userManagementConfigBuffer);
        break;
      case 'x-actuator':
        const actuatorConfigBuffer = Buffer.from(JSON.stringify(await transformComponenApiDocs('api/actuator', '/actuator')));
        res.contentType('application/json');
        res.send(actuatorConfigBuffer);
        break;
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
    // mountPath: `/`,
    pathRewrite: { 
      '^/swagger-ui': `${emptyIfRoot(swaggerServerUrl()!.pathname)}/swagger-ui`,
      '^/api-docs': `${emptyIfRoot(swaggerServerUrl()!.pathname)}/api-docs`, 
    },
    // pathRewrite: (p) => {
    //   let rewritten = p;
    //   // if (p.startsWith('/swagger-ui')) {
    //   //   rewritten = `${p}`;
    //   // }
    //   // console.log(` !!! SWAGGER PROXY :: ${p} >>> ${rewritten} `);
    //   return rewritten;
    // },
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