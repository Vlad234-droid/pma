import React, { FC, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'config/i18next';
import { AccessibilityProvider, fontSettings, theme } from '@pma/dex-wrapper';
import { INTEGRATION_MODE, PUBLIC_URL } from 'config/constants';
import store from 'config/store';
import { AuthProvider } from 'contexts/authContext';
import { TimelineProvider } from 'contexts/timelineContext';
import Layout from 'features/general/Layout';
import Navigation, { buildRoutes } from 'features/general/Routes';
import { pages } from 'pages';
import { ToastProvider } from 'features/general/Toast';
import { AppStateProvider } from 'features/general/AppState';
import { MessagesProvider } from 'features/general/Messages';
import { HeaderProvider } from 'contexts/headerContext';
import { useMonitoring } from 'hooks/useMonitoring';

const routes = buildRoutes(pages);

const globalCSS = `body { background: #F6F6F6; font-family: "TESCO Modern", Arial, sans-serif; color: #333333; overflow-wrap: anywhere; } a, a:hover, a:focus, a:active {text-decoration: none; color: inherit;} @keyframes skeleton-loading {0% {background-color: hsl(200, 20%, 70%); } 100% {background-color: hsl(200%, 20%, 95%); } }`;

const rendererOptions = {
  fontSettings,
  globalCSS,
};

const Root: FC = () => {
  useMonitoring(document);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <I18nextProvider i18n={i18n}>
        <AccessibilityProvider
          containFocus={false}
          rendererOptions={rendererOptions}
          // @ts-ignore
          theme={theme}
        >
          <Provider store={store}>
            <AuthProvider>
              <ToastProvider>
                <MessagesProvider>
                  <AppStateProvider>
                    <HeaderProvider>
                      <BrowserRouter basename={PUBLIC_URL}>
                        <React.StrictMode>
                          <Layout>
                            <TimelineProvider>
                              <Navigation routes={routes} />
                            </TimelineProvider>
                          </Layout>
                        </React.StrictMode>
                      </BrowserRouter>
                    </HeaderProvider>
                  </AppStateProvider>
                </MessagesProvider>
              </ToastProvider>
            </AuthProvider>
          </Provider>
        </AccessibilityProvider>
      </I18nextProvider>
    </Suspense>
  );
};

if (INTEGRATION_MODE === 'standalone') {
  ReactDOM.render(<Root />, document.getElementById('root'));
}

export default Root;
