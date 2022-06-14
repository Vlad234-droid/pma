import { createAsyncAction, createAction } from 'typesafe-actions';

export const createFolderNotes = createAsyncAction(
  'notes/CREATE_FOLDER_REQUEST',
  'notes/CREATE_FOLDER_SUCCESS',
  'notes/CREATE_FOLDER_FAILURE',
)<any, any, Error>();

export const getFoldersNotes = createAsyncAction(
  'notes/GET_FOLDERS_NOTES_REQUEST',
  'notes/GET_FOLDERS_NOTES_SUCCESS',
  'notes/GET_FOLDERS_NOTES_FAILURE',
)<any, any, Error>();

export const getNotes = createAsyncAction(
  'notes/GET_NOTES_REQUEST',
  'notes/GET_NOTES_SUCCESS',
  'notes/GET_NOTES_FAILURE',
)<any, any, Error>();

export const createNote = createAsyncAction(
  'notes/CREATE_NOTE_REQUEST',
  'notes/CREATE_NOTE_SUCCESS',
  'notes/CREATE_NOTE_FAILURE',
)<any, any, Error>();

export const createFolderAndNote = createAsyncAction(
  'notes/CREATE_FOLDER_AND_NOTE_REQUEST',
  'notes/CREATE_FOLDER_AND_NOTE_SUCCESS',
  'notes/CREATE_FOLDER_AND_NOTE_FAILURE',
)<any, any, Error>();

export const deleteNote = createAsyncAction(
  'notes/DELETE_NOTE_REQUEST',
  'notes/DELETE_NOTE_SUCCESS',
  'notes/DELETE_NOTE_FAILURE',
)<any, any, Error>();

export const deleteFolder = createAsyncAction(
  'notes/DELETE_FOLDER_REQUEST',
  'notes/DELETE_FOLDER_SUCCESS',
  'notes/DELETE_FOLDER_FAILURE',
)<any, any, Error>();

export const updateNote = createAsyncAction(
  'notes/UPDATE_NOTE_REQUEST',
  'notes/UPDATE_NOTE_SUCCESS',
  'notes/UPDATE_NOTE_FAILURE',
)<any, any, Error>();

export const updateFolder = createAsyncAction(
  'notes/UPDATE_FOLDER_REQUEST',
  'notes/UPDATE_FOLDER_SUCCESS',
  'notes/UPDATE_FOLDER_FAILURE',
)<any, any, Error>();

export const changeCreatedMeta = createAction('notes/meta/created')<boolean>();

export const Actions = {
  createFolderNotes: createFolderNotes.request,
  getFoldersNotes: getFoldersNotes.request,
  getNotes: getNotes.request,
  createNote: createNote.request,
  createFolderAndNote: createFolderAndNote.request,
  deleteNote: deleteNote.request,
  deleteFolder: deleteFolder.request,
  updateNote: updateNote.request,
  updateFolder: updateFolder.request,
  changeCreatedMeta,
};
