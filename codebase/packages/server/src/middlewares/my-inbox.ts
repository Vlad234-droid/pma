//import { myInboxMiddleware } from '@my-inbox/middleware';
import { myInboxMiddleware } from './my-inbox/my-inbox-middleware';
import { ProcessConfig, isPROD } from '../config';

export const myInboxConfig = async ({
  applicationRoot,
  environment,
  // applicationName,
  // integrationSSOLogoutPath,
}: ProcessConfig) => {
  const origin = applicationRoot();
  const configEnvironment = isPROD(environment()) ? 'prod' : environment();
  // const appName = applicationName();
  // const logoutPath = integrationSSOLogoutPath();

  // const m = await myInboxMiddleware({
  //   mountPath: '', // ingress overwrites the paths and discards the mountPath part
  //   origin,
  //   configEnvironment,
  //   appName,
  //   logoutPath,
  // });

  const m = await myInboxMiddleware({
    contextPath: '/', // ingress overwrites the paths and discards the mountPath part
    origin,
    configEnvironment,
  });

  return m;
};
