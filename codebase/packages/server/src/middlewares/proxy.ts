import express from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import { Logger } from 'pino';
import { createLogger, defaultRequestSerializer, defaultResponseSerializer, defaultErrorSerializer } from '@pma-common/logger';
import { emptyIfRoot, getIdentityData } from '@pma-connectors/onelogin';

import { Url } from 'url';
import { ClientRequest, IncomingMessage, ServerResponse } from 'http';

export type ProxyMiddlewareOptions = {
  filter?: Filter;
  mountPath: string;
  targetUrl: URL;
  pathRewrite?: PathRewriteRules;
  requireIdentityToken?: boolean;
  clearCookies?: boolean;
  logger?: Logger | string;
  logLevel?: keyof typeof NodeJS.LogLevel;
  logAuthToken?: boolean;
  overridenOptions?: Options;
}

export type PathRewriteRules = { [regexp: string]: string; } 
  | ((path: string, req: express.Request) => string) 
  | ((path: string, req: express.Request) => Promise<string>);

/**
 * 
 * @param options 
 * @returns 
 */
export const initializeProxyMiddleware = ({ 
  filter,
  mountPath, 
  targetUrl, 
  pathRewrite,
  requireIdentityToken = true,
  clearCookies = true,
  logger = createLogger({ name: 'proxy' }), 
  logLevel = 'info', 
  logAuthToken = false,
  overridenOptions = undefined,
}: ProxyMiddlewareOptions): RequestHandler => {

  const apiLogger = typeof logger === 'string' ? createLogger({ name: logger }) : logger;

  const target = `${targetUrl.protocol}//${targetUrl.host}`;

  const timeout = 15 * 60 * 1000; // 15 mins
  const proxyTimeout = 30 * 1000; // 30 sec
  
  const proxyMiddlewareOptions: Options = {
    target: target,
    changeOrigin: true,
    autoRewrite: true,
    pathRewrite: pathRewrite || { [`^${mountPath}`]: emptyIfRoot(targetUrl.pathname) },
    logLevel: logLevel,
    proxyTimeout: proxyTimeout,
    timeout: timeout,
    logProvider: pinoLogProvider(apiLogger),
    // onError: onProxyError(apiLogger),
    // onProxyRes: onProxyRes(apiLogger),
    ...overridenOptions,
  };

  proxyMiddlewareOptions.onProxyReq = async (
      proxyReq: ClientRequest, 
      //req: IncomingMessage, 
      req: express.Request,
      res: ServerResponse) => {

    const identityTokens = getIdentityData(res as express.Response);
    const authToken = identityTokens?.access_token;

    if (requireIdentityToken) {
      if (authToken === null || authToken === undefined) {
        proxyReq.destroy(new Error("apiProxy: Missing access_token"));
        return;
      }
    }

    clearCookies && proxyReq.removeHeader('Cookie');
    authToken && proxyReq.setHeader('Authorization', `Bearer ${authToken}`);

    fixBody(proxyReq, req);

    const originalUrl = req['originalUrl'];
    if (logAuthToken) {
      apiLogger.info({ 
        req: defaultRequestSerializer(req),
        // proxyReq: defaultRequestSerializer(proxyReq),
        identityToken: authToken, 
      }, `Proxying API request ${originalUrl} to ${target}`);
    } else {
      apiLogger.trace({ 
        req: defaultRequestSerializer(req),
        // proxyReq: defaultRequestSerializer(proxyReq),
      }, `Proxying API request ${originalUrl} to ${target}`);
    };
  }

  return filter 
    ? createProxyMiddleware(filter, proxyMiddlewareOptions) 
    : createProxyMiddleware(mountPath, proxyMiddlewareOptions);
}

/**
 * http-proxy-middleware is not compatible with bodyparser and must appear before it without this fix.
 * @see see https://github.com/chimurai/http-proxy-middleware/issues/320
 * @param proxyReq
 * @param req
 */
 function fixBody(proxyReq: ClientRequest, req: express.Request): void {
  if (!req.body || !Object.keys(req.body).length) {
    return;
  }
  const contentType = proxyReq.getHeader('Content-Type') as string;
  if (contentType.includes('application/json')) {
    const body = JSON.stringify(req.body);
    writeBody(proxyReq, body);
  }
  if (contentType === 'application/x-www-form-urlencoded') {
    const body = new URLSearchParams(req.body as any).toString();
    writeBody(proxyReq, body);
  }
}

function writeBody(proxyReq: ClientRequest, bodyData: string) {
  proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
  proxyReq.write(bodyData);
}

const onProxyRes = (logger: Logger) => (proxyRes: IncomingMessage, req: IncomingMessage, res: ServerResponse) => {
  logger.trace({ 
    req: defaultRequestSerializer(req),
    res: defaultResponseSerializer(res), 
    proxyRes: defaultResponseSerializer(proxyRes), 
  }, `Proxy request completed. Got response for ${req.url}, status: ${proxyRes.statusCode}`);
};

const onProxyError = (logger: Logger) => (err: Error, req: IncomingMessage, res: ServerResponse, target?: string | Partial<Url>) => {
  const originalUrl = req['originalUrl'];
  const targetUrl = target && typeof target['format'] === 'function' ? target['format']() : target;

  logger.error({ 
    target, 
    req: defaultRequestSerializer(req), 
    res: defaultResponseSerializer(res), 
    err: defaultErrorSerializer(err),
  }, `Error proxying request from ${originalUrl} to ${targetUrl}`);

  throw err;
};

const pinoLogProvider = (pinoLogger: Logger) => () => {
  const prexifToRemove = '[HPM] ';
  const adjustMsg = (m: string) => m.startsWith(prexifToRemove) ? m.slice(prexifToRemove.length) : m;

  const pinoProvider = {
    log: (...args: any[]) => pinoLogger.info(args[0]),
    debug: (msg: string) => pinoLogger.debug(adjustMsg(msg)),
    info: (msg: string) => pinoLogger.info(adjustMsg(msg)),
    warn: (msg: string) => pinoLogger.warn(adjustMsg(msg)),
    error: (msg: string) => pinoLogger.error(adjustMsg(msg)),
  };

  return pinoProvider;
};
