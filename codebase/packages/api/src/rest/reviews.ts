import httpClient from '../config/client';

export const getReviews = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    searchParams,
  } = params;
  const uri = code
    ? `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`
    : `colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`;
  return httpClient.get(uri, { params: searchParams });
};

export const createReview = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;
  const firstElement = data.shift();
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.post(uri, firstElement);
};

export const updateReview = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
    data,
  } = params;

  const firstElement = data.shift();
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.put(uri, firstElement);
};

export const updateReviews = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
    files,
    metadata,
  } = params;

  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/reviews`;
  const formData = new FormData();
  const uploadMetadata = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
  formData.append('reviews', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (files?.length) {
    formData.append('files', files);
  }
  if (metadata?.uploadMetadataList?.length) {
    formData.append('uploadMetadata', uploadMetadata);
  }

  return httpClient.put(uri, formData);
};

export const deleteReview = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', number },
  } = params;

  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/numbers/${number}/reviews`;
  return httpClient.delete(uri);
};

export const updateReviewStatus = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT', status },
    data,
  } = params;
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/${status}/reviews`;
  return httpClient.put(uri, data);
};

export const approveReview = (params: any = {}) => {
  const {
    pathParams: { colleagueUuid = '', code, cycleUuid = 'CURRENT' },
    data,
  } = params;
  const uri = `/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/statuses/APPROVED/reviews`;
  return httpClient.put(uri, data);
};

export const declineReview = (params: any = {}) => {
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
