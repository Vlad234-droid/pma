import httpClient from '../config/client';

const colleagueUuid = localStorage.getItem('colleagueUuid');
const domain = `/colleagues/${colleagueUuid}/metadata`;

export const getSchema = (params?: any) => {
  return httpClient.get(`${domain}`, params);
};
