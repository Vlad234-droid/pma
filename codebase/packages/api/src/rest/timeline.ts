import httpClient from '../config/client';

const domain = '/colleagues';

export const getTimeline = (params: { colleagueUuid: string }) => {
  const { colleagueUuid } = params;
  const cycleUuid = 'CURRENT';
  return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/timeline`);
};
