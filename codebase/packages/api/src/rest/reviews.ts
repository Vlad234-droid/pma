import httpClient from '../config/client';

export const getReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    searchParams,
  } = params;
  const uri = code
    ? `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`
    : `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`;
  return httpClient.get(uri, { params: searchParams });
};

export const createReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;
  const firstElement = data.shift();
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.post(uri, firstElement);
};

export const updateReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;

  const firstElement = data.shift();
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.put(uri, firstElement);
};

export const updateReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;

  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`;
  return httpClient.put(uri, data);
};

export const deleteReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
  } = params;

  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.delete(uri);
};

export const updateReviewStatus = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', status },
    data,
  } = params;
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/${status}/reviews`;
  return httpClient.put(uri, data);
};

export const approveReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/APPROVED/reviews`;
  return httpClient.put(uri, data);
};

export const declineReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/DECLINED/reviews`;
  return httpClient.put(uri, data);
};

export const getReviewByUuid = (params: any) => {
  const { uuid } = params;
  const uri = `/reviews/${uuid}`;
  return httpClient.get(uri);
};
