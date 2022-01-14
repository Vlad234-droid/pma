import React, { FC } from 'react';
import { Navigate, Route as ReactRoute, Routes } from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { buildPath, RouteWithPath } from 'features/Routes/utils';
import { Page } from 'pages';

type Props = {
  routes: RouteWithPath[];
};

const MainRoutes: FC<Props> = ({ routes }) => (
  <Routes>
    {routes.map(({ Element, path }, idx) => {
      // @ts-ignore
      return <ReactRoute key={idx} element={<Element />} path={path} />;
    })}
    <ReactRoute path='/' element={<Navigate to={buildPath(Page.CONTRIBUTION)} />} />
    <ReactRoute path='*' element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
