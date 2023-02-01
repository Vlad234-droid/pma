import httpClient from '../config/client';

const domain = '/colleagues';

export const getColleagues = (params: any) => {
  return httpClient.get(`${domain}/suggestions`, { params });
};

export const getColleagueMetadata = (config: any) => {
  const { colleagueUuid, cycleUuid, ...params } = config || {};
  if (cycleUuid) {
    return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/metadata`, { params });
  }
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

export const getPerformanceCyclesByStatuses = ({
  colleagueUuid,
  params,
}: {
  colleagueUuid: string;
  params: Record<string, any>;
}) => httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/`, { params });

export const getColleagueCyclesByPmCycleUuid = ({
  cycleUuid,
  colleagueUuid,
  params,
}: {
  cycleUuid: string;
  colleagueUuid: string;
  params: any;
}) => httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/colleague-cycles`, { params });
