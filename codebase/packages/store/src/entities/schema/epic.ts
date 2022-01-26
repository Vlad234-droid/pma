// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';

import { ReviewType, Status } from '@pma/client/src/config/enum';

import { getSchema, updateRatingSchema } from './actions';
import { addStrategicObjectiveInForms, addOverallRatingInForms, getPermittedForms } from '../../utils/formExpression';
import { colleagueUUIDSelector } from '../../selectors';

export const updateRatingSchemaEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(updateRatingSchema.request)),
    switchMap(({ payload }) =>
      // @ts-ignore
      from(api.getOverallRating(payload)).pipe(
        // @ts-ignore
        map(({ success, data }) => {
          const state: any = state$.value;
          // forms in schema already filtered with permission
          const {
            schema: { current: currentSchema },
          } = state;

          const updatedForms: any[] = addOverallRatingInForms(currentSchema.forms, data?.overall_rating);

          return updateRatingSchema.success({ current: { ...currentSchema, forms: updatedForms } });
        }),
        catchError(({ errors }) => of(getSchema.failure(errors))),
        takeUntil(action$.pipe(filter(isActionOf(getSchema.cancel)))),
      ),
    ),
  );

export const getSchemaEpic: Epic = (action$, state$, { api }) =>
  action$.pipe(
    filter(isActionOf(getSchema.request)),
    switchMap(({ payload }) =>
      from(api.getSchema({ ...payload, includeForms: payload?.includeForms ? payload?.includeForms : true })).pipe(
        // @ts-ignore
        mergeMap(({ success, data: schemaData }) => {
          const state: any = state$.value;
          const currentColleagueUUID: string = colleagueUUIDSelector(state);
          const requestColleagueUUID: string = payload?.colleagueUuid;
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
                getPermittedForms(schema.forms, [...userRoles, ...userWorkLevels]),
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

export default combineEpics(getSchemaEpic, updateRatingSchemaEpic);
