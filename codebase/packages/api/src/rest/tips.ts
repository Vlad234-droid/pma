import httpClient from '../config/client';

const domain = '/tips';

export const getAllTips = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};
