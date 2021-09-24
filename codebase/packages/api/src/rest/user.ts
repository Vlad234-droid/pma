import httpClient from '../config/client';

const domain = '/colleague/v2/colleagues';

export const getCurrentUser = (params?: any) =>
  httpClient.get(`${domain}/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6`, { params: { ...params } });

export const getUserByIamId = (iamId: string) => httpClient.get(`${domain}/${iamId}`);
