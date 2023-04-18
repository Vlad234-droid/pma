// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getMessagesCount } from './actions';

export const getMessagesCountEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getMessagesCount.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getMessagesCount(payload)).pipe(
        // @ts-ignore
        map((data) => {
          return getMessagesCount.success(data || 0);
        }),
        catchError(({ errors }) => of(getMessagesCount.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getMessagesCount.cancel)))),
      );
    }),
  );

export default getMessagesCountEpic;
