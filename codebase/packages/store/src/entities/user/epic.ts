// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, mergeMap } from 'rxjs/operators';

import { getCurrentUser, updateUserNotification, createProfileAttribute, updateProfileAttribute } from './actions';

export const getCurrentUserEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCurrentUser.request)),
    switchMap(() =>
      from(api.getCurrentUser()).pipe(
        map(getCurrentUser.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getCurrentUser.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCurrentUser.cancel)))),
      ),
    ),
  );

export const createProfileAttributeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createProfileAttribute.request)),
    //@ts-ignore
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.createProfileAttribute(payload)).pipe(
        mergeMap(() =>
          //@ts-ignore
          from([createProfileAttribute.success({}), getCurrentUser.request()]),
        ),
      ),
    ),
  );

export const updateProfileAttributeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateProfileAttribute.request)),
    //@ts-ignore
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.updateProfileAttribute(payload)).pipe(map(updateProfileAttribute.success)),
    ),
  );

export const updateUserNotificationEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateUserNotification.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.updateUserNotification(payload)).pipe(
        map(getCurrentUser.request),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(updateUserNotification.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(updateUserNotification.cancel)))),
      ),
    ),
  );

export default combineEpics(
  getCurrentUserEpic,
  updateUserNotificationEpic,
  createProfileAttributeEpic,
  updateProfileAttributeEpic,
);
