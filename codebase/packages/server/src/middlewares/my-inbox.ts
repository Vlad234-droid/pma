import { myInboxMiddleware } from '@my-inbox/middleware';
import { ProcessConfig } from '../config';

export const myInboxConfig = async ({
  applicationUrlRoot,
  environment,
  applicationName,
  integrationSSOLogoutPath,
}: ProcessConfig) => {
  const origin = applicationUrlRoot();
  const configEnvironment = environment();
  const appName = applicationName();
  const logoutPath = integrationSSOLogoutPath();

  return await myInboxMiddleware({
    mountPath: '', // ingress overwrites the paths and discards the mountPath part
    origin,
    configEnvironment,
    appName,
    logoutPath,
    disableSplunk: true,
  });
};
