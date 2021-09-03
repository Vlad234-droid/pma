import { ComponentProps, ComponentType } from 'react';
import { Route as ReactRoute } from 'react-router';

type Route = ComponentProps<typeof ReactRoute>;
type Page = Route;
type PageComponent = ComponentType;

type BuildPath = (page: Page, root?: string, prefix?: string, sufix?: string) => string;

type BuildRoute = (page: string, pageComponents: Record<string, PageComponent>, exact?: boolean) => Route;

export type { BuildRoute, BuildPath, Route, PageComponent };
