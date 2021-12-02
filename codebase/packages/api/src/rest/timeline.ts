import httpClient from '../config/client';

const domain = '/colleagues';
export const getTimeline = (params: any = {}) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}/timeline`);
};
