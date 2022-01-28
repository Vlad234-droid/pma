import httpClient from '../config/client';

const domain = '/files';
export const getFiles = (params: any) => {
  return httpClient.get(domain, { params });
};

export const getProcessTemplateMetadata = (params?: any) => {
  const { fileUuid } = params;
  return httpClient.get(`/pm-cycles/files/${fileUuid}/metadata`, { params: { ...params } });
};
