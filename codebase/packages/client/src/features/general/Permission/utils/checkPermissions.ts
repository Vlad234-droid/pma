import { uiLogger } from 'error-reporting';
import { LogLevel } from '@energon/splunk-logger-core';

const checkPermissions = (performs: Array<string>, actions: Array<string>) => {
  if (!performs.length) return false;

  const hasAccess = performs.some((perform) => actions.includes(perform));

  if (!hasAccess) {
    uiLogger(LogLevel.warn, 'Access denied', {
      has: actions,
      required: performs,
    });
  }

  return hasAccess;
};

export default checkPermissions;
