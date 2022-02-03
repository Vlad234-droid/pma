// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getMessages, getMessagesCount, updateMessage } from './actions';

export const getMessagesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getMessages.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getMessages(payload)).pipe(
        // @ts-ignore
        map((data) => {
          return getMessages.success(data);
        }),
        catchError(({ errors }) => of(getMessages.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getMessages.cancel)))),
      );
    }),
  );

export const getMessagesCountEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getMessagesCount.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getMessagesCount(payload)).pipe(
        // @ts-ignore
        map((data) => {
          return getMessagesCount.success(data);
        }),
        catchError(({ errors }) => of(getMessagesCount.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getMessagesCount.cancel)))),
      );
    }),
  );

export const updateMessageEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateMessage.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.updateMessage(payload)).pipe(
        //@ts-ignore
        map(() => {
          return updateMessage.success(payload);
        }),
        catchError(({ errors }) => of(updateMessage.failure(errors))),
      );
    }),
  );

export default combineEpics(getMessagesEpic, getMessagesCountEpic, updateMessageEpic);