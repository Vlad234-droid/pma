import httpClient from '../config/client';

export const getObjective = (params: any = {}) => {
  const { colleagueUuid, type, cycleUuid = 'CURRENT' } = params;
  const domain = `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/reviews`;
  return httpClient.get(`${domain}`);
};

export const getObjectives = <T>(params: any = {}) => {
  const { colleagueUuid, type = 'OBJECTIVE', cycleUuid = 'CURRENT' } = params;
  const domain = `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/reviews`;
  return httpClient.get(`${domain}`, params);
};

export const updateObjective = <T>(params: any = {}) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number, colleagueUuid } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.put(`${domain}`, params);
};

export const approveObjective = <T>(params: any) => {
  // todo performanceCycleUuid ??
  const domain = `/colleagues/${params.colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/statuses/APPROVED`;
  return httpClient.put(`${domain}`, params);
};

export const declineObjective = <T>(params: any) => {
  // todo performanceCycleUuid ??
  const domain = `/colleagues/${params.colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/statuses/DECLINED`;
  return httpClient.put(`${domain}`, params);
};

export const updateObjectives = <T>(params: any = {}) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { colleagueUuid } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE`;
  return httpClient.put(`${domain}`, params);
};

export const createObjective = <T>(params: any = {}) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number } = params;
  const { colleagueUuid } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.post(`${domain}`, params);
};

export const deleteObjective = <T>(params: any = {}) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number } = params;
  const { colleagueUuid } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.delete(`${domain}`);
};

export const getReviewByUuid = (params: any) => {
  const { uuid } = params;
  const domain = `/reviews/${uuid}`;
  return httpClient.get(`${domain}`);
};
