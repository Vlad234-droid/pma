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

  try {
    console.log(`Initializing MyInbox middleware ...`);
    console.log(`   - origin: ${origin}`);
    console.log(`   - configEnvironment: ${configEnvironment}`);
    console.log(`   - appName: ${appName}`);
    console.log(`   - logoutPath: ${logoutPath}`);
  
    const m =  await myInboxMiddleware({
      mountPath: '', // ingress overwrites the paths and discards the mountPath part
      origin,
      configEnvironment,
      appName,
      logoutPath,
      disableSplunk: true,
    });

    return m;
  } catch (e) {
    console.error(`Error while initializing MyInbox middleware`, e);
    return null;
  }
};
