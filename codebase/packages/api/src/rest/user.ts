import httpClient from '../config/client';

const usersDomain = '/users';
const colleagueUuid = localStorage.getItem('colleagueUuid');

const colleaguesDomain = '/colleagues';

export const getColleagueByUuid = (params?: any) => {
  return httpClient.get(`${colleaguesDomain}/${colleagueUuid}`, { params: { ...params } });
};

export const updateUserNotification = (params: any) => {
  return httpClient.put(`${colleaguesDomain}/${colleagueUuid}/attributes`, params);
};

export const getCurrentUser = (params?: any) => httpClient.get(`${usersDomain}/me`, { params: { ...params } });

export const getUserByIamId = (iamId: string) => httpClient.get(`${usersDomain}/iam-ids/${iamId}`);
