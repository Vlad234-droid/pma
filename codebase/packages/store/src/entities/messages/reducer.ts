import { createReducer } from 'typesafe-actions';
import { getMessages, getMessagesCount, updateMessage } from './actions';

export const initialState = {
  messages: [],
  meta: {
    loading: false,
    loaded: false,
    error: null,
    numberOfElements: 0,
    pageNumber: 0,
    pageSize: 0,
    totalElements: 0,
    titalPages: 0,
    currentCount: 0,
  },
};

export default createReducer(initialState)
  .handleAction(getMessages.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getMessages.success, (state, { payload }) => {
    const { messages, ...meta } = payload;
    return {
      ...state,
      messages,
      meta: { ...state.meta, ...meta, loading: false, loaded: true },
    };
  })
  .handleAction(getMessages.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(getMessagesCount.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(getMessagesCount.success, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, currentCount: payload.count, loading: false, loaded: true },
  }))
  .handleAction(getMessagesCount.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }))
  .handleAction(updateMessage.request, (state) => ({
    ...state,
    meta: { ...state.meta, loading: true },
  }))
  .handleAction(updateMessage.success, (state, payload) => ({
    ...state,
    messages: state.messages.filter(({ id }) => id == payload.id),
    meta: { ...state.meta, loading: false, loaded: true },
  }))
  .handleAction(updateMessage.failure, (state, { payload }) => ({
    ...state,
    meta: { ...state.meta, loading: false, loaded: true, error: payload },
  }));
