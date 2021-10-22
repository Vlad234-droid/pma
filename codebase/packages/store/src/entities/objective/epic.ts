// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';

import { createObjective, updateObjective, getObjective } from './actions';

export const getObjectiveEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getObjective.request)),
    switchMap(() =>
      from(api.getObjective()).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          return getObjective.success(data);
        }),
        catchError(({ errors }) => of(getObjective.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getObjective.cancel)))),
      ),
    ),
  );

export const updateObjectiveEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateObjective.request)),
    switchMap(({ payload }) => {
      const { status } = payload;
      const { objectives } = state$.value;
      const { currentObjectives } = objectives;
      const mapObjectives = [];
      Object.values(currentObjectives).forEach((val) => {
        // @ts-ignore
        mapObjectives.push({ properties: { mapJson: val }, status });
      });
      console.log('data_data', payload);
      return from(api.createObjective(mapObjectives)).pipe(
        // @ts-ignore
        map(({ data }) => {
          return updateObjective.success({ success: true, data });
        }),
        catchError(({ errors }) => of(updateObjective.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(updateObjective.cancel)))),
      );
    }),
  );

export default combineEpics(getObjectiveEpic, updateObjectiveEpic);
