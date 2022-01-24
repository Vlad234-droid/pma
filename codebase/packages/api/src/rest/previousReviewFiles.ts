import httpClient from '../config/client';

const domain = '/files';
const previousReviewFileType = 3;

export const getPreviousReviewFiles = () =>
  httpClient.get(`${domain}`, {
    params: { type: previousReviewFileType, includeFileContent: false },
  });

export const uploadFile = ({ file, metadata }: { file: File; metadata: object }) => {
  const uploadMetadata = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('files', file);
  formData.append('uploadMetadata', uploadMetadata);
  return httpClient.post(`${domain}`, formData);
};
