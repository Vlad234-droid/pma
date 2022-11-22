// @ts-ignore
import { Epic, isActionOf, RootState } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { getCompletedReviews } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';
import { colleaguePerformanceCyclesSelector, colleagueUUIDSelector } from '../../selectors';

export const getCompletedReviewsEpic: Epic = (action$, state, { api }) =>
  action$.pipe(
    filter(isActionOf(getCompletedReviews.request)),

    switchMap(() => {
      const colleagueUuid = colleagueUUIDSelector(state.value);
      const cycles = colleaguePerformanceCyclesSelector(state.value) || [];
      const cyclesUUID = cycles.map(({ uuid }) => uuid);

      return from(
        Promise.all(cyclesUUID.map((cycleUuid) => api.getReviews({ pathParams: { colleagueUuid, cycleUuid } }))),
      ).pipe(
        // @ts-ignore
        map((responsesData) => {
          const data = responsesData
            .map((apiRequest: any) => apiRequest.data)
            .flat()
            .filter(({ type, status }) => ['MYR', 'EYR'].includes(type) && status === 'APPROVED');

          return getCompletedReviews.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCompletedReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export default combineEpics(getCompletedReviewsEpic);
