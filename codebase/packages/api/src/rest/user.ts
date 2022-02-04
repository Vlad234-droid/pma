import httpClient from '../config/client';

const usersDomain = '/users';

const colleaguesDomain = '/colleagues';

export const getColleagueByUuid = (params: any = {}) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${colleaguesDomain}/${colleagueUuid}`, { params: { ...params } });
};

export const updateUserNotification = (params: any = {}) => {
  // TODO: update payload and epic. split params and query params
  const { colleagueUuid } = params?.[0];
  return httpClient.put(`${colleaguesDomain}/${colleagueUuid}/attributes`, params);
};
export const createProfileAttribute = (params: any) => {
  const [tone] = params;
  return httpClient.post(`${colleaguesDomain}/${tone.colleagueUuid}/attributes`, params);
};

export const updateProfileAttribute = (params: any) => {
  const [tone] = params;
  return httpClient.put(`${colleaguesDomain}/${tone.colleagueUuid}/attributes`, params);
};

export const getCurrentUser = (params: any = {}) => httpClient.get(`${usersDomain}/me`, { params: { ...params } });

export const getUserByIamId = (iamId: string) => httpClient.get(`${usersDomain}/iam-ids/${iamId}`);
