import React, { FC } from 'react';
import { Navigate, Route as ReactRoute, Routes } from 'react-router';

import { NotFound } from 'pages/NotFound';
import { buildPath } from 'features/Routes/utils';
import { Page } from 'pages';
import { Route } from '../types';

type Props = {
  routes: Route[];
};

const MainRoutes: FC<Props> = ({ routes }) => (
  <Routes>
    {/*<ReactRoute path='/contribution' element={MyTeam()} />*/}
    {routes.map((route, idx) => {
      //debugger;
      // @ts-ignore
      return <ReactRoute key={idx} element={route?.element()} path={route?.path} />;
    })}
    <ReactRoute path='/' element={<Navigate to={buildPath(Page.CONTRIBUTION)} />} />
    <ReactRoute path='*' element={<NotFound />} />
  </Routes>
);

export default MainRoutes;
