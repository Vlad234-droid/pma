import httpClient from '../config/client';

const domain = '/schema';

export const getSchema = (params?: any) => {
  return httpClient.get(`${domain}/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6`, { params: { ...params } });
};
