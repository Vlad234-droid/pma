import React from 'react';

import { Request, Response, NextFunction } from 'express';

import { OneloginError } from '@energon/onelogin';

import { ssr, SorryPage, SorryPageProps } from '@dex-ddl/core';

type ErrorHandlerParams = Omit<SorryPageProps, 'type'>;

export const errorHandler =
  ({ appName, logoutPath, tryAgainPath, username }: ErrorHandlerParams) =>
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (OneloginError.is(error) && error.status === 403) {
      ssr({
        render: () => (
          <SorryPage
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
    } else {
      ssr({
        render: () => (
          <SorryPage
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
