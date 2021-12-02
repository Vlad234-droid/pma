import httpClient from '../config/client';

const domain = '/managers';
export const getManagers = (params?: any) => {
  return httpClient.get(`${domain}/${params.colleagueUuid}/reviews`, { params: { ...params } });
};
