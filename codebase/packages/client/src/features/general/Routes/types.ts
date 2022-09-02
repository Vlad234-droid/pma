import { ComponentProps, ComponentType } from 'react';
import { Route as ReactRoute } from 'react-router';

type Route = ComponentProps<typeof ReactRoute>;
type PageComponent = ComponentType;

type BuildPath = (page: string, root?: string, prefix?: string, sufix?: string) => string;

type BuildPathWithParams = (link: string, searchParams: Record<string, string | number>) => string;

type BuildRoute = (page: string, pageComponents: Record<string, PageComponent>, exact?: boolean) => Route;

export type { BuildRoute, BuildPath, Route, PageComponent, BuildPathWithParams };
