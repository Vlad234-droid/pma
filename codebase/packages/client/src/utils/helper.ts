import { QueryType } from './query';

export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

export const isFunction = (mFn: any) => typeof mFn === 'function';

export const upperCaseFirstLetter = <T extends string>(string: T): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const extendQuery = <T extends QueryType, U extends Record<string, string>>(query: T, fields: U): T & U => ({
  ...query,
  ...fields,
});

export const checkExistedValue = (obj: Record<string, any>) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {});
