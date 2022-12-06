import fetch from 'node-fetch';

import { Request, Response, Router } from 'express';

import { isPROD, ProcessConfig } from '../config';
import { getColleagueInboxApiConfig } from './my-inbox/api-config';
import { extractAuthToken } from './proxy';

export const healthCheckMiddleware = (processConfig: ProcessConfig) => {
  const router = Router();

  router.get('/_status', async (req, res) => {
    const { status, version, checked } = await getHealthCheck(processConfig, req, res);

    res.send({ status, version, checked });
  });

  router.get('/_healthcheck', async (req, res) => {
    const healthStatus = await getHealthCheck(processConfig, req, res);

    res.send(healthStatus);
  });

  return router;
};

const getHealthCheck = async (processConfig: ProcessConfig, req: Request, res: Response) => {
  const authToken = extractAuthToken(req, res);

  const requests = [
    pmaApiCheck(processConfig, authToken),
    inboxApiCheck(processConfig, authToken),
    processConfig.apiIdentityServerUrl() ? identityApiCheck(processConfig, authToken) : undefined,
  ];

  const results = await Promise.all(requests.filter((el) => el));

  const status = results.find((result) => ['Fail', 'Degraded'].includes(result?.status)) ? 'Fail' : 'Ok';

  return {
    status,
    version: processConfig.releaseName(),
    components: results,
    checked: new Date().toISOString(),
  };
};

const pmaApiCheck = async (processConfig: ProcessConfig, authToken?: string) => {
  const apiUrl = processConfig.apiServerUrl();

  return fetch(apiUrl + '/_status', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((result) => result.json())
    .then((result) => ({
      name: 'pmaAPI',
      type: 'DEPENDENCY',
      description: 'PMA API',
      checked: new Date().toISOString(),
      status: result?.status || 'Fail',
      version: result?.version,
    }));
};

const inboxApiCheck = async (processConfig: ProcessConfig, authToken?: string) => {
  const configEnvironment = isPROD(processConfig.environment()) ? 'prod' : processConfig.environment();
  const apiUrl = getColleagueInboxApiConfig(configEnvironment).server;

  return fetch(apiUrl + '/_status', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((result) => result.json())
    .then((result) => ({
      name: 'myInboxAPI',
      type: 'DEPENDENCY',
      description: 'My Inbox API',
      checked: new Date().toISOString(),
      status: result?.status || 'Fail',
      version: result?.version,
    }));
};

const identityApiCheck = async (processConfig: ProcessConfig, authToken?: string) => {
  const apiUrl = processConfig.apiIdentityServerUrl();

  return fetch(apiUrl + '/_status', {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((result) => result.json())
    .then((result) => ({
      name: 'identityAPI',
      type: 'DEPENDENCY',
      description: 'Identity API',
      checked: new Date().toISOString(),
      status: result?.status || 'Fail',
      version: result?.version,
    }));
};
