import { createLogger, 
  defaultRequestSerializer, 
  defaultResponseSerializer, 
  defaultErrorSerializer,
  filterSensitiveData,
  Bindings,
} from '@pma-common/logger'; 

import { LoggerEvent } from './';

const oneloginRequestSerializer = (req: any) => {
  let result = defaultRequestSerializer(req);
  return result;
}

const oneloginResponseSerializer = (res: any) => {
  let result = defaultResponseSerializer(res);

  if (Object.prototype.hasOwnProperty.call(res, 'openIdAuthData')) {
    result = { 
      ...result, 
      openIdAuthData: filterSensitiveData(res['openIdAuthData']) 
    };
  }

  return result;
}

export const pinoLogger = (options?: Bindings) => {
  const logger = createLogger({
    ...options,
    serializers: {
      res: oneloginResponseSerializer,
      req: oneloginRequestSerializer,
      err: defaultErrorSerializer,
    },
  });

  return (event: LoggerEvent) => {
    const { severity, payload, flow, context, error } = event;
    switch (severity) {
      case 'error': {
        logger.error(
          { flow, res: context.res, req: context.req, error: payload?.error || error || undefined },
          `Onelogin plugin error`,
        );
        break;
      }
      case 'warning': {
        if (payload?.error || error) {
          logger.warn(
            { flow, res: context.res, req: context.req, error: payload?.error || error },
            payload?.message ? `${payload?.message}` : `Onelogin plugin warning`,
          );
        } else {
          logger.warn(
            { flow, req: context.req, res: context.res },
            payload?.message ? `${payload?.message}` : `Onelogin plugin warning`,
          );
        }
        break;
      }
      case 'info': {
        logger.info({ flow, res: context.res, req: context.req }, `${payload?.message}`);
        break;
      }
      case 'debug': {
        logger.debug({ flow, res: context.res, req: context.req }, `${payload?.message}`);
        break;
      }
      case 'trace': {
        logger.trace({ flow, res: context.res, req: context.req }, `${payload?.message}`);
        break;
      }
    }
  };
};

// export const defaultPinoLogger = pinoLogger({ name: 'middleware.onelogin' });
