import httpClient from '../config/client';

export const getReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    searchParams,
  } = params;
  const domain = code
    ? `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`
    : `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`;
  return httpClient.get(`${domain}`, { params: searchParams });
};

export const createReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;
  const firstElement = data.shift();
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.post(`${domain}`, firstElement);
};

export const updateReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;

  const firstElement = data.shift();
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.put(`${domain}`, firstElement);
};

export const updateReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`;
  return httpClient.put(`${domain}`, data);
};

export const deleteReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
  } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.delete(`${domain}`);
};

export const updateReviewStatus = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', status },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/${status}/reviews`;
  return httpClient.put(`${domain}`, data);
};

export const approveReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/APPROVED/reviews`;
  return httpClient.put(`${domain}`, data);
};

export const declineReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/DECLINED/reviews`;
  return httpClient.put(`${domain}`, data);
};

export const getReviewByUuid = (params: any) => {
  const { uuid } = params;
  const domain = `/reviews/${uuid}`;
  return httpClient.get(`${domain}`);
};
