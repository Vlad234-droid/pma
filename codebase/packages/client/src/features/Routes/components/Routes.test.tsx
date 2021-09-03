import React from 'react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { render, screen } from 'styles/test-theme-provider';
import { buildRoutes } from '../utils';
import Navigation from './Routes';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

it('Routes in the document', async () => {
  const history = createMemoryHistory();
  history.push('/testNew');
  const routes = buildRoutes({ testNew: () => <div>testNew</div> });
  render(
    <Router history={history}>
      <Layout>
        <Navigation routes={routes} />
      </Layout>
    </Router>,
  );
  expect(screen.getByText('testNew')).toBeInTheDocument();
});

it('Routes not in the document', async () => {
  const history = createMemoryHistory();
  history.push('/test');
  const routes = buildRoutes({ testNew: () => <div>testNew</div> });
  const { queryByText } = render(
    <Router history={history}>
      <Layout>
        <Navigation routes={routes} />
      </Layout>
    </Router>,
  );
  expect(queryByText('testNew')).toBeNull();
});
