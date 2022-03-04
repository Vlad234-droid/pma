import Express, { Handler } from 'express';
import {
  identityTokenSwapPlugin,
  getDataFromCookie,
  AuthData,
  AUTH_DATA_COOKIE_NAME,
  getIdentityData,
  OneloginError,
  Plugin,
} from '@energon/onelogin';

import { ProcessConfig, isPROD } from '../config';

export const authMiddleware = ({
  authPath,
  environment,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
  integrationNodeBFFUrl,
}: ProcessConfig): Handler => {
  const isProduction = isPROD(environment());
  const identityIdAndSecret = `${identityClientId()}:${identityClientSecret()}`;
  const router = Express.Router();
  const serverMountPath = new URL(integrationNodeBFFUrl()).pathname;

  router.use(authPath(), pluginWrapper(authDataPlugin));
  router.use(
    pluginWrapper(
      identityTokenSwapPlugin({
        identityIdAndSecret,
        strategy: 'oidc',
        cookieConfig: {
          cookieShapeResolver: ({ access_token }) => ({ access_token }),
          cookieName: identityUserScopedTokenCookieName(),
          secret: identityUserScopedTokenCookieSecret(),
          path: serverMountPath,
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
    ),
  );
  /** dex-core consumes this endpoint for token exchange purpose (onelogin -> identity) */
  /** identity token swap (oidc -> cst) is done in previous onelogin middlewares */
  router.use(authPath(), (_res, res) => (console.log('getIdentityData', getIdentityData(res)), res.sendStatus(200)));

  return router;
};

const authDataPlugin: Express.Handler = (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  const authData = getDataFromCookie<AuthData>(req, {
    cookieName: AUTH_DATA_COOKIE_NAME,
    compressed: true,
  });
  res.oneLoginAuthData = authData;
  return next();
};

const pluginWrapper =
  (plugin: Plugin): Handler =>
  async (req, res, next): Promise<void | OneloginError> => {
    try {
      await plugin(req, res, next);
    } catch (error) {
      const { message, status } = error as Error & { status };
      return next(new OneloginError('plugin', message, status));
    }
  };
