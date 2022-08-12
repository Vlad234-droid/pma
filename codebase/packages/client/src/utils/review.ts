import { BASE_URL_API } from 'config/constants';

export const getReviewFileLink = (colleagueUuid: string, fileUuid: string): string =>
  `${BASE_URL_API}/colleagues/${colleagueUuid}/reviews/files/${fileUuid}/download`;
