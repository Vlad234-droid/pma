import httpClient from '../config/client';

const getDomain = '/colleagues';
const uploadDomain = '/files';

export const getPreviousReviewFiles = ({ colleagueUUID }) =>
  httpClient.get(`${getDomain}/${colleagueUUID}/reviews/files`);

export const uploadFile = ({ file, metadata }: { file: File; metadata: object }) => {
  const uploadMetadata = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('files', file);
  formData.append('uploadMetadata', uploadMetadata);
  return httpClient.post(`${uploadDomain}`, formData);
};
