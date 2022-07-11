import httpClient from '../config/client';

const domain = '/cms';

export const getContentEntries = (params: any) => {
  return httpClient.get(`${domain}/content-entries`, { params });
};

export const getHelpFaqs = (params: any) => {
  return httpClient.get(`${domain}/help-faqs`, { params });
};

export const getMenuData = (params: any) => {
  const { entryType, tenant } = params;

  return httpClient.get(`${domain}/content-entries?entry-type_eq=menu&key_like=${entryType}/${tenant}`);
};
