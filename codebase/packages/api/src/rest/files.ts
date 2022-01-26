import httpClient from '../config/client';

const domain = '/files';
export const getBPMNFiles = (params?: any) => {
  return httpClient.get(`${domain}?type=1`, { params: { ...params } });
};

export const getProcessTemplateMetadata = (params?: any) => {
  const { fileUuid } = params;
  return httpClient.get(`/pm-cycles/files/${fileUuid}/metadata`, { params: { ...params } });
};
