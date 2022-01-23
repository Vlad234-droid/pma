import httpClient from '../config/client';

const domain = '/files';
const previousReviewFileType = 3;

export const getPreviousReviewFiles = () =>
  httpClient.get(`${domain}`, {
    params: { type: previousReviewFileType, includeFileContent: false },
  });

export const uploadFile = ({ file, colleagueUUID }: { file: File; colleagueUUID: string }) => {
  const obj = {
    uploadMetadataList: [
      {
        path: `/home/${colleagueUUID}/dev`,
        fileName: file.name,
        type: {
          id: previousReviewFileType,
          code: 'PDF',
          description: 'Portable document format file',
        },
        status: 'ACTIVE',
        description: 'text templates',
        fileDate: new Date().toISOString(),
      },
    ],
  };
  const uploadMetadata = new Blob([JSON.stringify(obj)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('files', file);
  formData.append('uploadMetadata', uploadMetadata);
  return httpClient.post(`${domain}`, formData);
};
