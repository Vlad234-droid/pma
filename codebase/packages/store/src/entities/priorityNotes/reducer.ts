import { getReviewsWithNotes } from '../reviews/actions';
import { createReducer } from 'typesafe-actions';
import {
  clearPriorityNoteMeta,
  createPriorityNote,
  deletePriorityNote,
  getPriorityNoteByOwner,
  getPriorityNotesWithReviews,
  updatePriorityNote,
} from './actions';

export const initialState = {
  meta: { loading: false, loaded: false, error: null, success: null, delete: false },
  prioritiesNotes: {},
  linkMap: {},
};

const request = (state) => ({ ...state, meta: { ...state.meta, loading: true, error: null, success: null } });

const failure = (state, { payload }) => ({
  ...state,
  meta: { ...state.meta, loading: false, loaded: true, error: payload, success: false },
});

const success = (state, { payload: obj }) => ({
  ...state,
  prioritiesNotes: { ...state.prioritiesNotes, [obj?.id]: obj && { ...obj } },
  linkMap: { ...state.linkMap, [obj?.reviewUuid]: obj?.id },
  meta: { ...state.meta, loading: false, loaded: true, error: null, success: true },
});

const deleteSuccess = (state, { payload }) => {
  const { [payload.id]: note, ...prioritiesNotes } = { ...state.prioritiesNotes };
  const { [payload.reviewUuid]: reviewUuid, ...linkMap } = { ...state.linkMap };

  return {
    ...state,
    prioritiesNotes: { ...prioritiesNotes },
    linkMap: { ...linkMap },
    meta: { ...state.meta, loading: false, loaded: true, error: null, success: true, delete: true },
  };
};

const getByOwnerSuccess = (state, { payload }) => {
  const [obj] = payload;

  return {
    ...state,
    prioritiesNotes: { ...state.prioritiesNotes, [obj?.id]: obj && { ...obj } },
    linkMap: { ...state.linkMap, [obj?.reviewUuid]: obj?.id },
    meta: { ...state.meta, loading: false, loaded: true, error: null },
  };
};

const getPriorityNotesWithReviewsSuccess = (state, { payload }) => {
  const notes = payload.reduce((acc, { data: [obj] }) => (obj ? { ...acc, [obj?.id]: obj && { ...obj } } : acc), {});
  const map = payload.reduce((acc, { data: [obj] }) => (obj ? { ...acc, [obj?.reviewUuid]: obj?.id } : acc), {});

  return {
    ...state,
    prioritiesNotes: { ...state.prioritiesNotes, ...notes },
    linkMap: { ...state.linkMap, ...map },
    meta: { ...state.meta, loading: false, loaded: true, error: null },
  };
};

export default createReducer(initialState)
  .handleAction(getReviewsWithNotes.request, request)
  .handleAction(createPriorityNote.request, request)
  .handleAction(createPriorityNote.failure, failure)
  .handleAction(createPriorityNote.success, success)
  .handleAction(updatePriorityNote.request, request)
  .handleAction(updatePriorityNote.failure, failure)
  .handleAction(updatePriorityNote.success, success)
  .handleAction(deletePriorityNote.request, request)
  .handleAction(deletePriorityNote.failure, failure)
  .handleAction(deletePriorityNote.success, deleteSuccess)
  .handleAction(getPriorityNoteByOwner.request, request)
  .handleAction(getPriorityNoteByOwner.failure, failure)
  .handleAction(getPriorityNoteByOwner.success, getByOwnerSuccess)
  .handleAction(getPriorityNotesWithReviews.request, request)
  .handleAction(getPriorityNotesWithReviews.failure, failure)
  .handleAction(getPriorityNotesWithReviews.success, getPriorityNotesWithReviewsSuccess)
  .handleAction(clearPriorityNoteMeta, () => initialState);
