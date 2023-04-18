import React, { createContext, FC, useContext } from 'react';

import { useMessagesCount } from '../hooks';
import usePolling from 'hooks/usePolling';
import { Status } from '../types';
import { MAX_SECONDS } from '../config';

type MessagesData = {
  count: number;
  fetchMessagesCount: () => void;
};

const defaultData = {
  count: 0,
  fetchMessagesCount: () => null,
};

const MessagesContext = createContext<MessagesData>(defaultData);

export const MessagesProvider: FC = ({ children }) => {
  const [count, fetchMessagesCount] = useMessagesCount({ status: Status.NEW, initFetch: true });
  usePolling(fetchMessagesCount, MAX_SECONDS);

  return (
    <MessagesContext.Provider
      value={{
        count,
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
