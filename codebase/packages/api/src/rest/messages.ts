import httpClient from '../config/myInboxClient';

const domain = '/messages';

export const getMessages = (params?: any) => {
  // console.log(`==> MY-INBOX: getMessages`);
  return httpClient.get(domain, { params });
};

export const getMessagesCount = (params?: any) => {
  // console.log(`==> MY-INBOX: getMessagesCount`);
  return httpClient.get(`${domain}/count`, { params });
};

export const updateMessage = (params?: any) => {
  const { messageUuid } = params;
  // console.log(`==> MY-INBOX: updateMessage(${messageUuid})`);
  return httpClient.put(`${domain}/${messageUuid}`, params);
};
