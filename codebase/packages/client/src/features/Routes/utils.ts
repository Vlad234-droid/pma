import { BuildPath, BuildRoute } from './types';

const buildPath: BuildPath = (page, root = '/', prefix = '', sufix = '') => {
  return `${root}${page}${prefix}${sufix}`;
};

const buildRoute: BuildRoute = (page, pageComponents, exact = true) => {
  const Component = pageComponents[page];

  return {
    path: buildPath(page),
    component: Component,
    exact,
    page,
  };
};

const buildRoutes = (pages) => Object.keys(pages).map((page) => buildRoute(page, pages));

export { buildRoutes };
