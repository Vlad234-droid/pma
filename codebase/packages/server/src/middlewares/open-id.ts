import {
  initializeOpenidMiddleware,
  identityTokenSwapPlugin,
  identityClientScopedTokenPlugin,
  pinoLogger,
  userDataPlugin,
  OpenIdUserInfo,
} from '@pma-connectors/onelogin';

import { pmaUserDataResolver } from '../config/auth-data';
import { isPROD, ProcessConfig } from '../config';
import { Router } from 'express';

export const initializeOpenid = async ({
  runtimeEnvironment,
  apiEnv,
  applicationIdTokenCookieName,
  applicationSessionCookieName,
  applicationCookieParserSecret,
  applicationUserDataCookieName,
  applicationUserDataCookieSecret,
  stickCookiesToApplicationPath,
  oidcIssuerUrl,
  applicationOrigin,
  applicationContextPath,
  oidcAuthCallbackPath,
  oidcRedirectAfterLogoutPath,
  oidcClientId,
  oidcClientSecret,
  oidcRefreshTokenSecret,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
}: ProcessConfig): Promise<Router> => {
  const openIdRouter = Router();

  // add simple handler to check, if request has Bearer auth and by-pass OneLogin
  openIdRouter.use((req, _, next) => {
    const authHeader = req.headers.authorization;
    const bearerPrefix = 'BEARER ';
    if (typeof authHeader === 'string' && authHeader.slice(0, bearerPrefix.length).toUpperCase() === bearerPrefix) {
      next('router');
    } else {
      next();
    }
  });

  const isProduction = isPROD(runtimeEnvironment());

  const openidMiddleware = await initializeOpenidMiddleware({
    runtimeEnvironment: runtimeEnvironment(),

    /**
     * The OneLogin generated Client ID for your OpenID Connect app
     */
    clientId: oidcClientId(),

    /**
     * The OneLogin generated Client Secret for your OpenID Connect app
     */
    clientSecret: oidcClientSecret(),

    /**
     * A key used to sign & verify cookie values
     */
    cookieKey: applicationCookieParserSecret(),

    /**
     * issuer url e.g. https://login.ourtesco.com/oidc/2
     */
    issuerUrl: oidcIssuerUrl(),

    /**
     * Client secret used to encrypt refresh token
     */
    refreshTokenSecret: oidcRefreshTokenSecret(),

    /**
     * A callback root that was registered for the application e.g. https://www.ourtesco.com (without the applicationPath)
     */
    applicationServerUrlRoot: applicationOrigin(),

    /**
     * A path the app is mounted on e.g. for https://www.ourtesco.com/my-shift the path is /my-shift.
     * If the app is mounted on root path do not provide this option.
     */
    applicationPath: applicationContextPath(),

    /**
     * A callback path that was registered for the application e.g. /sso/auth/callback
     */
    registeredAuthCallbackUrlPath: oidcAuthCallbackPath(),

    /**
     * Absolute url that we will redirect to after logout.
     * Default: `${applicationPath}/sso/logout/callback`
     */
    registeredRedirectAfterLogoutPath: oidcRedirectAfterLogoutPath(),

    /**
     *
     * @param path
     * @returns
     */
    isViewPath: (path: string) => !path.match('^(/api|/auth|/sso|/static|/favicon.ico|/manifest.json)'),

    /**
     * Paths that won't be part of token validation and refreshing
     */
    ignoredPathsFragments: ['/favicon.ico', '/manifest.json'],

    /**
     * In case of error, calls containg that path framgents won't result in redirect.
     * Instead middleware will return an error with correct status. Could be used for AJAX calls.
     */
    noRedirectPathFragments: ['/api'],

    /**
     * Optional, auth data cookie configuration
     */
    authTokenCookie: {
      name: applicationIdTokenCookieName(),
      path: stickCookiesToApplicationPath() ? applicationContextPath() : '/',
    },

    /**
     * Optional, session cookie configuration
     */
    sessionCookie: {
      name: applicationSessionCookieName(),
      path: stickCookiesToApplicationPath() ? applicationContextPath() : '/',
    },

    /**
     * Scopes of the data that we want to be present in the id_token
     * Availble scopes: 'openid', 'profile', 'params', 'groups'
     */
    scope: ['openid', 'profile', 'params'],

    /**
     * Optional, callback that will be called with Event type objects durring authentication process
     */
    logger: pinoLogger({ name: 'middleware.onelogin' }),

    /**
     * If true sets authToken and encRefreshToken in 'authData' cookie.
     */
    requireAccessToken: true,

    plugins: [
      identityTokenSwapPlugin({
        identityClientId: identityClientId(),
        identityClientSecret: identityClientSecret(),
        strategy: 'oidc',
        apiEnv: apiEnv,
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName(),
          secret: identityUserScopedTokenCookieSecret(),
          path: stickCookiesToApplicationPath() ? applicationContextPath() : '/',
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      identityClientScopedTokenPlugin({
        apiEnv,
        identityClientId: identityClientId(),
        identityClientSecret: identityClientSecret(),
        cache: true,
      }),
      userDataPlugin({
        optional: false,
        cookieConfig: {
          cookieName: applicationUserDataCookieName(),
          secret: applicationUserDataCookieSecret(),
          path: stickCookiesToApplicationPath() ? applicationContextPath() : '/',
          httpOnly: false,
          secure: isProduction,
          signed: isProduction,
          cookieShapeResolver: (userInfo: OpenIdUserInfo) => pmaUserDataResolver(userInfo),
        },
      }),
    ],
  });

  openIdRouter.use(openidMiddleware);

  return openIdRouter;
};
