import { BuildPath, BuildRoute } from './types';

const buildPath: BuildPath = (page, root = '/', prefix = '', sufix = '') => {
  return `${root}${page}${prefix}${sufix}`;
};

const getPageFromPath = (path: string | undefined) => (path ? path.replace(/^\//, '') : '');

const buildRoute: BuildRoute = (page, pageComponents, exact = true) => {
  const pageConfig = pageComponents[page];

  return {
    path: buildPath(page),
    exact,
    page,
    ...pageConfig,
  };
};

const buildRoutes = (pages) => Object.keys(pages).map((page) => buildRoute(page, pages));

export { buildRoutes, buildPath, getPageFromPath };
