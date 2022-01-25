import httpClient from '../config/client';

const reportDomain = `/reports/overall-rating`;

export const getSchema = (params: any = {}) => {
  const { colleagueUuid, ...restParams } = params;
  return httpClient.get(`/colleagues/${colleagueUuid}/metadata`, { params: restParams });
};

export const getOverallRating = <T>(params: any = {}) => {
  const { fields } = params;

  return httpClient.get(reportDomain, { params: fields });
};
