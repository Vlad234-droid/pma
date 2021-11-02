import httpClient from '../config/client';

export const getObjective = (params?: any) => {
  const domain =
    'colleagues/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/performance-cycles/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/review-types/OBJECTIVE/reviews';
  return httpClient.get(`${domain}`, { params: { ...params } });
};

export const getObjectives = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const colleagueUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const performanceCycleUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';

  const domain = `colleagues/${colleagueUuid}/performance-cycles/${performanceCycleUuid}/review-types/OBJECTIVE/reviews`;
  return httpClient.get(`${domain}`, params);
};

export const updateObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const colleagueUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const performanceCycleUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const { number } = params;

  const domain = `/colleagues/${colleagueUuid}/performance-cycles/${performanceCycleUuid}/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.put(`${domain}`, params);
};

export const updateObjectives = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const colleagueUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const performanceCycleUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';

  const domain = `/colleagues/${colleagueUuid}/performance-cycles/${performanceCycleUuid}/review-types/OBJECTIVE`;
  return httpClient.put(`${domain}`, params);
};

export const createObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const colleagueUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const performanceCycleUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const { number } = params;

  const domain = `/colleagues/${colleagueUuid}/performance-cycles/${performanceCycleUuid}/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.post(`${domain}`, params);
};

export const deleteObjective = <T>(params: any) => {
  // todo colleagueUuid performanceCycleUuid ??
  const colleagueUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const performanceCycleUuid = 'd158ebc0-d97d-4b2e-9e34-4bbb6099fdc6';
  const { number } = params;

  const domain = `/colleagues/${colleagueUuid}/performance-cycles/${performanceCycleUuid}/review-types/OBJECTIVE/numbers/${number}`;
  return httpClient.delete(`${domain}`);
};
