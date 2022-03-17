import { BuildPath, BuildRoute, BuildPathWithParams } from './types';
import { PageComponent } from '../../pages/pages';

const buildPath: BuildPath = (page, root = '/', prefix = '', sufix = '') => {
  return `${root}${page}${prefix}${sufix}`;
};

const buildPathWithParams: BuildPathWithParams = (link, searchParams) => {
  if (!Object.entries(searchParams).length) return link;
  const params = new URLSearchParams();
  //@ts-ignore
  Object.entries(searchParams).forEach((item) => params.append(item[0], item.pop()));

  return `${link}?${params}`;
};

const getPageFromPath = (path: string | undefined) => (path ? path.replace(/^\//, '') : '');

export type RouteWithPath = PageComponent & { path: string; page: string };

const buildRoute: BuildRoute = (page, pageComponents): RouteWithPath => {
  const pageConfig = pageComponents[page];

  return {
    path: buildPath(page),
    page,
    ...pageConfig,
  } as RouteWithPath;
};

const buildRoutes: (pages) => RouteWithPath[] = (pages) =>
  Object.keys(pages).map((page) => buildRoute(page, pages)) as RouteWithPath[];

export { buildRoutes, buildPath, getPageFromPath, buildPathWithParams };
