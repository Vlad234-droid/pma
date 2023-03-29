// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import {
  getOrgObjectives,
  createOrgObjective,
  createAndPublishOrgObjective,
  getOrgAuditLogs,
  getOrgPublishedObjectives,
} from './actions';

export const getOrgObjectivesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getOrgObjectives.request)),
    switchMap(() =>
      from(api.getOrgObjectives()).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getOrgObjectives.success(data);
        }),
        catchError(({ errors }) => of(getOrgObjectives.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getOrgObjectives.cancel)))),
      ),
    ),
  );

export const getOrgPublishedObjectivesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getOrgPublishedObjectives.request)),
    switchMap(({ payload }) => {
      return from(api.getOrgPublishedObjectives(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getOrgPublishedObjectives.success(data);
        }),
        catchError(({ errors }) => of(getOrgPublishedObjectives.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getOrgPublishedObjectives.cancel)))),
      );
    }),
  );

export const getOrgAuditLogsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getOrgAuditLogs.request)),
    switchMap(({ payload }) =>
      from(api.getOrgAuditLogs(payload)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getOrgAuditLogs.success(data);
        }),
        catchError(({ errors }) => of(getOrgAuditLogs.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getOrgAuditLogs.cancel)))),
      ),
    ),
  );

// try to optimiz in future
export const getOrgAuditLogsOnPublishEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createOrgObjective.success) || isActionOf(createAndPublishOrgObjective.success)),
    switchMap(() =>
      from(api.getOrgAuditLogs({ start: 0, limit: 3 })).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getOrgAuditLogs.success(data);
        }),
        catchError(({ errors }) => of(getOrgAuditLogs.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getOrgAuditLogs.cancel)))),
      ),
    ),
  );

// try to optimiz in future
export const getOrgAuditLogsOnCreateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createAndPublishOrgObjective.success)),
    switchMap(() =>
      from(api.getOrgAuditLogs({ start: 0, limit: 3 })).pipe(
        // @ts-ignore
        map(({ data }) => {
          return getOrgAuditLogs.success(data);
        }),
        catchError(({ errors }) => of(getOrgAuditLogs.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getOrgAuditLogs.cancel)))),
      ),
    ),
  );

export const createOrgObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createOrgObjective.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createOrgObjective(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return createOrgObjective.success(data);
        }),
        catchError(({ errors }) => of(createOrgObjective.failure(errors))),
      );
    }),
  );

export const createAndPublishOrgObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createAndPublishOrgObjective.request)),
    switchMap(({ payload }) => {
      const { data } = payload;
      return from(api.createAndPublishOrgObjective(data)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return createAndPublishOrgObjective.success(data);
        }),
        catchError(({ errors }) => of(createAndPublishOrgObjective.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getOrgObjectivesEpic,
  getOrgPublishedObjectivesEpic,
  createOrgObjectiveEpic,
  getOrgAuditLogsEpic,
  createAndPublishOrgObjectiveEpic,
  getOrgAuditLogsOnPublishEpic,
  getOrgAuditLogsOnCreateEpic,
);
