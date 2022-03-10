// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, mergeMap } from 'rxjs/operators';
import {
  getProcessTemplate,
  getProcessTemplateMetadata,
  uploadProcessTemplate,
  deleteProcessTemplate,
  deleteAllProcessTemplate,
} from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getProcessTemplateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getProcessTemplate.request)),
    switchMap(({ payload }) =>
      from(api.getFiles(payload)).pipe(
        map(getProcessTemplate.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getProcessTemplate.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Process template fetch error' }),
          );
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
          return concatWithErrorToast(
            of(getProcessTemplateMetadata.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Process template metadata fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getProcessTemplateMetadata.cancel)))),
      ),
    ),
  );

export const uploadProcessTemplateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadProcessTemplate.request)),
    switchMap(({ payload }) => {
      const { file, type } = payload;

      const metadata = {
        uploadMetadataList: [
          {
            path: `cycles`,
            fileName: file.name,
            type,
            status: 'ACTIVE',
            description: 'text templates',
            fileDate: new Date().toISOString(),
          },
        ],
      };

      return from(api.uploadFile({ file, metadata })).pipe(
        mergeMap(() => {
          //@ts-ignore
          return from([uploadProcessTemplate.success(), getProcessTemplate.request()]);
        }),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(uploadProcessTemplate.failure(errors?.[0]));
        }),
        takeUntil(action$.pipe(filter(isActionOf(uploadProcessTemplate.cancel)))),
      );
    }),
  );

export const deleteProcessTemplateEpic: Epic = (action$, _, { openapi }) =>
  action$.pipe(
    filter(isActionOf(deleteProcessTemplate.request)),
    switchMap(({ payload }) => {
      const { deletePayload, processTemplatePayload } = payload;
      const { fileUuid } = deletePayload;
      //@ts-ignore
      return from(openapi.file.delete1({ fileUuid })).pipe(
        //@ts-ignore
        mergeMap(() => {
          //@ts-ignore
          return from([deleteProcessTemplate.success(), getProcessTemplate.request(processTemplatePayload)]);
        }),
        catchError(({ errors }) => of(deleteProcessTemplate.failure(errors))),
      );
    }),
  );
export const deleteAllProcessTemplateEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteAllProcessTemplate.request)),
    switchMap(({ payload }) => {
      const { deletePayload, processTemplatePayload } = payload;

      //@ts-ignore
      return from(api.deleteAllVersionsFile(deletePayload)).pipe(
        //@ts-ignore
        mergeMap(() => {
          //@ts-ignore
          return from([deleteAllProcessTemplate.success(), getProcessTemplate.request(processTemplatePayload)]);
        }),
        catchError(({ errors }) => of(deleteAllProcessTemplate.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getProcessTemplateEpic,
  getProcessTemplateMetadataEpic,
  uploadProcessTemplateEpic,
  deleteProcessTemplateEpic,
  deleteAllProcessTemplateEpic,
);
