// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
  createNewFeedback,
  readFeedback,
  updatedFeedback,
  getObjectiveReviews,
  getGiveFeedback,
  getRespondFeedback,
  getViewFeedback,
  getRequestedFeedbacks,
  getGivenFeedbacks,
} from './actions';

export const getGivenFeedbacksEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getGivenFeedbacks.request)),
    switchMap(() => {
      //@ts-ignore
      return from(api.getGivenFeedbacks()).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getGivenFeedbacks.success(data);
        }),
        catchError(({ errors }) => of(getGivenFeedbacks.failure(errors))),
      );
    }),
  );
};
export const getRequestedFeedbacksEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getRequestedFeedbacks.request)),
    switchMap(() => {
      //@ts-ignore
      return from(api.getRequestedFeedbacks()).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getRequestedFeedbacks.success(data);
        }),
        catchError(({ errors }) => of(getRequestedFeedbacks.failure(errors))),
      );
    }),
  );
};

export const getGiveFeedbackEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getGiveFeedback.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getFeedbacks(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getGiveFeedback.success(data);
        }),
        catchError(({ errors }) => of(getGiveFeedback.failure(errors))),
      );
    }),
  );
};
export const getViewFeedbackEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getViewFeedback.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getFeedbacks(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getViewFeedback.success(data);
        }),
        catchError(({ errors }) => of(getViewFeedback.failure(errors))),
      );
    }),
  );
};

export const getRespondFeedbackEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getRespondFeedback.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getFeedbacks(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getRespondFeedback.success(data);
        }),
        catchError(({ errors }) => of(getRespondFeedback.failure(errors))),
      );
    }),
  );
};

export const readFeedbackEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(readFeedback.request)),
    switchMap(({ payload }) => {
      return from(api.readFeedback(payload)).pipe(
        map(readFeedback.success),
        catchError(({ errors }) => of(readFeedback.failure(errors))),
      );
    }),
  );
};

export const createNewFeedbackEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createNewFeedback.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.createNewFeedback(payload)).pipe(
        map(createNewFeedback.success),
        catchError(({ errors }) => of(createNewFeedback.failure(errors))),
      );
    }),
  );

export const updateFeedbackEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updatedFeedback.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.updateFeedback(payload)).pipe(
        //@ts-ignore
        map(updatedFeedback.success),
        catchError(({ errors }) => of(createNewFeedback.failure(errors))),
      );
    }),
  );

export const getObjectiveReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjectiveReviews.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getObjectivesRewiews(payload)).pipe(
        //@ts-ignore
        map(({ data }) => getObjectiveReviews.success(data)),
        catchError(({ errors }) => of(getObjectiveReviews.failure(errors))),
      );
    }),
  );

export default combineEpics(
  createNewFeedbackEpic,
  readFeedbackEpic,

  updateFeedbackEpic,
  getObjectiveReviewsEpic,
  getGiveFeedbackEpic,
  getRespondFeedbackEpic,
  getViewFeedbackEpic,
  getRequestedFeedbacksEpic,
  getGivenFeedbacksEpic,
);
