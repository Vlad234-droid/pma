import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'utils/i18next';
import { DDLProvider, theme as dexDDLTheme } from '@dex-ddl/core';
import merge from 'lodash.merge';
import theme from 'theme';
import { INTEGRATION_MODE, PUBLIC_URL } from 'config/constants';
import store from 'config/store';
import { AuthProvider } from 'contexts/authContext';
import Layout from 'features/Layout';
import Navigation from 'features/Routes/components/Routes';
import { buildRoutes } from 'features/Routes';
import { pages } from 'pages';
import { ToastProvider } from 'features/Toast';
import fontSettings from 'theme/font/fontSettings';

const routes = buildRoutes(pages);

const globalCSS = `body { background: #F6F6F6; font-family: "TESCO Modern", Arial, sans-serif; color: #333333 } a, a:hover, a:focus, a:active {text-decoration: none; color: inherit;}`;

const rendererOptions = {
  fontSettings,
  globalCSS,
};

const Root: FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <DDLProvider rendererOptions={rendererOptions} theme={merge(dexDDLTheme, theme)}>
        <Provider store={store}>
          <ToastProvider>
            <AuthProvider>
              <BrowserRouter basename={PUBLIC_URL}>
                <React.StrictMode>
                  <Layout>
                    <Navigation routes={routes} />
                  </Layout>
                </React.StrictMode>
              </BrowserRouter>
            </AuthProvider>
          </ToastProvider>
        </Provider>
      </DDLProvider>
    </I18nextProvider>
  );
};

if (INTEGRATION_MODE === 'standalone') {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

export default Root;
