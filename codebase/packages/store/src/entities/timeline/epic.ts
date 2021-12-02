// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getTimeline } from './actions';

export const getTimelineEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getTimeline.request)),
    switchMap(({ payload }) =>
      from(api.getTimeline(payload)).pipe(
        map(getTimeline.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getTimeline.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getTimeline.cancel)))),
      ),
    ),
  );

export default combineEpics(getTimelineEpic);
