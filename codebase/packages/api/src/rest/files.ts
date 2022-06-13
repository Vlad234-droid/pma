import httpClient from '../config/client';

const domain = '/files';
export const getFiles = (params: any) => {
  return httpClient.get(domain, { params });
};

export const getProcessTemplateMetadata = ({ fileUuid, ...params }: any) => {
  return httpClient.get(`/pm-cycles/files/${fileUuid}/metadata`, { params });
};

export const deleteFile = (params: any) => {
  const { fileUuid } = params;
  return httpClient.delete(`/reviews/${domain}/${fileUuid}`);
};
export const deleteAllVersionsFile = (params: any) => {
  return httpClient.delete(`${domain}/versions`, { params });
};
