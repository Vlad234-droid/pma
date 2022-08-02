// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

import {
  createProfileAttribute,
  getCurrentUser,
  getCurrentUserMetadata,
  updateProfileAttribute,
  updateUserNotification,
} from './actions';

const NUMBER_OF_DEFAULT_ATTRIBUTES = 18;

export const getCurrentUserEpic: Epic = (action$, _, { openapi }) =>
  action$.pipe(
    filter(isActionOf(getCurrentUser.request)),
    switchMap(() =>
      from(openapi.user.getMe()).pipe(
        // @ts-ignore
        tap(({ data }) => {
          // @ts-ignore
          const profileAttributes = data?.profileAttributes;
          if (!profileAttributes || profileAttributes.length < NUMBER_OF_DEFAULT_ATTRIBUTES) {
            // @ts-ignore
            openapi.config.updateDefaultAttributes({ colleagueUuid: data?.colleague.colleagueUUID });
          }
        }),
        // @ts-ignore
        map(({ data }) => {
          return getCurrentUser.success(data);
        }),
        catchError((e) => {
          const { status, data } = e || {};
          if (status >= 500) {
            // @ts-ignore
            return of(getCurrentUser.failure({ code: 'SERVER_ERROR' }));
          }

          const errors = data?.errors;
          return of(getCurrentUser.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getCurrentUser.cancel)))),
      ),
    ),
  );

export const getUserMetadataEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getCurrentUser.success)),
    //@ts-ignore
    switchMap(({ payload: { colleague } }) => {
      return from(api.getColleagueMetadata({ colleagueUuid: colleague.colleagueUUID })).pipe(
        //@ts-ignore
        map(({ data }) => getCurrentUserMetadata.success(data)),
        catchError((e) => {
          const { data } = e || {};
          const errors = data?.errors;
          return of(getCurrentUserMetadata.failure(errors?.[0]));
        }),
      );
    }),
  );

export const createProfileAttributeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createProfileAttribute.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.createProfileAttribute(payload)).pipe(
        //@ts-ignore
        mergeMap(({ data }) => from([createProfileAttribute.success(data)])),
      ),
    ),
  );

export const updateProfileAttributeEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateProfileAttribute.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.updateProfileAttribute(payload)).pipe(
        //@ts-ignore
        mergeMap(({ data }) => {
          return from([updateProfileAttribute.success(data)]);
        }),
      ),
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
  getUserMetadataEpic,
  updateUserNotificationEpic,
  createProfileAttributeEpic,
  updateProfileAttributeEpic,
);
