import httpClient from '../config/client';

const domain = '/reports/linked-objective-report/formats/excel';

export const getObjectivesReport = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};
