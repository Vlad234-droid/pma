import httpClient from '../config/client';

const domain = '/pm-linked-objective-report';

export const getObjectivesReport = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};
