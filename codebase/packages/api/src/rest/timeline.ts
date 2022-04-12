import httpClient from '../config/client';

const domain = '/colleagues';
export const getTimeline = (params: { colleagueUuid: string }) => {
  const { colleagueUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}/timeline`);
};
