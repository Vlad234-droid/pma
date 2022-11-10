// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

import {
  createReview,
  deleteReview,
  getColleagueReviews,
  getReviews,
  updateReview,
  updateReviews,
  updateReviewStatus,
  getReviewByUuid,
  updateRatingReview,
  getReviewsWithNotes,
} from './actions';
import { getTimeline } from '../timeline/actions';
import { getManagerReviews } from '../managers/actions';
import { getPriorityNotesWithReviews } from '../priorityNotes/actions';

export const getReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReviews.request)),
    switchMap(({ payload }) =>
      // @ts-ignore
      from(api.getReviews(payload)).pipe(
        map(({ success, data, errors }: any) => {
          if (!success) {
            return getReviews.failure(new Error(errors[0].message));
          }
          return getReviews.success({ data });
        }),
        catchError(({ errors }) => of(getReviews.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getReviews.cancel)))),
      ),
    ),
  );

export const getColleagueReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueReviews.request)),
    switchMap(({ payload }) =>
      // @ts-ignore
      from(api.getReviews(payload)).pipe(
        mergeMap(({ data }: any) =>
          from([
            getColleagueReviews.success({
              colleagueReviews: { [payload.pathParams.colleagueUuid as string]: data },
              data,
            }),
            getReviews.success({ data }),
          ]),
        ),
        catchError(({ errors }) => of(getColleagueReviews.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getColleagueReviews.cancel)))),
      ),
    ),
  );

export const getReviewsWithNotesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReviewsWithNotes.request)),
    switchMap(({ payload }) =>
      // @ts-ignore
      from(api.getReviews(payload)).pipe(
        mergeMap(({ data }: any) =>
          from([
            getPriorityNotesWithReviews.request({ data, colleagueUuid: payload.pathParams.colleagueUuid }),
            getReviewsWithNotes.success({ data }),
          ]),
        ),
        catchError(({ errors }) => of(getReviewsWithNotes.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getReviewsWithNotes.cancel)))),
      ),
    ),
  );

export const updateReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateReview.request)),
    switchMap(({ payload }) => {
      // @ts-ignore
      return from(api.updateReview(payload)).pipe(
        // @ts-ignore
        mergeMap(({ data }) => from([updateReview.success(data), getTimeline.request(payload.pathParams)])),
        catchError(({ errors }) => of(updateReview.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(updateReview.cancel)))),
      );
    }),
  );

export const createReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createReview.request)),
    switchMap(({ payload }: any) => {
      // @ts-ignore
      return from(api.createReview(payload)).pipe(
        mergeMap(({ data }: any) => from([createReview.success(data), getTimeline.request(payload.pathParams)])),
        catchError(({ errors }) => of(createReview.failure(errors))),
      );
    }),
  );

export const updateReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateReviews.request)),
    switchMap(({ payload }: any) =>
      // @ts-ignore
      from(api.updateReviews(payload)).pipe(
        mergeMap(({ data }: any) => from([updateReviews.success({ data }), getTimeline.request(payload.pathParams)])),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(updateReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Something went wrong' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(updateReviews.cancel)))),
      ),
    ),
  );

export const deleteReviewEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteReview.request)),
    switchMap(({ payload }: any) => {
      // @ts-ignore
      return from(api.deleteReview(payload)).pipe(
        mergeMap(({ data }: any) =>
          from([
            deleteReview.success({ ...payload }),
            getReviews.request({
              ...payload,
              data,
            }),
            getTimeline.request(payload.pathParams),
          ]),
        ),
        catchError(({ errors }) => of(deleteReview.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(deleteReview.cancel)))),
      );
    }),
  );

export const updateReviewStatusEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(updateReviewStatus.request)),
    switchMap(({ payload }: any) => {
      const { updateParams, ...params } = payload;
      // @ts-ignore
      return from(api.updateReviewStatus(params)).pipe(
        mergeMap(() => {
          const { approverUuid, colleagueUuid, cycleUuid } = payload.pathParams;
          return from([
            getManagerReviews.request({ colleagueUuid: approverUuid, ...updateParams }),
            updateReviewStatus.success(payload),
            getReviews.request({
              pathParams: { colleagueUuid, cycleUuid },
            }),
          ]);
        }),
        catchError((e) => {
          const data = e?.data;
          return concatWithErrorToast(
            of(updateReviewStatus.failure(data?.errors?.[0] || data?.error)),
            errorPayloadConverter({ ...data?.errors?.[0], title: 'Update review status error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(updateReviewStatus.cancel)))),
      );
    }),
  );
};

export const getReviewByUuidEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getReviewByUuid.request)),
    mergeMap(({ payload }) => {
      return from(api.getReviewByUuid(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getReviewByUuid.success(data);
        }),
        catchError(({ data }) => of(getReviewByUuid.failure(data?.errors || data))),
      );
    }),
  );

export const updateRatingReviewEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateRatingReview.request)),
    switchMap(({ payload }) =>
      // @ts-ignore
      from(api.getOverallRating(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          const { reviews }: any = { ...state$.value };
          const reviewsData = reviews?.data || [];
          const reviewType = payload?.type;
          const reviewNumber = payload?.number;
          const reviewsUpdated = reviewsData.map((review) => {
            if (reviewType === review.type && reviewNumber === review.number && review?.properties) {
              review.properties = { ...review.properties, ...data };
            }
            return review;
          });
          if (!reviewsUpdated?.filter((review) => reviewType === review.type)?.length) {
            reviewsUpdated.push({ type: reviewType, number: reviewNumber, properties: { ...data } });
          }
          return updateRatingReview.success({ data: reviewsUpdated });
        }),
        catchError(({ errors }) => of(updateRatingReview.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(updateRatingReview.cancel)))),
      ),
    ),
  );

export default combineEpics(
  getReviewsEpic,
  getColleagueReviewsEpic,
  getReviewsWithNotesEpic,
  updateReviewEpic,
  createReviewEpic,
  updateReviewsEpic,
  deleteReviewEpic,
  updateReviewStatusEpic,
  getReviewByUuidEpic,
  updateRatingReviewEpic,
);
