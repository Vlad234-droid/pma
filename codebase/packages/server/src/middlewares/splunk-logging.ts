import { SendLog, getSplunkLogger, sendLogToConsole, loggerMiddleware } from '@energon/splunk-logger';
import { getUserData } from '@energon/onelogin';
import { isCookiePresent } from '@energon/cookie-utils';
import { AUTH_TOKEN_COOKIE_NAME } from '@pma-connectors/onelogin';
import { ProcessConfig } from 'config';

export const getLogger = ({
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
    logSenders: [getLogger(config)],
    apiUrlPredicate: (url) => url.includes(`/api/`),
    userInfoResolver: userDataResolver,
  });

const userDataResolver = (req, res) => {
  const colleagueUuid = res.colleagueUUID;

  const isPublic = !isCookiePresent(req, AUTH_TOKEN_COOKIE_NAME);
  const openIdData: any = isPublic ? { params: {} } : getUserData(res);

  return {
    sessionId: openIdData.sid,
    employeeNumber: openIdData.params.employeeNumber,
    colleagueUuid,
  };
};
