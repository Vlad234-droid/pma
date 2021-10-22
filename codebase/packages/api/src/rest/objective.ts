import httpClient from '../config/client';

export const getObjective = (params?: any) => {
  console.log('getObjective_', params);
  const domain =
    'colleagues/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/performance-cycles/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/review-types/OBJECTIVE/reviews';
  return httpClient.get(`${domain}`, { params: { ...params } });
};

export const createObjective = <T>(params: any) => {
  console.log('createObjective', params);
  const domain =
    '/colleagues/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/performance-cycles/d158ebc0-d97d-4b2e-9e34-4bbb6099fdc6/review-types/OBJECTIVE';
  return httpClient.put(`${domain}`, params);
};
