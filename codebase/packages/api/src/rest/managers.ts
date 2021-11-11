import httpClient from '../config/client';

const colleagueUuid = localStorage.getItem('colleagueUuid');

const domain = '/managers';
export const getManagers = (params?: any) => {
  return httpClient.get(`${domain}/${colleagueUuid}/reviews`, { params: { ...params } });
};
