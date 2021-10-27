import httpClient from '../config/client';

const domain = '/colleagues';

export const getCurrentUser = (params?: any) => {
  return httpClient.get(`${domain}/10000000-0000-0000-0000-000000000001`, { params: { ...params } });
};

export const getUserByIamId = (iamId: string) => httpClient.get(`${domain}/${iamId}`);
