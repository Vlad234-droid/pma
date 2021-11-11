import httpClient from '../config/client';

const colleagueUuid = localStorage.getItem('colleagueUuid');

const domain = '/colleagues';
export const getTimeline = (params?: any) => {
  return httpClient.get(`${domain}/${colleagueUuid}/timeline`, { params: { ...params } });
};
