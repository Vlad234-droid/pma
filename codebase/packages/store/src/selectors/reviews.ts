import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType, Status } from '@pma/client/src/config/enum';
import { objectivesSelector } from './objectives';

//@ts-ignore
export const reviewsSelector = (state: RootState) => state.reviews;

export const reviewsMetaSelector = createSelector(reviewsSelector, ({ meta }) => meta);
export const getAllReviews = createSelector(reviewsSelector, ({ data }) => data);
export const getAllColleagueReviews = createSelector(reviewsSelector, ({ colleagueReviews }) => colleagueReviews);

export const filterReviewsByTypeSelector = (reviewType: ReviewType) =>
  createSelector(reviewsSelector, (reviews: any) => {
    return reviews?.data?.filter((review) => review.type === reviewType) || [];
  });

export const getReviewByTypeSelector = (reviewType: ReviewType) =>
  createSelector(
    reviewsSelector,
    (reviews: any) =>
      reviews?.data?.filter((review) => review.type === reviewType)?.map((review) => review.properties.mapJson) || [],
  );

export const getReviewPropertiesSelector = (reviewType: ReviewType) =>
  createSelector(filterReviewsByTypeSelector(reviewType), (reviews: any) => {
    const mapReviews = {};
    if (reviews?.length) {
      reviews?.forEach((review) => {
        if (review?.properties?.mapJson) {
          mapReviews[review.number] = review.properties.mapJson;
        }
      });
    }

    return mapReviews;
  });

export const getNextReviewNumberSelector = (reviewType: ReviewType) =>
  createSelector(filterReviewsByTypeSelector(reviewType), (reviews: any) => {
    if (reviews?.length) {
      const number = reviews[reviews?.length - 1].number;
      return number + 1;
    }

    return 1;
  });

export const isReviewsInStatus = (reviewType: ReviewType) => (status: Status) =>
  createSelector(filterReviewsByTypeSelector(reviewType), (reviews: any) => {
    const statuses = reviews?.map((review) => review.status);
    statuses.every((elem) => {
      return elem === status;
    });

    return statuses.every((elem) => elem === status);
  });

export const hasStatusInReviews = (reviewType: ReviewType, status: Status) =>
  createSelector(filterReviewsByTypeSelector(reviewType), (reviews: any) => {
    return reviews?.map((review) => review.status).some((elem) => elem === status);
  });
