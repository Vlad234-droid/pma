import React from 'react';
import { ErrorBoundary as EnergonErrorBoundary , createUILogger, SendUILog, sendLogToConsole } from '@energon/splunk-logger-ui';
import { UI_LOGGER_PATH } from '@energon/splunk-logger-core';
import { DDLProvider, SorryPage } from '@dex-ddl/core';
import { CONFIG, LINKS } from 'config/constants';

export const logger: SendUILog = (...args) => {
  const sendLogToServer = createUILogger('/api/' + UI_LOGGER_PATH);

  if (process.env.NODE_ENV === 'development') {
    sendLogToConsole(...args);
  }

  sendLogToServer(...args);
};

export const ErrorReporting: React.FC = ({ children }) => {
  return (
    <EnergonErrorBoundary
      logger={logger}
      isDevelopment={false}
      FallbackComponent={() => (
        <DDLProvider>
          <SorryPage type='sorry' appName={CONFIG.applicationName} logoutPath={LINKS.signOut} />
        </DDLProvider>
      )}
    >
      {children}
    </EnergonErrorBoundary>
  );
};
