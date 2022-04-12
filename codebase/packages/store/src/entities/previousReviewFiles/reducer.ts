import { createReducer } from 'typesafe-actions';
import { deleteFile, getPreviousReviewFiles } from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null },
  deleteFileMeta: { loading: false, loaded: false, error: null },
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null } });

const success = (state, { payload }) => ({
  ...state,
  ...payload,
  meta: { ...state.meta, loading: false, loaded: true },
});

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload },
});

const deleteFileRequest = (state) => ({
  ...state,
  deleteFileMeta: { loaded: false, loading: true, error: null },
});

const deleteFileSuccess = (state) => ({
  ...state,
  deleteFileMeta: { loaded: true, loading: false, error: null },
});

const deleteFileFailure = (state, { payload }) => ({
  ...state,
  deleteFileMeta: { loaded: false, loading: false, error: payload },
});

export default createReducer(initialState)
  .handleAction(getPreviousReviewFiles.request, request)
  .handleAction(getPreviousReviewFiles.success, success)
  .handleAction(getPreviousReviewFiles.failure, failure)
  .handleAction(deleteFile.request, deleteFileRequest)
  .handleAction(deleteFile.success, deleteFileSuccess)
  .handleAction(deleteFile.failure, deleteFileFailure);
