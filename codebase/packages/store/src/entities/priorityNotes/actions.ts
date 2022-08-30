import { createAction, createAsyncAction } from 'typesafe-actions';

export const createPriorityNote = createAsyncAction(
  'priority/notes/CREATE_NOTE_REQUEST',
  'priority/notes/CREATE_NOTE_SUCCESS',
  'priority/notes/CREATE_NOTE_FAILURE',
)<any, any, Error>();

export const updatePriorityNote = createAsyncAction(
  'priority/notes/UPDATE_NOTE_REQUEST',
  'priority/notes/UPDATE_NOTE_SUCCESS',
  'priority/notes/UPDATE_NOTE_FAILURE',
)<any, any, Error>();

export const deletePriorityNote = createAsyncAction(
  'priority/notes/DELETE_NOTE_REQUEST',
  'priority/notes/DELETE_NOTE_SUCCESS',
  'priority/notes/DELETE_NOTE_FAILURE',
)<any, any, Error>();

export const getPriorityNoteByOwner = createAsyncAction(
  'priority/notes/GET_NOTE_BY_OWNER_REQUEST',
  'priority/notes/GET_NOTE_BY_OWNER_SUCCESS',
  'priority/notes/GET_NOTE_BY_OWNER_FAILURE',
)<any, any, Error>();

export const getPriorityNotesWithReviews = createAsyncAction(
  'priority/notes/GET_NOTES_WITH_REVIEW_REQUEST',
  'priority/notes/GET_NOTES_WITH_REVIEW_SUCCESS',
  'priority/notes/GET_NOTES_WITH_REVIEW_FAILURE',
)<any, any, Error>();

export const clearPriorityNoteMeta = createAction('priority/notes/CLEAR')<undefined>();

export const Actions = {
  createPriorityNote: createPriorityNote.request,
  updatePriorityNote: updatePriorityNote.request,
  deletePriorityNote: deletePriorityNote.request,
  getPriorityNoteByOwnerUuid: getPriorityNoteByOwner.request,
  getPriorityNotesWithReviews: getPriorityNotesWithReviews.request,
  clearPriorityNoteMeta,
};
