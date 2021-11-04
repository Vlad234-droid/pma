import httpClient from '../config/client';

const domain = '/managers';
export const getManagers = (params?: any) => {
  return httpClient.get(`${domain}/10000000-0000-0000-0000-000000000002/reviews`, { params: { ...params } });
};
