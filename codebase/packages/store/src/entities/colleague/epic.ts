// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getColleagueByUuid } from './actions';

export const getColleagueByUuidEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueByUuid.request)),
    switchMap(({ payload }) => {
      return forkJoin({
        colleague: api.getColleagueByUuid(payload),
        cycles: api.getPerformanceCyclesByStatuses({
          colleagueUuid: payload.colleagueUuid,
          params: {
            'colleague-cycle-status_in': ['STARTED', 'FINISHED', 'FINISHING', 'COMPLETED'],
          },
        }),
      }).pipe(
        //@ts-ignore
        map(({ colleague, cycles }: any) => {
          const result = {
            [payload.colleagueUuid]: {
              ...colleague.data,
              cycles:
                cycles.data.map(({ endTime, startTime, uuid, type, status }) => ({
                  endTime,
                  startTime,
                  uuid,
                  type,
                  status,
                })) || [],
            },
          };
          return getColleagueByUuid.success(result);
        }),
        catchError(({ errors }) => of(getColleagueByUuid.failure(errors))),
      );
    }),
  );

export default combineEpics(getColleagueByUuidEpic);
