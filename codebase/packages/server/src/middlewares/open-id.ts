import { NextFunction, Request, Response } from 'express';
import {
  AuthData,
  getDataFromCookie,
  getIdentitySwapToken,
  getOpenidMiddleware,
  identityClientScopedTokenPlugin,
  identityTokenSwapPlugin,
  Logger,
  LoggerEvent,
  OpenIdUserInfo,
  PluginCookieConfig,
  setDataToCookie,
  userDataPlugin,
} from '@energon/onelogin';

import { defaultConfig, isPROD, ProcessConfig } from '../config';

import { isEmpty } from '../utils';

interface ErrorMessage {
  errorType: string;
  errorMessage: string;
  stack: string;
}

interface LogMessage {
  message: string;
}

type OidcTokenExtractorConfig = {
  /**
   * onelogin strategy: oidc or saml
   */
  strategy: 'oidc';
  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig;
};

const configOidcTokenCookie = (isProduction = false) => ({
  cookieName: 'oidc_token_cookie',
  secret: 'oidc_token_cookie_secret',
  httpOnly: true,
  secure: isProduction,
  signed: isProduction,
  compressed: false,
});

const oidcTokenExtractorPlugin = (config: OidcTokenExtractorConfig) => {
  const plugin = async (_: Request, res: Response, next: NextFunction) => {
    const { strategy, cookieConfig } = config;

    try {
      if (!isEmpty(res.oneLoginAuthData)) {
        const idToken = getIdentitySwapToken(res, strategy);
        console.log('idToken', idToken);
        setDataToCookie(res, { idToken }, cookieConfig!);
      }
    } catch (e: any) {
      console.error(e);
      console.log(e);
      console.log(e.stack);
      console.log(`Oidc token extractor error: ${e.message}`);
    }

    if (typeof next === 'function') next();
  };

  return plugin;
};

const OpenIdLogger: Logger = (event: LoggerEvent) => {
  switch (event.severity) {
    case 'info': {
      if (event.flow !== 'verification') {
        const logMessage = event.payload as unknown as LogMessage;
        console.log(` --> OpenID: [${event.severity}] <${event.flow}> ${logMessage.message}`);
      }
      break;
    }
    case 'warning': {
      const logMessage = event.payload as unknown as LogMessage;
      console.log(` --> OpenID: [${event.severity}] <${event.flow}> ${logMessage.message}`);
      break;
    }
    case 'error': {
      const errorMessage = event.payload.error as unknown as ErrorMessage;
      console.log(` --> OpenID: [${event.severity}] <${event.flow}> ${errorMessage.errorMessage}`);
      break;
    }
  }
};

export const openIdConfig = ({
  environment,
  applicationCookieParserSecret,
  applicationUserDataCookieName,
  oneLoginIssuerUrl,
  oneLoginApplicationPath,
  oneLoginCallbackUrlRoot,
  oneLoginCallbackPath,
  oneLoginRedirectAfterLogoutUrl,
  oidcClientId,
  oidcClientSecret,
  oidcRefreshTokenSecret,
  oidcGroupFiltersRegex,
  oidcAdminGroups,
  oidcManagerGroups,
  identityClientId,
  identityClientSecret,
  identityUserScopedTokenCookieSecret,
  identityUserScopedTokenCookieName,
}: ProcessConfig) => {
  const isProduction = isPROD(environment());
  const identityIdAndSecret = `${identityClientId()}:${identityClientSecret()}`;

  const enrichUserInfo = (userInfo: OpenIdUserInfo) => {
    console.log(` --> OpenID: [userInfo]: ${JSON.stringify(userInfo)}`);

    const userGroups = (
      Array.isArray(userInfo.groups) ? userInfo.groups : ((userInfo.groups as unknown as string) || '').split(',') || []
    )
      .filter(Boolean)
      .filter((group) => oidcGroupFiltersRegex().some((rr) => rr.test(group)));

    const userRoles: Set<string> = new Set([defaultConfig.defaultRole]);

    if (oidcManagerGroups().some((g) => userGroups.includes(g))) {
      userRoles.add('Manager');
    }
    if (oidcAdminGroups().some((g) => userGroups.includes(g))) {
      userRoles.add('Admin');
    }

    const userData = {
      //...userInfo,
      fullName: userInfo.name,
      firstName: userInfo.given_name || userInfo.name.split(/\s+/)[0],
      lastName: userInfo.family_name || userInfo.name.split(/\s+/)[1],
      email: userInfo.preferred_username,
      params: {
        employeeNumber: (userInfo.params?.employeeNumber || userInfo.params?.EmployeeNumber) as string,
      },
      //groups: userGroups,
      aud: userInfo.aud,
      sid: userInfo.sid,
      iat: userInfo.iat,
      iss: userInfo.iss,
      sub: userInfo.sub,
      exp: userInfo.exp,
      updatedAt: userInfo.updated_at,
      roles: Array.from(userRoles.values()),
    };

    return userData;
  };

  const openId = getOpenidMiddleware({
    /** The OneLogin generated Client ID for your OpenID Connect app */
    clientId: oidcClientId(),

    /** The OneLogin generated Client Secret for your OpenID Connect app */
    clientSecret: oidcClientSecret(),

    /** A key used to sign & verify cookie values */
    cookieKey: applicationCookieParserSecret(),

    /** issuer url e.g. https://login.ourtesco.com/oidc/2 */
    issuerUrl: oneLoginIssuerUrl(),

    /** Client secret used to encrypt refresh token */
    refreshTokenSecret: oidcRefreshTokenSecret(),

    /** A callback root that was registered for the application e.g. https://ourtesco.com (without the applicationPath) */
    registeredCallbackUrlRoot: oneLoginCallbackUrlRoot(),

    /** A callback path that was registered for the application e.g. /auth/openid/callback */
    registeredCallbackUrlPath: oneLoginCallbackPath(),

    /**
     * A path the app is mounted on e.g. for https://ourtesco.com/my-shift the path is /my-shift.
     * If the app is mounted on root path do not provide this option.
     */
    applicationPath: oneLoginApplicationPath(),

    /**
     * Paths that won't be part of token validation and refreshing
     */
    ignoredPathsFragments: ['/api/cms-events'],

    /**
     * In case of error, calls containg that path framgents won't result in redirect.
     * Instead middleware will return an error with correct status. Could be used for AJAX calls.
     */
    //noRedirectPathFragments: [],

    /** Scopes of the data that we want to be present in the id_token */
    scope: ['openid', 'profile', 'params', 'groups'],

    /** Optional, callback that will be called with Event type objects durring authentication process */
    logger: OpenIdLogger,

    /** If true sets idToken and encRefreshToken in 'authData' cookie. */
    requireIdToken: false,

    /**
     * Absolute url that we will redirect to after logout, that can lead to onelogin session termination ednpoint .
     * Default: `${applicationPath}/sso/auth`
     */
    redirectAfterLogoutUrl: oneLoginRedirectAfterLogoutUrl(),

    plugins: [
      identityTokenSwapPlugin({
        identityIdAndSecret,
        strategy: 'oidc',
        cookieConfig: {
          cookieName: identityUserScopedTokenCookieName(),
          secret: identityUserScopedTokenCookieSecret(),
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
        },
      }),
      identityClientScopedTokenPlugin({
        identityIdAndSecret,
        cache: true,
      }),
      userDataPlugin({
        cookieConfig: {
          cookieName: applicationUserDataCookieName(),
          httpOnly: true,
          secure: isProduction,
          signed: isProduction,
          cookieShapeResolver: (userInfo) => enrichUserInfo(userInfo),
        },
      }),
      oidcTokenExtractorPlugin({
        strategy: 'oidc',
        cookieConfig: {
          ...configOidcTokenCookie(isProduction),
        },
      }),
    ],
  });

  return { openId };
};

export const getOidcData = (isProduction: boolean, req: Request) => {
  const { secret, cookieName, compressed } = configOidcTokenCookie(isProduction);
  return getDataFromCookie<AuthData>(req, { secret, cookieName, compressed });
};
