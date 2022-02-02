// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getTimeline } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';
import { addModalError } from '../appState/actions';

export const getTimelineEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getTimeline.request)),
    switchMap(({ payload }) =>
      from(api.getTimeline(payload)).pipe(
        map((response) => {
          // @ts-ignore
          if (!response.data.length) {
            return addModalError({
              title: 'timeline_is_empty',
              description: 'you_dont_have_access_to_pma',
            });
          } else {
            return getTimeline.success(response);
          }
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getTimeline.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Timeline fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getTimeline.cancel)))),
      ),
    ),
  );

export default combineEpics(getTimelineEpic);
