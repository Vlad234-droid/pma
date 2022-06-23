import React, { FC } from 'react';
import { Navigate, Route as ReactRoute, Routes } from 'react-router-dom';
import { NotFound } from 'pages/general/NotFound';
import { Page } from 'pages';
import AccessDenied from 'components/AccessDenied';
import { usePermission, usePermissionByTenant } from 'features/general/Permission';
import { buildPath, RouteWithPath } from './utils';

const notHaveAccessMessage = `
  not_have_access_to_page
`;

type Props = {
  routes: RouteWithPath[];
};

const MainRoutes: FC<Props> = ({ routes }) => {
  return (
    <Routes>
      {routes.map(({ Element, path, perform, tenant }, idx) => {
        const hasPermission = usePermissionByTenant(tenant) && usePermission(perform);
        return (
          <ReactRoute
            key={idx}
            element={hasPermission ? <Element /> : <AccessDenied message={notHaveAccessMessage} />}
            path={path}
          />
        );
      })}
      <ReactRoute path='/' element={<Navigate to={buildPath(Page.CONTRIBUTION)} />} />
      <ReactRoute path='*' element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
