import { loggerMiddleware } from '@energon/splunk-logger';
import { getUserData } from '@energon/onelogin';
import { ProcessConfig } from 'config';
import { createLogSender } from '../utils/splunk-logger';

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
