import httpClient from '../config/client';

const colleagueUuid = localStorage.getItem('colleagueUuid');
//const colleagueUuid = '10000000-0000-0000-0000-000000000001';

export const getObjective = (params?: any) => {
  const domain = 'colleagues/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/pm-cycles/CURRENT/review-types/OBJECTIVE/reviews';
  return httpClient.get(`${domain}`, { params: { ...params } });
};

export const getObjectives = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const id = params?.colleagueUuid || colleagueUuid;
  const domain = `colleagues/${id}/pm-cycles/CURRENT/review-types/OBJECTIVE/reviews`;
  return httpClient.get(`${domain}`, params);
};

export const updateObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number } = params;
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

export const updateObjectives = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE`;
  return httpClient.put(`${domain}`, params);
};

export const createObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.post(`${domain}`, params);
};

export const deleteObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const { number } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/CURRENT/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.delete(`${domain}`);
};

export const getReviewByUuid = (params: any) => {
  const { uuid } = params;
  const domain = `/reviews/${uuid}`;
  return httpClient.get(`${domain}`);
};
