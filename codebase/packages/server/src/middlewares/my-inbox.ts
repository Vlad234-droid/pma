import { myInboxMiddleware } from '@my-inbox/middleware';
import { ProcessConfig } from '../config';

export const myInboxConfig = async ({
  applicationUrlRoot,
  environment,
  applicationName,
  integrationSSOLogoutPath,
}: ProcessConfig) => {
  return await myInboxMiddleware({
    mountPath: '', // ingress overwrites the paths and discards the mountPath part
    origin: applicationUrlRoot(),
    configEnvironment: environment(),
    appName: applicationName(),
    logoutPath: integrationSSOLogoutPath(),
    disableSplunk: true,
  });
};
