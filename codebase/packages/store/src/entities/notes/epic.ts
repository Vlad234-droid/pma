// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  createFolderNotes,
  getFoldersNotes,
  getNotes,
  createNote,
  createFolderAndNote,
  createFolderAndUpdateNotes,
  deleteNote,
  deleteFolder,
  updateNote,
  updateFolder,
} from './actions';

export const createFolderNotesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createFolderNotes.request)),
    switchMap(({ payload }) => {
      const { ownerColleagueUuid } = payload;
      //@ts-ignore
      return from(api.createFolderNotes(payload)).pipe(
        //@ts-ignore
        mergeMap(() => {
          //@ts-ignore
          return from([
            createFolderNotes.success(payload?.created),
            getFoldersNotes.request({ ownerId: ownerColleagueUuid }),
          ]);
        }),
        catchError(({ errors }) => of(createFolderNotes.failure(errors))),
      );
    }),
  );

export const createFolderAndNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createFolderAndNote.request)),
    switchMap(({ payload }) => {
      const { folder, note } = payload;
      //@ts-ignore
      return from(api.createFolderNotes(folder)).pipe(
        //@ts-ignore
        mergeMap(({ data }) => {
          const { id } = data;
          //@ts-ignore
          return from([createFolderNotes.success(), createNote.request({ ...note, folderUuid: id })]);
        }),

        catchError(({ errors }) => of(createFolderNotes.failure(errors))),
      );
    }),
  );

export const createFolderAndUpdateNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createFolderAndUpdateNotes.request)),
    switchMap(({ payload }) => {
      const { folder, note } = payload;
      //@ts-ignore
      return from(api.createFolderNotes(folder)).pipe(
        //@ts-ignore
        mergeMap(({ data }) => {
          const { id } = data;

          //@ts-ignore
          return from([createFolderNotes.success(), updateNote.request({ ...note, folderUuid: id })]);
        }),

        catchError(({ errors }) => of(createFolderAndUpdateNotes.failure(errors))),
      );
    }),
  );

export const createNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createNote.request)),
    switchMap(({ payload }) => {
      const { ownerColleagueUuid } = payload;
      //@ts-ignore
      return from(api.createNote(payload)).pipe(
        //@ts-ignore
        mergeMap(() => from([createNote.success(), getFoldersNotes.request({ ownerId: ownerColleagueUuid })])),
        catchError(({ errors }) => of(getFoldersNotes.failure(errors))),
      );
    }),
  );

export const deleteNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteNote.request)),
    switchMap(({ payload }) => {
      const { ownerColleagueUuid } = payload;
      const { noteId } = payload;
      //@ts-ignore
      return from(api.deleteNote(noteId)).pipe(
        //@ts-ignore
        mergeMap(() => from([deleteNote.success(), getFoldersNotes.request({ ownerId: ownerColleagueUuid })])),
        catchError(({ errors }) => of(deleteNote.failure(errors))),
      );
    }),
  );
export const deleteFolderEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deleteFolder.request)),
    switchMap(({ payload }) => {
      const { ownerColleagueUuid } = payload;
      const { folderId } = payload;
      //@ts-ignore
      return from(api.deleteFolder(folderId)).pipe(
        //@ts-ignore
        mergeMap(() => from([deleteFolder.success(), getFoldersNotes.request({ ownerId: ownerColleagueUuid })])),
        catchError(({ errors }) => of(deleteFolder.failure(errors))),
      );
    }),
  );

export const getFoldersNotesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getFoldersNotes.request)),
    switchMap(({ payload }) => {
      const { ownerId } = payload;
      //@ts-ignore
      return from(api.getFoldersNotess(payload)).pipe(
        //@ts-ignore
        tap(async ({ data }) => {
          if (!data.length) {
            await Promise.all([
              api.createFolderNotes({ ownerColleagueUuid: ownerId, title: 'PERSONAL_FOLDER' }),
              api.createFolderNotes({ ownerColleagueUuid: ownerId, title: 'TEAM_FOLDER' }),
              api.createFolderNotes({ ownerColleagueUuid: ownerId, title: 'ARCHIVED_FOLDER' }),
              api.createFolderNotes({ ownerColleagueUuid: ownerId, title: 'TEAM_ARCHIVED_FOLDER' }),
            ]);
          }
        }),
        //@ts-ignore
        mergeMap(({ data }) => {
          if (!data.length) return of(getFoldersNotes.request(payload));
          return from([getFoldersNotes.success(data), getNotes.request(payload)]);
        }),
        catchError(({ errors }) => of(getFoldersNotes.failure(errors))),
      );
    }),
  );

export const getNotesEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getNotes.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getNotes(payload)).pipe(
        //@ts-ignore
        map(({ data }) => getNotes.success(data)),
        catchError(({ errors }) => of(getNotes.failure(errors))),
      );
    }),
  );

export const updateNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateNote.request)),
    switchMap(({ payload }) => {
      const { ownerColleagueUuid } = payload;
      //@ts-ignore
      return from(api.updateNote(payload)).pipe(
        //@ts-ignore
        mergeMap(() => from([updateNote.success(), getFoldersNotes.request({ ownerId: ownerColleagueUuid })])),
        catchError(({ errors }) => of(updateNote.failure(errors))),
      );
    }),
  );

export const updateFolderEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updateFolder.request)),
    switchMap(({ payload }) => {
      const { folder, notes } = payload;

      //@ts-ignore
      return from(api.updateFolder(folder)).pipe(
        //@ts-ignore
        mergeMap(() => {
          if (!notes.length) return from([getFoldersNotes.request({ ownerId: folder.ownerColleagueUuid })]);
          return from(
            notes.map((note) => {
              return updateNote.request(note);
            }),
          );
        }),

        catchError(({ errors }) => of(updateFolder.failure(errors))),
      );
    }),
  );

export default combineEpics(
  createFolderNotesEpic,
  getNotesEpic,
  getFoldersNotesEpic,
  createNoteEpic,
  createFolderAndNoteEpic,
  createFolderAndUpdateNoteEpic,
  deleteNoteEpic,
  deleteFolderEpic,
  updateNoteEpic,
  updateFolderEpic,
);
