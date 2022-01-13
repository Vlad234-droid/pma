import httpClient from '../config/client';

export const getSchema = (params: any = {}) => {
  const { colleagueUuid, ...restParams } = params;
  return httpClient.get(`/colleagues/${colleagueUuid}/metadata`, { params: restParams });
};
