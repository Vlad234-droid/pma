import { QueryType } from './query';

export const checkTrailingSlash = (path: String) => {
  return path.endsWith('/') ? path : path + '/';
};

export const upperCaseFirstLetter = <T extends string>(string: T): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const extendQuery = (query: QueryType, fields: Record<string, string>): QueryType => ({ ...query, ...fields });
