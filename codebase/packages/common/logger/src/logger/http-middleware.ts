import { Level } from 'pino';
import pinoHttp from 'pino-http';

import { getLogger } from './application-logger';
import { defaultRequestSerializer, defaultResponseSerializer, defaultErrorSerializer} from './serializers';

export const getHttpLoggerMiddleware = (name?: string): pinoHttp.HttpLogger => {
   const logger = getLogger();
   const loggerName = logger?.name;

   const httpName = loggerName ? `${loggerName}.${name || 'http'}` : name || 'http';

   const logLevel = (res: { statusCode: number }): Level => {
      return res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'debug';
   }

   return pinoHttp({
      name: httpName,
      logger: logger,
      customLogLevel: logLevel,
      serializers: {
         req: defaultRequestSerializer,
         res: defaultResponseSerializer,
         responseTime: (value) => `${value} ms`,
         err: defaultErrorSerializer,
      }
   });
};
