import httpClient from '../config/client';

const domain = '/colleagues/suggestions';
const colleagues = '/colleagues';

export const getColleagues = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};

export const getObjectivesReviews = (params: any) => {
  const { code, colleagueUuid } = params;
  return httpClient.get(`${colleagues}/${colleagueUuid}/pm-cycles/CURRENT/review-codes/${code}/reviews`);
};

export const getProfileColleague = (params: any) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}`);
};

export const getColleague = (params: { colleagueUuid: string }) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${colleagues}/${colleagueUuid}`);
};
