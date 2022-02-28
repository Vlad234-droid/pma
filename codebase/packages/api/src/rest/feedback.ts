import { AxiosResponse } from 'axios';
import httpClient from '../config/client';

const domain = '/feedbacks';

export const createNewFeedback = (params?: any) => {
  return httpClient.post(`${domain}`, params);
};

export const updateFeedback = (params?: any) => {
  const { uuid } = params;
  return httpClient.put(`${domain}/${uuid}`, params);
};

export const getAllFeedbacks = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};

export const readFeedback = (params: any) => {
  const { uuid } = params;
  return httpClient.put(`${domain}/${uuid}/read`);
};

export const getFeedbacks = (params: any): Promise<AxiosResponse<any>> => {
  return httpClient.get(`${domain}`, { params });
};
