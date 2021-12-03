import httpClient from '../config/client';

// const colleagueUuid = localStorage.getItem('colleagueUuid');

export const createOrgObjective = <T>(params: any) => {
  const domain = `/org-objectives`;
  return httpClient.post(`${domain}`, params);
};

export const createAndPublishOrgObjective = <T>(params: any) => {
  const domain = `/org-objectives/publish`;
  console.log('domain: ', domain);
  console.log(typeof params);
  return httpClient.post(`${domain}`, params);
};

export const publishOrgObjective = <T>(params: any) => {
  const domain = `/org-objectives/publish`;
  return httpClient.put(`${domain}`, params);
};

export const getOrgAuditLogs = <T>(params: any) => {
  const { start, limit } = params;

  const domain = `/audit-logs?_start=${start}&_limit=${limit}`;
  return httpClient.get(`${domain}`);
};

export const getOrgObjectives = <T>() => {
  const domain = `/org-objectives`;
  return httpClient.get(`${domain}`);
};

//auditLogsSelector
