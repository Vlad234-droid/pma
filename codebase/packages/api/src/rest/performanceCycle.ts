import httpClient from '../config/client';

const performanceCyclesDomain = '/pm-cycles/';

export const getGetAllPerformanceCycles = () => {
  return httpClient.get(`${performanceCyclesDomain}`);
};

export const getPerformanceCycleByUuid = (params: any) => {
  const { performanceCycleUuid, ...restParams } = params;
  return httpClient.get(`${performanceCyclesDomain}/${performanceCycleUuid}`, { params: restParams });
};

export const createPerformanceCycle = <T>(params: any) => {
  return httpClient.post(`${performanceCyclesDomain}`, params);
};

export const updatePerformanceCycle = <T>(params: any) => {
  return httpClient.put(`${performanceCyclesDomain}/${params.uuid}`, params);
};

export const publishPerformanceCycle = <T>(params: any) => {
  return httpClient.post(`${performanceCyclesDomain}/publish`, params);
};
