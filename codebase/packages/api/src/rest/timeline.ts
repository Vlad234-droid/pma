import httpClient from '../config/client';

const domain = '/processes';
export const getTimeline = (params?: any) => {
  return httpClient.get(`${domain}/10000000-0000-0000-0000-000000000000/timeline`, { params: { ...params } });
};
