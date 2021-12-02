import httpClient from '../config/client';

export const getReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT' },
    searchParams,
  } = params;
  const domain = type
    ? `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/reviews`
    : `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`;
  return httpClient.get(`${domain}`, { params: searchParams });
};

export const createReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT', number },
    data,
  } = params;
  const firstElement = data.shift();
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/numbers/${number}`;
  return httpClient.post(`${domain}`, firstElement);
};

export const updateReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT', number },
    data,
  } = params;

  const firstElement = data.shift();
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/numbers/${number}`;
  return httpClient.put(`${domain}`, firstElement);
};

export const updateReviews = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT' },
    data,
  } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}`;
  return httpClient.put(`${domain}`, data);
};

export const deleteReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT', number },
  } = params;

  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/numbers/${number}`;
  return httpClient.delete(`${domain}`);
};

export const updateReviewStatus = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT', status },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/statuses/${status}`;
  return httpClient.put(`${domain}`, data);
};

export const approveReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/statuses/APPROVED`;
  return httpClient.put(`${domain}`, data);
};

export const declineReview = <T>(params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', type, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const domain = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-types/${type}/statuses/DECLINED`;
  return httpClient.put(`${domain}`, data);
};
