import httpClient from '../config/client';

const performanceCyclesDomain = '/pm-cycles/';

export const getGetAllPerformanceCycles = () => {
  return httpClient.get(`${performanceCyclesDomain}`);
};

export const getPerformanceCycleByUuid = (params: any) => {
  return httpClient.get(`${performanceCyclesDomain}/${params.performanceCycleUuid}`);
};

export const createPerformanceCycle = <T>(params: any) => {
  return httpClient.post(`${performanceCyclesDomain}`, params);
};
