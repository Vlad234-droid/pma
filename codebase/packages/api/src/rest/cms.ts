import httpClient from '../config/client';

const domain = '/cms';

export const getContentEntries = (params: any) => {
  return httpClient.get(`${domain}/content-entries`, { params });
};

export const getHelpFaqs = (params: any) => {
  return httpClient.get(`${domain}/help-faqs`, { params });
};
