// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { createNewFeedback } from './actions';

export const createNewFeedbackEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createNewFeedback.request)),
    switchMap(() =>
      from(api.createNewFeedback()).pipe(
        map(createNewFeedback.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(createNewFeedback.failure(errors?.[0]));
        }),
      ),
    ),
  );

export default combineEpics(createNewFeedbackEpic);
