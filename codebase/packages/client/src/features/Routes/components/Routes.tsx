import React, { FC } from 'react';
import { Redirect, Route as ReactRoute, Switch } from 'react-router';

import { NotFound } from 'pages/NotFound';
import { buildPath } from 'features/Routes/utils';
import { Page } from 'pages';
import { Route } from '../types';

type Props = {
  routes: Route[];
};

const Routes: FC<Props> = ({ routes }) => (
  <Switch>
    {routes.map((route, idx) => (
      <ReactRoute key={idx} {...route} />
    ))}
    <ReactRoute exact path='/'>
      <Redirect to={buildPath(Page.CONTRIBUTION)} />
    </ReactRoute>
    <ReactRoute path='*'>
      <NotFound />
    </ReactRoute>
  </Switch>
);

export default Routes;
