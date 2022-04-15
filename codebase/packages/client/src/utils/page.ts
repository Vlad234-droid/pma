const PUBLIC_URL = process.env.PUBLIC_URL || '/';

const paramsReplacer = (template: string, replace: Record<string, string>): string =>
  template
    .split('/')
    .map((path) => path.replace(/(:.*)/, (_, $2) => `${replace[$2]}`))
    .join('/');

const buildAbsolutePath = (path: string) => `${PUBLIC_URL}${path}`;

export { paramsReplacer, buildAbsolutePath };
