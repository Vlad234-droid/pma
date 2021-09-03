import React from 'react';
import { Provider } from 'react-redux';
import { OverlayProvider } from '@react-aria/overlays';

import { getFontFamilies, makeRenderer, ThemeProvider } from 'styles';

import store from './config/store';
import { AuthProvider } from './contexts/authContext';
import { Router } from 'react-router-dom';
import history from './config/history';
import Layout from './features/Layout';
import Navigation from './features/Routes/components/Routes';
import { buildRoutes } from './features/Routes';
import { pages } from './pages';

const renderer = makeRenderer(getFontFamilies());
renderer.renderStatic(
  {
    fontFamily: '"TESCO Modern", Arial, sans-serif',
    background: '#f6f6f6',
  },
  'body',
);

const routes = buildRoutes(pages);

export default function Root() {
  return (
    <ThemeProvider renderer={renderer}>
      <OverlayProvider>
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
      </OverlayProvider>
    </ThemeProvider>
  );
}
