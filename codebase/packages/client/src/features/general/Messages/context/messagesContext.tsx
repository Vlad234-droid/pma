import React, { createContext, FC, useContext, useEffect } from 'react';
import { useToast, Variant } from 'features/general/Toast';
import { MessagesActions } from '@pma/store';
import { useDispatch } from 'react-redux';

import { useMessagesCount, useMessages } from '../hooks';
import usePolling from 'hooks/usePolling';
import { Status } from '../types';
import { MAX_SECONDS, MAX_SHOW_TOAST_SECONDS } from '../config';

type MessagesData = {
  count: number;
  messages: any[];
  fetchMessages: () => void;
  fetchMessagesCount: () => void;
};

const defaultData = {
  count: 0,
  messages: [],
  fetchMessages: () => null,
  fetchMessagesCount: () => null,
};

const MessagesContext = createContext<MessagesData>(defaultData);

export const MessagesProvider: FC = ({ children }) => {
  const [messages, fetchMessages] = useMessages({ status: Status.NEW, initFetch: true });
  const [count, fetchMessagesCount] = useMessagesCount({ status: Status.UNREAD, initFetch: true });
  const { addToast } = useToast();

  const dispatch = useDispatch();

  const isTip = (title: string) => title.toLocaleLowerCase().includes('tip');

  useEffect(() => {
    messages.forEach(({ id, title, content }) => {
      addToast({
        id,
        title,
        variant: isTip(title) ? Variant.SUCCESS : Variant.INFO,
        description: content,
        timeout: MAX_SHOW_TOAST_SECONDS,
        onClose: () => {
          dispatch(MessagesActions.updateMessage({ messageUuid: id, messageUpdateAction: Status.READ }));
          setTimeout(() => fetchMessagesCount(), 1000);
        },
      });
    });
  }, [JSON.stringify(messages)]);

  usePolling(fetchMessages, MAX_SECONDS);
  usePolling(fetchMessagesCount, MAX_SECONDS);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        count,
        fetchMessages,
        fetchMessagesCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const MessagesConsumer = MessagesContext.Consumer;
export const useMessagesContext = () => useContext(MessagesContext);

export default MessagesProvider;
