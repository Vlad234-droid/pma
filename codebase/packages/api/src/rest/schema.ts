import httpClient from '../config/client';

export const getSchema = (params: any = {}) => {
  const { colleagueUuid } = params;
  return httpClient.get(`/colleagues/${colleagueUuid}/metadata`, params);
};
