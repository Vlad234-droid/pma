import { myInboxMiddleware } from '@my-inbox/middleware';
import { ProcessConfig } from '../config';

export const myInboxConfig = async ({
  applicationPublicUrl,
  applicationUrlRoot,
  environment,
  applicationName,
  integrationSSOLogoutPath,
}: ProcessConfig) => {
  const mountPath = applicationPublicUrl();
  return await myInboxMiddleware({
    mountPath: mountPath === '/' ? '' : mountPath,
    origin: applicationUrlRoot(),
    configEnvironment: environment(),
    appName: applicationName(),
    logoutPath: integrationSSOLogoutPath(),
    disableSplunk: true,
  });
};
