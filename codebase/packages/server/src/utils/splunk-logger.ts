import { ApiEnv } from '@energon-connectors/core';
import { SendLog, getSplunkLogger, sendLogToConsole, convertErrorToPlainObject } from '@energon/splunk-logger';
import { LogLevel } from '@energon/splunk-logger-core';
import { ProcessConfig } from 'config';

export const createLogSender = ({
  splunkEnabled,
  splunkSource,
  splunkSourcetype,
  splunkTokenSecret,
  buildEnvironment,
}: ProcessConfig): SendLog => {
  const sendLogToSplunk = getSplunkLogger({
    token: splunkTokenSecret(),
    sourcetype: splunkSourcetype(),
    source: splunkSource(),
  });

  return (...args) => {
    if (splunkEnabled()) {
      sendLogToSplunk(...args);
    }
    if (buildEnvironment() === 'local') {
      sendLogToConsole(...args);
    }
  };
};

export type BootstrapLogOptions = {
  sendLog: SendLog;
  environment: () => keyof typeof NodeJS.Environment;
  apiEnv: () => ApiEnv;
  port: () => number;
  applicationContextPath: () => string;
  splunkEnabled: () => boolean;
  splunkSourcetype: () => string;
  error?: unknown;
};

export const logStartupSuccess = ({
  sendLog,
  environment,
  apiEnv,
  port,
  applicationContextPath,
  splunkEnabled,
  splunkSourcetype,
}: BootstrapLogOptions) => {
  sendLog(LogLevel.info, '[BOOTSTRAP]: Server started', {
    type: 'bootstrap',
    environment: environment(),
    apiEnv: apiEnv(),
    port: port(),
    applicationContextPath: applicationContextPath(),
    splunkEnabled: splunkEnabled(),
    splunkSourcetype: splunkSourcetype(),
  });
};

export const logStartupFail = ({
  sendLog,
  error,
  environment,
  apiEnv,
  port,
  applicationContextPath,
  splunkEnabled,
  splunkSourcetype,
}: BootstrapLogOptions) => {
  sendLog(LogLevel.error, '[BOOTSTRAP]: Error during server initialization', {
    type: 'bootstrap',
    environment: environment(),
    apiEnv: apiEnv(),
    port: port(),
    applicationContextPath: applicationContextPath(),
    splunkEnabled: splunkEnabled(),
    splunkSourcetype: splunkSourcetype(),
    error: convertErrorToPlainObject(error as Error),
  });
};
