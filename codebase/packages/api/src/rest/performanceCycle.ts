import httpClient from '../config/client';

const domain = '/pm-cycles';

export const getGetAllPerformanceCycles = () => {
  return httpClient.get(`${domain}/`);
};

export const getPerformanceCycleByUuid = (params: any) => {
  const { performanceCycleUuid, ...restParams } = params;
  return httpClient.get(`${domain}/${performanceCycleUuid}`, { params: restParams });
};

export const createPerformanceCycle = (params: any) => {
  return httpClient.post(`${domain}`, params);
};

export const updatePerformanceCycle = (params: any) => {
  return httpClient.put(`${domain}/${params.uuid}`, params);
};

export const updatePerformanceCycleStatus = ({ uuid, status }: { uuid: string; status: string }) => {
  return httpClient.patch(`${domain}/${uuid}/statuses/${status}`);
};

export const deployPerformanceCycle = (uuid: string) => {
  return httpClient.post(`${domain}/${uuid}/deploy`);
};

export const startPerformanceCycle = (uuid: string) => {
  return httpClient.put(`${domain}/${uuid}/start-scheduled`);
};

export const publishPerformanceCycle = (params: any) => {
  return httpClient.post(`${domain}/publish`, params);
};

export const getPerformanceCycleMappingKeys = () => httpClient.get(`${domain}/mappings/keys`);
