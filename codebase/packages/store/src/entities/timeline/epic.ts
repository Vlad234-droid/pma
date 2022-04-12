// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import { getTimeline } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';
import { addModalError } from '../appState/actions';

export const getTimelineEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getTimeline.request)),
    switchMap(({ payload }) =>
      from(api.getTimeline(payload)).pipe(
        mergeMap((response) => {
          //@ts-ignore
          if (!response.data.length) {
            return of(
              addModalError({
                title: 'timeline_is_empty',
                description: 'you_dont_have_access_to_pma',
              }),
              //@ts-ignore
              getTimeline.success({ success: response?.success, [payload.colleagueUuid]: response?.data }),
            );
          }
          // @ts-ignore
          return of(getTimeline.success({ success: response?.success, [payload.colleagueUuid]: response?.data }));
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
