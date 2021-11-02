import httpClient from '../config/client';

const domain = '/processes/metadata';

export const getSchema = (params?: any) => {
  // return httpClient.get(`${domain}/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6`, { params: { ...params } });
  return httpClient.get(`${domain}`, {
    params: { 'process-key': 'GROUPS_HO_S_WL1' },
  });
};
