// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { ReviewType, Status } from '@pma/client/src/config/enum';

import { getColleagueSchema, getSchema, getSchemaWithColleaguePermission } from './actions';
import { addStrategicObjectiveInForms, getPermittedForms, convertFormsJsonToObject } from '../../utils/formExpression';
import { colleagueUUIDSelector } from '../../selectors';

export const getSchemaEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getSchema.request)),
    switchMap(({ payload: { includeForms = true, ...rest } }) =>
      from(api.getColleagueMetadata({ ...rest, includeForms })).pipe(
        // @ts-ignore
        mergeMap(({ success, data: schemaData }) => {
          const state: any = state$.value;

          const schema = of(getSchema.success(schemaData));
          const reviews = of(state?.reviews);

          return forkJoin({ schema, reviews }).pipe(
            // @ts-ignore
            mergeMap((data: any) => {
              const reviews = data?.reviews?.data;
              const schema = data?.schema?.payload;

              const elementCount =
                reviews?.filter((review) => {
                  return review.status === Status.APPROVED && review.type === ReviewType.OBJECTIVE;
                })?.length || 0;

              const updatedForms: any[] = addStrategicObjectiveInForms(
                convertFormsJsonToObject(schema.forms.filter((form) => form)),
                elementCount,
              );
              return of(getSchema.success({ current: { ...schema, forms: updatedForms } }));
            }),
          );
        }),
        catchError(({ errors }) => of(getSchema.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getSchema.cancel)))),
      ),
    ),
  );

export const getColleagueSchemaEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getColleagueSchema.request)),
    mergeMap(({ payload: { includeForms = true, colleagueUuid, cycleUuid } }) =>
      from(api.getColleagueMetadataByPerformanceCycle({ colleagueUuid, cycleUuid, includeForms })).pipe(
        // @ts-ignore
        mergeMap(({ data: schema }) => {
          const updatedForms: any[] = addStrategicObjectiveInForms(
            convertFormsJsonToObject(schema.forms.filter((form) => form)),
            0,
          );
          return of(
            getColleagueSchema.success({
              [colleagueUuid]: { [cycleUuid]: { ...schema, forms: updatedForms } },
              colleagueUuid,
            }),
          );
        }),
        catchError(({ errors }) => of(getColleagueSchema.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getColleagueSchema.cancel)))),
      ),
    ),
  );

export const getSchemaWithColleaguePermissionEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getSchemaWithColleaguePermission.request)),
    switchMap(({ payload: { includeForms = true, ...rest } }) =>
      from(api.getColleagueMetadata({ ...rest, includeForms })).pipe(
        // @ts-ignore
        mergeMap(({ success, data: schemaData }) => {
          const state: any = state$.value;
          const currentColleagueUUID: string = colleagueUUIDSelector(state);
          const requestColleagueUUID: string = rest?.colleagueUuid;
          const users = state?.users;

          const schema = of(getSchema.success(schemaData));
          const reviews = of(state?.reviews);
          const user =
            requestColleagueUUID === currentColleagueUUID
              ? of(users?.current?.info)
              : api.getColleagueByUuid({ colleagueUuid: requestColleagueUUID });

          return forkJoin({ schema, reviews, user }).pipe(
            // @ts-ignore
            mergeMap((data: any) => {
              const user = data?.user?.data;
              const reviews = data?.reviews?.data;
              const schema = data?.schema?.payload;

              const userRoles: string[] = user?.roles || [];
              const userWorkLevels: string[] =
                user?.colleague?.workRelationships?.map((workRelationship) => workRelationship.workLevel) || [];

              const elementCount =
                reviews?.filter((review) => {
                  return review.status === Status.APPROVED && review.type === ReviewType.OBJECTIVE;
                })?.length || 0;

              const updatedForms: any[] = addStrategicObjectiveInForms(
                getPermittedForms(
                  schema.forms.filter((form) => form),
                  [...userRoles, ...userWorkLevels],
                ),
                elementCount,
              );
              return of(getSchema.success({ current: { ...schema, forms: updatedForms } }));
            }),
          );
        }),
        catchError(({ errors }) => of(getSchema.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getSchema.cancel)))),
      ),
    ),
  );

export default combineEpics(getSchemaEpic, getColleagueSchemaEpic);
