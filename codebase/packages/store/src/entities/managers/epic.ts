// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { from, of } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { catchError, filter, map, mergeMap, takeUntil } from 'rxjs/operators';
import { getManagerReviews, getManagerCalibrations } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getManagerReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getManagerReviews.request)),
    mergeMap(({ payload }) => {
      const { status, ...rest } = payload;
      return from(api.getManagersReviews(rest)).pipe(
        //@ts-ignore
        map(({ data }) => getManagerReviews.success({ [status]: data })),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getManagerReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Managers fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getManagerReviews.cancel)))),
      );
    }),
  );

export const getManagerCalibrationsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getManagerCalibrations.request)),
    mergeMap(({ payload }) => {
      const { status, ...rest } = payload;
      return from(api.getManagersReviews(rest)).pipe(
        //@ts-ignore
        map(({ data }) => getManagerCalibrations.success({ [status]: data })),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getManagerCalibrations.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Managers fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getManagerCalibrations.cancel)))),
      );
    }),
  );

export default combineEpics(getManagerReviewsEpic, getManagerCalibrationsEpic);
