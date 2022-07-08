import httpClient from '../config/client';

const domain = '/reports';

export const getObjectivesReport = (params: any) => {
  return httpClient.get(`${domain}/linked-objective-report`, { params });
};

export const getObjectivesStatistics = (params: any) => {
  return httpClient.get(`${domain}/statistics-report`, { params });
};
export const getTargetingColleagues = (params: any) => {
  return httpClient.get(`${domain}/targeting-colleagues`, { params });
};
export const getTargetingFeedbacks = (params: any) => {
  return httpClient.get(`${domain}/targeting-feedbacks`, { params });
};
