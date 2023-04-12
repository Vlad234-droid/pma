import httpClient from '../config/myInboxClient';

const domain = '/messages';

export const getMessagesCount = (params?: any) => {
  return httpClient.get(`${domain}/count`, { params });
};
