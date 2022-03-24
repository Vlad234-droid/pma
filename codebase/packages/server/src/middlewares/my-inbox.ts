import { myInboxMiddleware } from '@my-inbox/middleware';
import { ProcessConfig, isPROD } from '../config';

export const myInboxConfig = async ({
  applicationUrlRoot,
  environment,
  applicationName,
  integrationSSOLogoutPath,
}: ProcessConfig) => {
  const origin = applicationUrlRoot();
  const configEnvironment = isPROD(environment()) ? 'prod' : environment();
  const appName = applicationName();
  const logoutPath = integrationSSOLogoutPath();

  try {
    const m = await myInboxMiddleware({
      mountPath: '', // ingress overwrites the paths and discards the mountPath part
      origin,
      configEnvironment,
      appName,
      logoutPath,
    });

    return m;
  } catch (e) {
    console.error(`Error while initializing MyInbox middleware`, e);
    return null;
  }
};
