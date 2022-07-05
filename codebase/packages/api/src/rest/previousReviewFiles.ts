import httpClient from '../config/client';

const getDomain = '/colleagues';
const uploadDomain = '/reviews/files';

type GetPreviousReviewFilesParams = {
  colleagueUUID: string;
  reviewUUID?: string;
};

export const getPreviousReviewFiles = ({ colleagueUUID, reviewUUID }: GetPreviousReviewFilesParams) => {
  const URL = reviewUUID
    ? `${getDomain}/${colleagueUUID}/reviews/${reviewUUID}/files`
    : `${getDomain}/${colleagueUUID}/reviews/files`;

  return httpClient.get(URL);
};

export const uploadFile = ({ file, metadata, reviewUUID }: { file: File; metadata: object; reviewUUID?: string }) => {
  const URL = reviewUUID ? `/reviews/${reviewUUID}/files` : uploadDomain;
  const uploadMetadata = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('files', file);
  formData.append('uploadMetadata', uploadMetadata);
  return httpClient.post(URL, formData);
};
