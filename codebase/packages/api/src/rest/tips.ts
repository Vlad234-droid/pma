import httpClient from '../config/client';

const domain = '/tips';

export const getAllTips = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};

export const getTipHistory = (uuid: string) => {
  return httpClient.get(`${domain}/${uuid}/history`);
};

export const createTip = (params: any) => {
  return httpClient.post(`${domain}`, params);
};

export const getTipByUuid = (uuid: string) => {
  return httpClient.get(`${domain}/${uuid}`);
};

export const deleteTip = (params: any) => {
  const { uuid, withHistory } = params;
  return httpClient.delete(`${domain}/${uuid}`, { params: { withHistory } });
};
