import pino, { SerializedError, SerializedRequest, SerializedResponse } from 'pino';
import camelcase from 'camelcase';
import { parse as parseCookies } from 'cookie';

type CustomSerializedRequest = Partial<SerializedRequest> & Record<string, any>;

type CustomSerializedResponse = Partial<SerializedResponse> & Record<string, any>;

type CustomSerializedError = Record<string, any>;

/**
 * Default request serializer
 * @param req 
 * @returns 
 */
export const defaultRequestSerializer = (req: any): CustomSerializedRequest => {
  let result: CustomSerializedRequest = {
    id: req.id,
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
    remoteAddress: req.remoteAddress,
    remotePort: req.remotePort,
  };
 
  let headers = { ...req.headers };

  if (Object.prototype.hasOwnProperty.call(headers, 'cookie')) {
    if (req.cookies || req.signedCookies) {
      result = {
        ...result,
        cookies: filterSensitiveData(req.cookies),
        signedCookies: filterSensitiveData(req.signedCookies),
      };
    } else {
      const cookies = parseCookies(headers['cookie']);
      result = {
        ...result,
        cookies: filterSensitiveData(cookies),
      };
    }
    delete headers['cookie'];
  }

  headers = filterSensitiveData(headers);

  return { ...result, headers };
}
 
/**
 * Default response serializer
 * @param res 
 * @returns 
 */
export const defaultResponseSerializer = (res: any): CustomSerializedResponse  => {
  let result = {
      statusCode: res.statusCode,
  };

  let headers = { ...res.headers };
  for (const header in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, header)) {
      if (header.toLowerCase() === 'content-type' 
          || header.toLowerCase() === 'content-length') {
        result = { ...result, [camelcase(header)]: headers[header] };
        delete headers[header];
      }
      if (header.toLowerCase() === 'location') {
        result = { ...result, [camelcase(header)]: decodeURIComponent(headers[header]) };
        delete headers[header];
      }
      if (header.toLowerCase() === 'set-cookie' && Array.isArray(headers[header])) {
        const setCookiesObj = Object.fromEntries((headers[header] as Array<string>).map(v => [ v.substring(0, v.indexOf('=')), v ]));
        result = { ...result, [camelcase(header)]: filterSensitiveData(setCookiesObj) };
        delete headers[header];
      }
    }
  }

  headers = filterSensitiveData(headers);
 
  return { ...result, headers: headers };
}
 
/**
 * Default error serializer
 * @param err 
 * @returns 
 */
export const defaultErrorSerializer = (err: Error): CustomSerializedError => {
  let result: CustomSerializedError = pino.stdSerializers.err(err);

  if (result.stack && typeof result.stack === 'string') {
    const stack = result.stack.split(/\n/);
    result = { ...result, stack: stack };
  }

  return result;
}

export const filterSensitiveData = (obj: Object): Object => {
  if (obj === null || obj === undefined) return undefined;

  const cookiesToFilter = [ 'jwt', 'identity', 'auth', 'token', 'userdata', 'userinfo' ];
  const result = { ...obj };
  for (const key in obj) {
    const adjustedKey = key.toLowerCase().replace(/[-_.]/g, '');
    if (cookiesToFilter.some(f => adjustedKey.includes(f))) {
      result[key] = '<REDUCTED>';
    }
  }

  return result;
}