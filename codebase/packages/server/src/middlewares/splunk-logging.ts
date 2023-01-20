import { SendLog, getSplunkLogger, sendLogToConsole, loggerMiddleware } from '@energon/splunk-logger';
import { getUserData } from '@energon/onelogin';
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

export const loggingMiddleware = (config: ProcessConfig) =>
  loggerMiddleware({
    logSenders: [createLogSender(config)],
    apiUrlPredicate: (url) => url.includes(`/api/`),
    userInfoResolver: userDataResolver,
  });

const userDataResolver = (_req, res) => {
  const colleagueUuid = res.colleagueUUID;
  const openIdData = getUserData<{ params?: { employeeNumber: string } }>(res);

  return {
    employeeNumber: openIdData?.params?.employeeNumber,
    colleagueUuid,
  };
};
