import httpClient from '../config/client';

const domain = '/colleagues';

export const getColleagues = (params: any) => {
  return httpClient.get(`${domain}/suggestions`, { params });
};

export const getColleagueMetadata = (config: any) => {
  const { colleagueUuid, ...params } = config || {};
  return httpClient.get(`${domain}/${colleagueUuid}/metadata`, { params });
};

export const getColleagueMetadataByPerformanceCycle = (config: any) => {
  const { colleagueUuid, cycleUuid, ...params } = config || {};
  return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/metadata`, { params });
};

export const getColleagueByUuid = (config: any) => {
  const { colleagueUuid, ...params } = config || {};
  return httpClient.get(`${domain}/${colleagueUuid}`, { params });
};

export const getObjectivesReviews = (params: any) => {
  const { code, colleagueUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/CURRENT/review-codes/${code}/reviews`);
};

export const getProfileColleague = (params: any) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${domain}/suggestions/${colleagueUuid}`);
};

export const getColleague = (params: { colleagueUuid: string }) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}`);
};

export const getColleaguePerformanceCyclesByStatuses = ({
  colleagueUuid,
  allowedStatuses,
}: {
  colleagueUuid: string;
  allowedStatuses: string[];
}) =>
  httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/`, { params: { allowedStatuses: allowedStatuses.toString() } });
