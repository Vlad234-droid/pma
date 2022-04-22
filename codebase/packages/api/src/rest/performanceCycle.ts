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

export const publishPerformanceCycle = (params: any) => {
  return httpClient.post(`${domain}/publish`, params);
};

export const getPerformanceCycleMappingKeys = () => {
  return httpClient.get(`${domain}//mappings/keys`);
};
