import { ClientRequest, IncomingMessage } from 'http';
import { Url } from 'url';

import express, { Request, Response } from 'express';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';
import { ServerOptions } from 'http-proxy';
import { Logger } from 'pino';
import { is as mimeTypeIs } from 'type-is';

import {
  createLogger,
  defaultRequestSerializer,
  defaultResponseSerializer,
  defaultErrorSerializer,
} from '@pma-common/logger';
import {
  emptyIfRoot,
  getIdentityData,
  getTraceId,
  TRACE_ID_HEADER,
  TESCO_TRACE_ID_HEADER,
} from '@pma-connectors/onelogin';
import { OnErrorCallback, OnProxyReqCallback, OnProxyResCallback } from 'http-proxy-middleware/dist/types';
import { markApiCall } from '@energon/splunk-logger';

export type ProxyMiddlewareOptions = {
  filter?: Filter;
  mountPath?: string;
  targetUrl: URL;
  pathRewrite?: PathRewriteRules;
  requireIdentityToken?: boolean;
  clearCookies?: boolean;
  logger?: Logger | string;
  logLevel?: keyof typeof NodeJS.LogLevel;
  logAuthToken?: boolean;
  httpProxyOptions?: Options;
};

export type PathRewriteRules =
  | { [regexp: string]: string }
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
  httpProxyOptions = undefined,
}: ProxyMiddlewareOptions): RequestHandler => {
  const proxyLogger = typeof logger === 'string' ? createLogger({ name: logger }) : logger;

  const target = `${targetUrl.protocol}//${targetUrl.host}`;

  const httpProxyErrorHandler = httpProxyOptions && httpProxyOptions.onError;
  const httpProxyReqHandler = httpProxyOptions && httpProxyOptions.onProxyReq;
  const httpProxyResHandler = httpProxyOptions && httpProxyOptions.onProxyRes;

  const allignedProxyOptions = { ...httpProxyOptions };
  httpProxyReqHandler && delete allignedProxyOptions.onProxyReq;
  httpProxyResHandler && delete allignedProxyOptions.onProxyRes;
  httpProxyErrorHandler && delete allignedProxyOptions.onError;

  const timeout = 15 * 60 * 1000; // 15 mins
  const proxyTimeout = 30 * 1000; // 30 sec
  const proxyMiddlewareOptions: Options = {
    target: target,
    changeOrigin: true,
    autoRewrite: true,
    pathRewrite: pathRewrite || (mountPath ? { [`^${mountPath}`]: emptyIfRoot(targetUrl.pathname) } : undefined),
    logLevel: logLevel,
    proxyTimeout: proxyTimeout,
    timeout: timeout,
    logProvider: pinoLogProvider(proxyLogger),
    onProxyReq: proxyReqHandler(proxyLogger, httpProxyReqHandler, {
      requireIdentityToken,
      clearCookies,
      logAuthToken,
    }),
    onProxyRes: proxyResHandler(proxyLogger, httpProxyResHandler),
    onError: proxyErrorHandler(proxyLogger, httpProxyErrorHandler),
    ...allignedProxyOptions,
  };

  return filter ? createProxyMiddleware(filter, proxyMiddlewareOptions) : createProxyMiddleware(proxyMiddlewareOptions);
};

export const extractAuthToken = (req: Request, res: Response) => {
  let authToken: string | undefined;

  const authHeader = req.header('authorization');

  if (authHeader && typeof authHeader === 'string') {
    const bearerPrefix = 'BEARER ';
    if (typeof authHeader === 'string' && authHeader.slice(0, bearerPrefix.length).toUpperCase() === bearerPrefix) {
      authToken = authHeader.slice(7);
    }
  } else {
    const identityTokens = getIdentityData(res);
    authToken = identityTokens?.access_token;
  }

  return authToken;
};

const proxyReqHandler =
  (
    logger: Logger,
    customHandler: OnProxyReqCallback | undefined,
    options: Pick<ProxyMiddlewareOptions, 'requireIdentityToken' | 'clearCookies' | 'logAuthToken'>,
  ) =>
  async (proxyReq: ClientRequest, req: Request, res: Response, serverOptions: ServerOptions) => {
    const { requireIdentityToken, clearCookies, logAuthToken } = options;

    const authToken = extractAuthToken(req, res);

    if (authToken) {
      proxyReq.setHeader('Authorization', `Bearer ${authToken}`);
    } else if (requireIdentityToken) {
      proxyReq.destroy(new Error('proxy: Missing access_token'));
      return;
    }

    const traceId = getTraceId(req);
    proxyReq.setHeader(TRACE_ID_HEADER, traceId);
    proxyReq.setHeader(TESCO_TRACE_ID_HEADER, traceId);

    res?.logs &&
      (res.logs.markApiCallEnd = markApiCall(res)({
        traceId,
        tescoTraceId: traceId,
        requestUrl: req.url,
        requestBody: req.body,
        params: req.params,
      }));

    clearCookies && proxyReq.removeHeader('Cookie');

    // fix request body, if body-parser involved
    fixRequestBody(proxyReq, req);

    try {
      if (typeof customHandler === 'function') {
        customHandler(proxyReq, req, res, serverOptions);
      }
    } catch (err) {
      proxyReq.destroy(err as Error);
      return;
    }

    const originalUrl = req['originalUrl'];

    if (logAuthToken) {
      logger.info(
        {
          req: defaultRequestSerializer(req),
          proxyReq: defaultRequestSerializer(proxyReq),
          identityToken: authToken,
        },
        `Proxying API request ${originalUrl} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`,
      );
    } else {
      logger.info(
        {
          req: defaultRequestSerializer(req),
          proxyReq: defaultRequestSerializer(proxyReq),
        },
        `Proxying API request ${originalUrl} to ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`,
      );
    }
  };

const proxyResHandler =
  (logger: Logger, customHandler: OnProxyResCallback | undefined) =>
  (proxyRes: IncomingMessage, req: Request, res: Response) => {
    res?.logs?.markApiCallEnd && res.logs.markApiCallEnd({ statusCode: proxyRes.statusCode });
    logger.debug(
      {
        req: defaultRequestSerializer(req),
        res: defaultResponseSerializer(res),
        proxyRes: defaultResponseSerializer(proxyRes),
      },
      `Proxy request completed. Got response for ${req.url}, status: ${proxyRes.statusCode}`,
    );

    if (typeof customHandler === 'function') {
      customHandler(proxyRes, req, res);
    }
  };

const proxyErrorHandler =
  (logger: Logger, customHandler: OnErrorCallback | undefined) =>
  (err: Error, req: Request, res: Response, target?: string | Partial<Url>) => {
    res?.logs?.markApiCallEnd && res.logs.markApiCallEnd({ statusCode: 500, error: err });
    if (typeof customHandler === 'function') {
      customHandler(err, req, res, target);
    } else if (err.message === 'proxy: Missing access_token') {
      res.status(401);
      res.send('proxy: Missing access_token');
    } else {
      const originalUrl = req['originalUrl'];
      const targetUrl = target && typeof target['format'] === 'function' ? target['format']() : target;

      logger.error(
        {
          target,
          req: defaultRequestSerializer(req),
          res: defaultResponseSerializer(res),
          err: defaultErrorSerializer(err),
        },
        `Error proxying request from ${originalUrl} to ${targetUrl}`,
      );
    }
  };

/**
 * http-proxy-middleware is not compatible with bodyparser and must appear before it without this fix.
 * @see see https://github.com/chimurai/http-proxy-middleware/issues/320
 * @param proxyReq
 * @param req
 */
const fixRequestBody = (proxyReq: ClientRequest, req: express.Request): boolean => {
  if (!req.body || !Object.keys(req.body).length) {
    return true;
  }

  const writeBody = (bodyData: string) => {
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  };

  const contentType = proxyReq.getHeader('Content-Type') as string;
  switch (mimeTypeIs(contentType, ['json', 'urlencoded'])) {
    case 'json':
      writeBody(JSON.stringify(req.body));
      return true;
    case 'urlencoded':
      writeBody(new URLSearchParams(req.body as any).toString());
      return true;
    default:
      proxyReq.destroy(new Error(`apiProxy: Unsupported content-type: ${contentType}`));
      return false;
  }
};

const pinoLogProvider = (pinoLogger: Logger) => () => {
  const prexifToRemove = '[HPM] ';
  const adjustMsg = (m: string) => (m.startsWith(prexifToRemove) ? m.slice(prexifToRemove.length) : m);

  const pinoProvider = {
    log: (...args: any[]) => pinoLogger.info(args[0]),
    debug: (msg: string) => pinoLogger.debug(adjustMsg(msg)),
    info: (msg: string) => pinoLogger.info(adjustMsg(msg)),
    warn: (msg: string) => pinoLogger.warn(adjustMsg(msg)),
    error: (msg: string) => pinoLogger.error(adjustMsg(msg)),
  };

  return pinoProvider;
};
