import httpClient from '../config/client';

const domain = '/tips';

export const getAllTips = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};

export const getTipHistory = (params: any) => {
  return httpClient.get(`${domain}/${params}/history`);
}

export const createTip = (params: any) => {
  return httpClient.post(`${domain}`, params);
}