import fetch from 'node-fetch';
import { release } from 'os';

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

  router.get('/_environment', async (req, res) => {
    const envCheck = await getEnvironmentCheck(processConfig, req, res);

    res.send(envCheck);
  });

  return router;
};
const getEnvironmentCheck = async (processConfig: ProcessConfig, req: Request, res: Response) => {
  const { status, version } = await getHealthCheck(processConfig, req, res);

  const build = {
    artifact: processConfig.artifact(),
    number: processConfig.number(),
    server: processConfig.applicationUrl(),
    version,
    hash: processConfig.hash(),
  };

  const os = { arch: process.arch, name: process.platform, version: release() };

  return {
    status,
    version,
    build,
    os,
  };
};

const getHealthCheck = async (processConfig: ProcessConfig, req: Request, res: Response) => {
  const authToken = extractAuthToken(req, res);

  const requests = [pmaApiCheck(processConfig, authToken), inboxApiCheck(processConfig, authToken)];

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
  try {
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
  } catch (e) {
    console.error('Cannot fetch pma API status', e);
    return {
      name: 'pmaAPI',
      type: 'DEPENDENCY',
      description: 'PMA API',
      checked: new Date().toISOString(),
      status: 'Fail',
    };
  }
};

const inboxApiCheck = async (processConfig: ProcessConfig, authToken?: string) => {
  try {
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
  } catch (e) {
    console.error('Cannot fetch myInbox API status', e);
    return {
      name: 'myInboxAPI',
      type: 'DEPENDENCY',
      description: 'My Inbox API',
      checked: new Date().toISOString(),
      status: 'Fail',
    };
  }
};
