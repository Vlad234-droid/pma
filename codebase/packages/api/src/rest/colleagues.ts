import httpClient from '../config/client';

const domain = '/colleagues/suggestions';
const colleagues = '/colleagues';

export const getColleagues = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};

export const getObjectivesRewiews = (params: any) => {
  const { type } = params;
  return httpClient.get(
    `${colleagues}/10000000-0000-0000-0000-000000000001/pm-cycles/CURRENT/review-types/${type}/reviews`,
  );
};
