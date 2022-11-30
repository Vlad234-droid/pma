import React from 'react';
import {
  ErrorBoundary as EnergonErrorBoundary,
} from '@energon/splunk-logger-ui';
import { DDLProvider, SorryPage } from '@dex-ddl/core';
import { CONFIG, LINKS } from 'config/constants';
import { uiLogger } from './ui-logger';

export const ErrorReporting: React.FC = ({ children }) => {
  return (
    <EnergonErrorBoundary
      logger={uiLogger}
      isDevelopment={false}
      normalizeError={normalize}
      FallbackComponent={() => (
        <DDLProvider>
          <SorryPage type='sorry' appName={CONFIG.applicationName} logoutPath={LINKS.signOut} />
        </DDLProvider>
      )}
    >
      <>
        {children}
      </>
    </EnergonErrorBoundary>
  );
};

const normalize = (thrown: unknown): any => {
  return Object.assign(thrown as object, {
    tag: 'Render error',
    message: 'Error msg',
    name: 'PMA Error',
  });
};
