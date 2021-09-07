import React from 'react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { renderWithTheme } from 'utils/test';
import { screen } from '@testing-library/react';
import { buildRoutes } from '../utils';
import Navigation from './Routes';

const Layout = ({ children }) => {
  return <div>{children}</div>;
};

it('Routes in the document', async () => {
  const history = createMemoryHistory();
  history.push('/testNew');
  const routes = buildRoutes({ testNew: () => <div>testNew</div> });
  renderWithTheme(
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
  const { queryByText } = renderWithTheme(
    <Router history={history}>
      <Layout>
        <Navigation routes={routes} />
      </Layout>
    </Router>,
  );
  expect(queryByText('testNew')).toBeNull();
});
