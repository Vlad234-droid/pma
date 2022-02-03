import httpClient from '../config/myInboxClient';

const domain = '/messages';

export const getMessages = (params?: any) => httpClient.get(domain, { params });

export const getMessagesCount = (params?: any) => httpClient.get(`${domain}/count`, { params });

export const updateMessage = (params?: any) => {
  const { messageUuid } = params;
  return httpClient.put(`${domain}/${messageUuid}`, params);
};
