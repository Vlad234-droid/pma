import httpClient from '../config/client';

const domain = '/reports';

export const getObjectivesReport = (params: any) => {
  return httpClient.get(`${domain}/linked-objective-report`, { params });
};

export const getReviewStatistics = <T extends string>(params: { year: T; 'review-type_in': Array<T> }) => {
  return httpClient.get(`${domain}/statistics-reviews`, { params });
};

export const getOverallRatingsStatistics = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-overall-ratings`, { params });
};

export const getNewToBusinessStatistics = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-new-to-business`, { params });
};

export const getFeedbacksStatistics = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-feedbacks`, { params });
};

export const getAnniversaryReviewsStatistics = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-anniversary-reviews`, { params });
};

export const getLeadershipReviewsStatistics = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-leadership-reviews`, { params });
};

export const getColleaguesReview = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-reviews/colleagues`, { params });
};

export const getColleaguesOverallRatings = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-overall-ratings/colleagues`, { params });
};

export const getColleaguesNewToBusiness = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-new-to-business/colleagues`, { params });
};

export const getColleaguesFeedbacks = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-feedbacks/colleagues`, { params });
};

export const getColleaguesAnniversaryReviews = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-anniversary-reviews/colleagues`, { params });
};

export const getColleaguesLeadershipReviews = <T extends string>(params: { year: T }) => {
  return httpClient.get(`${domain}/statistics-leadership-reviews/colleagues`, { params });
};
