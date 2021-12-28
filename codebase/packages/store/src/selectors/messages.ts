//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const messagesSelector = (state: RootState) => state.messages || {};

export const getMessages = createSelector(messagesSelector, ({ messages }: any) => messages);

export const getMessagesCount = createSelector(messagesSelector, ({ meta }: any) => meta?.currentCount || 0);

export const getMessagesByCriteria = ({ filterFn, sortFn, serializer, size }) =>
  createSelector(messagesSelector, ({ messages }: any) => {
    return messages.slice(0, size).filter(filterFn).sort(sortFn).map(serializer);
  });
