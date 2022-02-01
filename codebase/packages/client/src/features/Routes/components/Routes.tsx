import React, { FC } from 'react';
import { Navigate, Route as ReactRoute, Routes } from 'react-router-dom';
import { NotFound } from 'pages/NotFound';
import { buildPath, RouteWithPath } from 'features/Routes/utils';
import { Page } from 'pages';
import { usePermission } from 'features/Permission';

type Props = {
  routes: RouteWithPath[];
};

const MainRoutes: FC<Props> = ({ routes }) => {
  return (
    <Routes>
      {routes.map(({ Element, path, perform }, idx) => {
        const hasPermission = usePermission(perform);
        return hasPermission ? (
          <ReactRoute key={idx} element={<Element />} path={path} />
        ) : (
          <ReactRoute key={idx} path={path} element={<Navigate to={buildPath(Page.CONTRIBUTION)} />} />
        );
      })}
      <ReactRoute path='/' element={<Navigate to={buildPath(Page.CONTRIBUTION)} />} />
      <ReactRoute path='*' element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
