// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { getCompletedReviews } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';
import {
  colleagueCyclesSelector,
  userPerformanceCyclesSelector,
  colleagueUUIDSelector,
  parseSchema,
} from '../../selectors';
import { convertFormsJsonToObject } from '../../utils/formExpression';

export const getCompletedReviewsEpic: Epic = (action$, state, { api }) =>
  action$.pipe(
    filter(isActionOf(getCompletedReviews.request)),

    //@ts-ignore
    mergeMap((data: any) => {
      const colleagueUuid = data.payload.colleagueUuid || colleagueUUIDSelector(state.value);
      const cycles = data.payload.colleagueUuid
        ? colleagueCyclesSelector(data.payload.colleagueUuid)(state.value)
        : userPerformanceCyclesSelector(state.value) || [];
      const cyclesUUID = cycles.map(({ uuid }) => uuid);

      return from(
        Promise.all(
          cyclesUUID.map(async (cycleUuid) => {
            const schema: any = await api.getColleagueMetadataByPerformanceCycle({
              colleagueUuid,
              cycleUuid,
              includeForms: true,
            });
            const reviews = await api.getReviews({ pathParams: { colleagueUuid, cycleUuid } });
            const forms = convertFormsJsonToObject(schema.data.forms);
            const parsedSchema = parseSchema({ ...schema.data, forms });

            return reviews.data.map((review) => ({ ...review, schema: parsedSchema[review.type] }));
          }),
        ),
      ).pipe(
        // @ts-ignore
        map((responsesData) => {
          const data = responsesData
            .flat()
            .filter(({ type, status }) => ['MYR', 'EYR'].includes(type) && status === 'APPROVED');

          return getCompletedReviews.success({ data: data || [] });
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getCompletedReviews.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: errors?.[0].message }),
          );
        }),
      );
    }),
  );

export default combineEpics(getCompletedReviewsEpic);
