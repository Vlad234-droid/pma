import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { OverlayProvider } from '@react-aria/overlays';

import { getFontFamilies, makeRenderer, ThemeProvider } from 'styles';

// contexts
import { AuthProvider } from 'contexts/authContext';

// navigation
import Navigation, { buildRoutes } from 'features/Routes';
import Layout from './features/Layout';
import { pages } from './pages';

// utils
import history from 'config/history';
import store from 'config/store';

const renderer = makeRenderer(getFontFamilies());
renderer.renderStatic(
  {
    fontFamily: '"TESCO Modern", Arial, sans-serif',
    background: '#f6f6f6',
  },
  'body',
);

const routes = buildRoutes(pages);

ReactDOM.render(
  <OverlayProvider>
    <ThemeProvider renderer={renderer}>
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
    </ThemeProvider>
  </OverlayProvider>,
  document.getElementById('root'),
);
