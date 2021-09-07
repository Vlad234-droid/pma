import React from 'react';
import { Provider } from 'react-redux';

import { DDLProvider } from '@dex-ddl/core';

import store from './config/store';
import { AuthProvider } from './contexts/authContext';
import { Router } from 'react-router-dom';
import history from './config/history';
import Layout from './features/Layout';
import Navigation from './features/Routes/components/Routes';
import { buildRoutes } from './features/Routes';
import { pages } from './pages';

const routes = buildRoutes(pages);

export default function Root() {
  return (
    <DDLProvider>
      <Provider store={store}>
        <AuthProvider>
          <Router history={history}>
            <React.StrictMode>
              <Layout>
                <Navigation routes={routes} />
              </Layout>
            </React.StrictMode>
          </Router>
        </AuthProvider>
      </Provider>
    </DDLProvider>
  );
}
