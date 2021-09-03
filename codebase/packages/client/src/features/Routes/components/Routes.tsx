import React, { FC } from 'react';
import { Route as ReactRoute, Switch, Redirect } from 'react-router';

import { Route } from '../types';

type Props = {
  routes: Route[];
};

const Routes: FC<Props> = ({ routes }) => (
  <Switch>
    {routes.map((route, idx) => (
      <ReactRoute key={idx} {...route} />
    ))}
    <Redirect to={'/career-performance'} />
  </Switch>
);

export default Routes;
