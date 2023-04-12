//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const messagesSelector = (state: RootState) => state.messages || {};

export const getMessagesCount = createSelector(messagesSelector, ({ currentCount }: any) => currentCount || 0);
