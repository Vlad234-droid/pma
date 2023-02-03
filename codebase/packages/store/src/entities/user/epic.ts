// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs/operators';

import {
  createProfileAttribute,
  getCurrentUser,
  updateProfileAttribute,
  deleteProfileAttribute,
  getPerformanceCycles,
  getColleagueCycles,
} from './actions';
import { getColleagueSchema } from '../schema/actions';

const NUMBER_OF_DEFAULT_ATTRIBUTES = 18;

export const getCurrentUserEpic: Epic = (action$, _, { openapi, api }) =>
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
        mergeMap(({ data }) => {
          return from(
            api.getPerformanceCyclesByStatuses({
              colleagueUuid: (data as any)?.colleague?.colleagueUUID,
              params: {
                'colleague-cycle-status_in': [/*'OPENED_STARTING',*/ 'STARTED', 'FINISHED', 'FINISHING', 'COMPLETED'],
              },
            }),
          ).pipe(
            //@ts-ignore
            mergeMap(({ data: cycles }) => {
              return from([
                getPerformanceCycles.success(
                  cycles.map(({ endTime, startTime, uuid, type, status }) => ({
                    endTime,
                    startTime,
                    uuid,
                    type,
                    status,
                  })),
                ),
                getCurrentUser.success(data),
              ]);
            }),
            catchError((e) => {
              const errors = e?.data?.errors;
              return of(getPerformanceCycles.failure(errors?.[0]), getCurrentUser.success(data));
            }),
          );
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

// export const getUserMetadataEpic: Epic = (action$, _, { api }) =>
//   action$.pipe(
//     filter(isActionOf(getCurrentUser.success)),
//     //@ts-ignore
//     switchMap(({ payload: { colleague } }) => {
//       return from(api.getColleagueMetadata({ colleagueUuid: colleague.colleagueUUID, includeForms: false })).pipe(
//         //@ts-ignore
//         map(({ data }) => getCurrentUserMetadata.success(data)),
//         catchError((e) => {
//           const { data } = e || {};
//           const errors = data?.errors;
//           return of(getCurrentUserMetadata.failure(errors?.[0]));
//         }),
//       );
//     }),
//   );

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

export const updateProfileAttributesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateProfileAttribute.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.updateUserNotification(payload)).pipe(
        //@ts-ignore
        map(({ data }) => updateProfileAttribute.success(data)),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(updateProfileAttribute.failure(errors?.[0]));
        }),
      ),
    ),
  );

export const deleteProfileAttributesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteProfileAttribute.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.deleteProfileAttribute(payload)).pipe(
        //@ts-ignore
        map(({ data }) => deleteProfileAttribute.success(data)),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(deleteProfileAttribute.failure(errors?.[0]));
        }),
      ),
    ),
  );

export const getColleagueCyclesEpic: Epic = (actions$, _, { api }) =>
  actions$.pipe(
    filter(isActionOf(getColleagueCycles.request)),
    //@ts-ignore
    mergeMap(({ payload }) => {
      const colleagueUuid = payload.colleagueUuid;
      const cycleUuid = payload.cycleUuid;

      return from(
        Promise.all([
          api.getColleagueCyclesByPmCycleUuid({
            colleagueUuid,
            cycleUuid,
            params: {
              'colleague-cycle-status_in': ['STARTED', 'FINISHING', 'FINISHED', 'COMPLETED'],
            },
          }),
          api.getColleagueMetadataByPerformanceCycle({ colleagueUuid, cycleUuid }),
        ]),
      ).pipe(
        mergeMap(([colleagueCycles, cyclesMetadata]) => {
          const { endTime, startTime, uuid, type, status } = colleagueCycles.data?.[0] || {};
          const {
            metadata: {
              cycle: { cycleType },
            },
          } = cyclesMetadata.data || {};

          return from([
            getColleagueCycles.success({ endTime, startTime, uuid, type, status, cycleType }),
            getColleagueSchema.success({
              [colleagueUuid]: { [cycleUuid]: { ...cyclesMetadata.data } },
              colleagueUuid,
            }),
          ]);
        }),
      );
    }),
  );

export default combineEpics(
  getCurrentUserEpic,
  // getUserMetadataEpic,
  createProfileAttributeEpic,
  updateProfileAttributesEpic,
  deleteProfileAttributesEpic,
  getColleagueCyclesEpic,
);
