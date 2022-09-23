import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

import { ReviewType, Status } from 'config/enum';

export type StatusHistoryType = {
  prevStatus: Status;
  status: Status;
  type: ReviewType;
};
type Data = {
  isOpen: boolean;
  setOpened: (T) => void;
  statusHistory: StatusHistoryType | null;
  setStatusHistory: (history: StatusHistoryType) => void;
};

const defaultData = {
  isOpen: false,
  setOpened: () => null,
  statusHistory: null,
  setStatusHistory: () => null,
};

const SuccessModalContext = createContext<Data>(defaultData);

export const SuccessModalProvider: FC<{
  children: (renderProps: {
    isOpen: boolean;
    setOpened: (T) => void;
    statusHistory: StatusHistoryType | null;
  }) => ReactNode;
}> = ({ children }) => {
  const [isOpen, setOpened] = useState<boolean>(false);
  const [statusHistory, setStatusHistory] = useState<StatusHistoryType | null>(null);

  return (
    <SuccessModalContext.Provider
      value={{
        isOpen,
        setOpened,
        statusHistory,
        setStatusHistory,
      }}
    >
      {children({ isOpen, statusHistory, setOpened })}
    </SuccessModalContext.Provider>
  );
};

export const SuccessModalConsumer = SuccessModalContext.Consumer;
export const useSuccessModalContext = () => useContext(SuccessModalContext);
