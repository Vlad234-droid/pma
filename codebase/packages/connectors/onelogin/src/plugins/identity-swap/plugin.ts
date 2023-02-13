import { Response, Request } from 'express';
import { ApiEnv, resolveBaseUrl, TESCO_API_URLS } from '@energon-connectors/core';

import {
  setDataToCookie,
  getDataFromCookie,
  PluginCookieConfig,
  getIdentitySwapToken,
  clearCookie,
  getMaxAge,
  clearPluginCookiesIfSessionExpired,
  TRACE_ID_HEADER,
  getTraceId,
  isTraceIdAbsent,
} from '../utils';

import { identityApiConsumer, UserTokenResponse } from '@pma-connectors/identity-api';
import { setIdentityData, getIdentityData, setColleagueUuid } from './identity-data';
import { getOpenIdSessionId } from '../../oidc-data-extractor';
import { Optional, Plugin } from '../plugin';
import { markApiCall } from '@energon/splunk-logger';

export type Strategy = 'oidc' | 'saml';

export type Config<O> = {
  /**
   * identity client id
   */
  identityClientId: string;

  /**
   * identity secret in
   */
  identityClientSecret: string;

  /**
   * onelogin strategy: oidc or saml
   */
  strategy: Strategy;

  /**
   * optional, if it returns false, code in the plugin won't be executed
   * E.g. check if another cookie exists
   * defaults to ()=>true
   */
  shouldRun?: (request: Request, response: Response) => boolean;

  /**
   * Tesco API environment descriptor
   */
  apiEnv: () => ApiEnv;

  /**
   * Endpoint path
   * E.v. /identity/v4/token-swap
   */
  path?: string;

  /**
   * optional, cookie configuration object
   * if not present, data won't be saved in the cookie
   * if maxAge is not present, expiration claims will be used instead
   */
  cookieConfig?: PluginCookieConfig & {
    /**
     * optional, method that will determine the shape of the data saved in the cookie
     */
    cookieShapeResolver?: (data: UserTokenResponse) => O;
  };
};

/**
 * A plugin middleware to be used in onelogin.
 * It swaps the oidc or saml token for the identity access token.
 */
export const identityTokenSwapPlugin = <O>(config: Config<O> & Optional): Plugin => {
  const plugin: Plugin = async (req: Request, res: Response) => {
    // init plugin config
    const { identityClientId, identityClientSecret, strategy, shouldRun = () => true, apiEnv, cookieConfig } = config;

    const baseUrl = resolveBaseUrl(TESCO_API_URLS, { apiEnv });

    try {
      if (!!getIdentityData(res) || !shouldRun(req, res)) {
        return;
      }

      if (cookieConfig) {
        clearPluginCookiesIfSessionExpired(req, res, {
          ...cookieConfig,
        });

        const { secret, cookieName, compressed } = cookieConfig;
        const data = getDataFromCookie<UserTokenResponse>(req, {
          cookieName,
          secret,
          compressed,
        });

        if (data && data.claims.sub) {
          setIdentityData(res, data);
          setColleagueUuid(res, data.claims.sub);
          return;
        }
      }

      const credentials = Buffer.from(`${identityClientId}:${identityClientSecret}`).toString('base64');
      const baseHeaders = {
        Authorization: () => `Basic ${credentials}`,
        Accept: () => 'application/vnd.tesco.identity.tokenresponse.v4claims+json',
      };

      const api = identityApiConsumer({
        baseUrl,
        baseHeaders,
      });

      const traceId = getTraceId(req);
      if (isTraceIdAbsent(req)) {
        req.headers[TRACE_ID_HEADER] = traceId;
      }
      res?.logs &&
        (res.logs.markApiCallEnd = markApiCall(res)({
          traceId,
          tescoTraceId: traceId,
          requestUrl: req.url,
          requestBody: req.body,
          params: req.params,
        }));

      const data = await api.exchangeUserToken({
        body: {
          grant_type: 'token_exchange',
          trusted_token: getIdentitySwapToken(res, strategy),
          identity_provider: 'onelogin',
          token_type: strategy,
          scope: 'internal public',
        },
      });

      // Identity API subject, aka colleagueUUID;
      const sub = data.claims.sub;

      if (cookieConfig) {
        const { cookieShapeResolver = (data: any) => data } = cookieConfig;

        // OneLogin unique identifier of session of end user
        const sid = getOpenIdSessionId(res);
        const payload = { ...cookieShapeResolver(data), sid };

        const identityTokenMaxAge = getMaxAge(data.claims);
        const identityAccessTokenCookie = {
          ...cookieConfig,
          maxAge: identityTokenMaxAge,
        };

        // set access token cookie
        setDataToCookie(res, payload, identityAccessTokenCookie);

        setIdentityData(res, payload);
        setColleagueUuid(res, sub);
      } else {
        setIdentityData(res, data);
        setColleagueUuid(res, sub);
      }
    } catch (e) {
      if (cookieConfig) {
        clearCookie(res, cookieConfig);
      }
      throw e;
    }
  };

  plugin.info = 'Identity Swap User Token plugin';
  plugin.optional = config.optional || false;

  return plugin;
};
