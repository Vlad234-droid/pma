import { PUBLIC_URL } from 'config/constants';

const URL_REGEXP = /\/$/;

const addIfNeededSlash = (path: string) => (URL_REGEXP.test(path) ? `${path}/` : path);

const paramsReplacer = (template: string, replace: Record<string, string>): string =>
  template
    .split('/')
    .map((path) => path.replace(/(:.*)/, (_, $2) => `${replace[$2]}`))
    .join('/');

const buildAbsolutePath = (path: string) => `${addIfNeededSlash(PUBLIC_URL)}${path}`;

export { paramsReplacer, buildAbsolutePath };
