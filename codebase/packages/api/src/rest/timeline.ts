import httpClient from '../config/client';

const domain = '/colleagues';

export const getTimeline = (params: { colleagueUuid: string; cycleUuid: string }) => {
  const { colleagueUuid, cycleUuid } = params;
  return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/timeline`);
};
