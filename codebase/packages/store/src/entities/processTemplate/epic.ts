// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getProcessTemplate, getProcessTemplateMetadata } from './actions';

export const getProcessTemplateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getProcessTemplate.request)),
    switchMap(() =>
      from(api.getBPMNFiles()).pipe(
        map(getProcessTemplate.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getProcessTemplate.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getProcessTemplate.cancel)))),
      ),
    ),
  );

export const getProcessTemplateMetadataEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getProcessTemplateMetadata.request)),
    switchMap(({ payload }) =>
      from(api.getProcessTemplateMetadata(payload)).pipe(
        // @ts-ignore
        map(({ data }) => getProcessTemplateMetadata.success({ data, fileUuid: payload.fileUuid })),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(getProcessTemplateMetadata.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(getProcessTemplateMetadata.cancel)))),
      ),
    ),
  );

export default combineEpics(getProcessTemplateEpic, getProcessTemplateMetadataEpic);
