import { QueryType } from './query';

export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

export const upperCaseFirstLetter = <T extends string>(string: T): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const extendQuery = <T extends QueryType, U extends Record<string, string>>(query: T, fields: U): T & U => ({
  ...query,
  ...fields,
});
