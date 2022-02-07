// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { deleteFile, getPreviousReviewFiles, uploadFile } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

export const getPreviousReviewFilesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPreviousReviewFiles.request)),
    switchMap(() =>
      from(api.getPreviousReviewFiles()).pipe(
        map(getPreviousReviewFiles.success),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getPreviousReviewFiles.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Previous review file fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getPreviousReviewFiles.cancel)))),
      ),
    ),
  );

export const uploadFileEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(uploadFile.request)),
    switchMap(({ payload }) => {
      const { colleagueUUID, file } = payload;
      const previousReviewFileType = 3;
      const metadata = {
        uploadMetadataList: [
          {
            path: `/home/${colleagueUUID}/dev`,
            fileName: file.name,
            type: {
              id: previousReviewFileType,
              code: 'PDF',
              description: 'Portable document format file',
            },
            status: 'ACTIVE',
            description: 'text templates',
            fileDate: new Date().toISOString(),
          },
        ],
      };
      return from(api.uploadFile({ file, metadata })).pipe(
        map(getPreviousReviewFiles.request),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(uploadFile.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Upload file error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(uploadFile.cancel)))),
      );
    }),
  );

export const deleteFileEpic: Epic = (action$, _, { openapi }) =>
  action$.pipe(
    filter(isActionOf(deleteFile.request)),
    switchMap(({ payload }) => {
      const { fileUuid } = payload;
      return from(openapi.file.delete1({ fileUuid })).pipe(
        map(getPreviousReviewFiles.request),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(uploadFile.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Delete file error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(uploadFile.cancel)))),
      );
    }),
  );

export default combineEpics(getPreviousReviewFilesEpic, uploadFileEpic, deleteFileEpic);
