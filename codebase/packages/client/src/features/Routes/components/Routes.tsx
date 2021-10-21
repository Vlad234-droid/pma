import React, { FC } from 'react';
import { Redirect, Route as ReactRoute, Switch } from 'react-router';

import { Route } from '../types';
import { NotFound } from 'pages/NotFound';

type Props = {
  routes: Route[];
};

const Routes: FC<Props> = ({ routes }) => (
  <Switch>
    {routes.map((route, idx) => (
      <ReactRoute key={idx} {...route} />
    ))}
    <ReactRoute exact path='/'>
      <Redirect to={'/career-performance'} />
    </ReactRoute>
    <ReactRoute path='*'>
      <NotFound />
    </ReactRoute>
  </Switch>
);

export default Routes;
