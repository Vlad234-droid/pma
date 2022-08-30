// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { forkJoin, from, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap } from 'rxjs/operators';
import {
  createPriorityNote,
  updatePriorityNote,
  deletePriorityNote,
  getPriorityNoteByOwner,
  getPriorityNotesWithReviews,
} from './actions';

export const createPriorityNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createPriorityNote.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.createPriorityNote(payload)).pipe(
        //@ts-ignore
        map(({ data }) => createPriorityNote.success(data)),
        catchError(({ data: { errors } }) => of(createPriorityNote.failure(errors))),
      ),
    ),
  );

export const updatePriorityNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(updatePriorityNote.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.updatePriorityNote(payload)).pipe(
        //@ts-ignore
        map(({ data }) => updatePriorityNote.success(data)),
        catchError(({ data: { errors } }) => of(updatePriorityNote.failure(errors))),
      ),
    ),
  );

export const deletePriorityNoteEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(deletePriorityNote.request)),
    switchMap(({ payload }) => {
      const { noteId: id, reviewUuid } = payload;
      //@ts-ignore
      return from(api.deletePriorityNote(payload)).pipe(
        //@ts-ignore
        map(() => deletePriorityNote.success({ reviewUuid, id })),
        catchError(({ data: { errors } }) => of(deletePriorityNote.failure(errors))),
      );
    }),
  );

export const getPriorityNoteByOwnerEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPriorityNoteByOwner.request)),
    switchMap(({ payload }) =>
      //@ts-ignore
      from(api.getPriorityNoteByOwner(payload)).pipe(
        //@ts-ignore
        map(({ data }) => getPriorityNoteByOwner.success(data)),
        catchError(({ data: { errors } }) => of(getPriorityNoteByOwner.failure(errors))),
      ),
    ),
  );

export const getPriorityNotesWithReviewsEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getPriorityNotesWithReviews.request)),
    //@ts-ignore
    switchMap(({ payload }) => {
      const { data, colleagueUuid } = payload;

      const notes = data.map((review) =>
        from(
          api.getPriorityNoteByOwner({
            reviewUuid: review.uuid,
            ownerColleagueUuid: colleagueUuid,
          }),
        ).pipe(catchError(() => of(undefined))),
      );

      return forkJoin(notes).pipe(mergeMap((notes: any) => of(getPriorityNotesWithReviews.success(notes))));
    }),
    catchError(({ errors }) => of(getPriorityNotesWithReviews.failure(errors))),
  );

export default combineEpics(
  createPriorityNoteEpic,
  updatePriorityNoteEpic,
  deletePriorityNoteEpic,
  getPriorityNoteByOwnerEpic,
  getPriorityNotesWithReviewsEpic,
);
