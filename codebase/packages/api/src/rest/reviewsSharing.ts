import httpClient from '../config/client';
import { GetAllSharedColleagueReviewsParams, ShareColleagueReviewsParams } from './reviewsSharingTypes';

const domain = '/colleagues';

export const stopSharingColleagueReviews = ({ colleagueUuid, cycleUuid, code }: ShareColleagueReviewsParams) => {
  return httpClient.delete(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/sharing`);
};

export const checkColleagueReviewsShared = ({ colleagueUuid, cycleUuid, code }: ShareColleagueReviewsParams) => {
  return httpClient.get(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/sharing`);
};

export const getAllSharedReviews = ({ colleagueUuid, code }: GetAllSharedColleagueReviewsParams) => {
  return httpClient.get(`${domain}/${colleagueUuid}/review-codes/${code}/sharing`);
};

export const shareColleagueReviews = ({ colleagueUuid, cycleUuid, code }: ShareColleagueReviewsParams) => {
  return httpClient.post(`${domain}/${colleagueUuid}/pm-cycles/${cycleUuid}/review-codes/${code}/sharing`);
};
