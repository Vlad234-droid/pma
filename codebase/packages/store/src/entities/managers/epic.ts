// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getManagerReviews } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getManagerReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getManagerReviews.request)),
    switchMap(({ payload }) => {
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

export default getManagerReviewsEpic;
