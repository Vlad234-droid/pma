import httpClient from '../config/client';

const domain = '/colleagues';
const colleagueUuid = localStorage.getItem('colleagueUuid');

export const getCurrentUser = (params?: any) => {
  return httpClient.get(`${domain}/${colleagueUuid}`, { params: { ...params } });
};

export const updateUserNotification = (params: any) => {
  return httpClient.put(`${domain}/${colleagueUuid}/attributes`, params);
};

export const getUserByIamId = (iamId: string) => httpClient.get(`${domain}/${iamId}`);
