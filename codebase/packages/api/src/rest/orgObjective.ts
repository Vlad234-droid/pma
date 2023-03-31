import httpClient from '../config/client';
import qs from 'qs';

// const colleagueUuid = localStorage.getItem('colleagueUuid');

export const createOrgObjective = <T>(params: any) => {
  const domain = `/org-objectives`;
  return httpClient.post(`${domain}`, params);
};

export const createAndPublishOrgObjective = <T>(params: any) => {
  const domain = `/org-objectives/publish`;
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

export const getOrgPublishedObjectives = (params) => {
  const domain = `/org-objectives/published`;
  return httpClient.get(`${domain}`, {
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
  });
};

//auditLogsSelector
