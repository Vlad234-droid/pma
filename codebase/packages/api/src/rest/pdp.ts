import httpClient from '../config/client';

export const createPDPGoal = <T>(params: any) => {
  const domain = `/pdp/goals`;
  return httpClient.post(`${domain}`, params);
};

export const deletePDPGoal = <T>(uuid: string) => {
  const domain = `/pdp/goals/${uuid}`;
  return httpClient.delete(`${domain}`);
};

export const updatePDPGoal = <T>(params: any) => {
  const domain = `/pdp/goals`;
  return httpClient.put(`${domain}`, params);
};

export const getPDPGoal = <T>() => {
  const domain = `/pdp/goals`;
  return httpClient.get(`${domain}`);
};

export const getPDPByUUIDGoal = <T>(params: any) => {
  const { uuid } = params;

  const domain = `/pdp/goals/${uuid}`;
  return httpClient.get(`${domain}`);
};

export const getEarlyAchievementDate = () => {
  const domain = '/pdp/goals/early-achievement-date';
  return httpClient.get(`${domain}`);
};
