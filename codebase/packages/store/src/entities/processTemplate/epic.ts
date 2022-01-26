// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { getProcessTemplate, getProcessTemplateMetadata, uploadProcessTemplate } from './actions';

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
      from(
        // @ts-ignore
        api.getProcessTemplateMetadata({
          ...payload,
          includeForms: payload?.includeForms ? payload?.includeForms : true,
        }),
      ).pipe(
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

export const uploadProcessTemplateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadProcessTemplate.request)),
    switchMap(({ payload }) => {
      const { file } = payload;
      const metadata = {
        uploadMetadataList: [
          {
            path: `cycles`,
            fileName: file.name,
            type: {
              id: "1",
              code: 'BPMN',
              description: 'Business Process Model file',
            },
            status: 'ACTIVE',
            description: 'text templates',
            fileDate: new Date().toISOString(),
          },
        ],
      };
      return from(api.uploadFile({ file, metadata })).pipe(
        map(getProcessTemplate.request),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(uploadProcessTemplate.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(uploadProcessTemplate.cancel)))),
      );
    }),
  );

export default combineEpics(
  getProcessTemplateEpic,
  getProcessTemplateMetadataEpic,
  uploadProcessTemplateEpic,
);
