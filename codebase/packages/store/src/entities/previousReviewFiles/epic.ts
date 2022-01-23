// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getPreviousReviewFiles, uploadFile } from './actions';

export const getPreviousReviewFilesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPreviousReviewFiles.request)),
    switchMap(() =>
      from(api.getPreviousReviewFiles()).pipe(
        map(getPreviousReviewFiles.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getPreviousReviewFiles.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getPreviousReviewFiles.cancel)))),
      ),
    ),
  );

export const uploadFileEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadFile.request)),
    switchMap(({ payload }) =>
      from(api.uploadFile(payload)).pipe(
        map(getPreviousReviewFiles.request),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(uploadFile.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(uploadFile.cancel)))),
      ),
    ),
  );

export default combineEpics(getPreviousReviewFilesEpic, uploadFileEpic);
