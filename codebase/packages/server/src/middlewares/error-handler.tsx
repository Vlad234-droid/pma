import React from 'react';

import { NextFunction, Request, Response } from 'express';

import { OneloginError } from '@pma-connectors/onelogin';

import { ssr, SorryPageProps } from '@dex-ddl/core';
import { SorryPageWrapper } from './error-page';

export const errorHandler =
  ({ appName, logoutPath, tryAgainPath, username }: Omit<SorryPageProps, 'type'>) =>
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log(` ==>  APP ERROR HANDLER (headersSent: ${res.headersSent}): `, error);

    if (OneloginError.is(error) && error.status === 403) {
      ssr({
        render: () => (
          <SorryPageWrapper
            type='forbidden'
            appName={appName}
            logoutPath={logoutPath}
            tryAgainPath={tryAgainPath}
            username={username}
          />
        ),
        title: 'Access forbidden!',
        status: 403,
      })(req, res, next);
    } else if (OneloginError.is(error) && error.status === 401) {
      ssr({
        render: () => (
          <SorryPageWrapper
            type='custom'
            appName={appName}
            logoutPath={logoutPath}
            tryAgainPath={tryAgainPath}
            username={username}
          >
            <>Your session expired</>
          </SorryPageWrapper>
        ),
        title: 'Session expired',
        status: 401,
      })(req, res, next);
    } else {
      ssr({
        render: () => (
          <SorryPageWrapper
            type='sorry'
            appName={appName}
            logoutPath={logoutPath}
            tryAgainPath={tryAgainPath}
            username={username}
          />
        ),
        title: 'Sorry page',
        status: 500,
      })(req, res, next);
    }
  };
