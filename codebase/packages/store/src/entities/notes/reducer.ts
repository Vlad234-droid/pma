import { createReducer } from 'typesafe-actions';
import {
  createFolderNotes,
  getFoldersNotes,
  getNotes,
  createNote,
  createFolderAndNote,
  deleteNote,
  deleteFolder,
  updateNote,
  updateFolder,
} from './actions';

export const initialState = {
  notes: [],
  folders: [],
  meta: { loading: false, loaded: false, error: null },
};

export default createReducer(initialState)
  .handleAction(createFolderNotes.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(createFolderNotes.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(createFolderNotes.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(getFoldersNotes.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getFoldersNotes.success, (state, { payload }) => ({
    ...state,
    folders: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(getNotes.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getNotes.success, (state, { payload }) => ({
    ...state,
    notes: payload,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(createNote.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(createNote.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(createFolderAndNote.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(createFolderAndNote.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(deleteNote.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(deleteNote.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(deleteNote.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(deleteFolder.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(deleteFolder.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(deleteFolder.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(updateNote.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(updateNote.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateNote.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))

  .handleAction(updateFolder.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(updateFolder.success, (state) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true },
  }))

  .handleAction(updateFolder.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
