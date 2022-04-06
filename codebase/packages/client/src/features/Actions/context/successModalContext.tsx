import React, { createContext, FC, useContext, useState } from 'react';

import { ReviewType, Status } from 'config/enum';

type Data = {
  isOpen: boolean;
  reviewStatus: Status | null;
  reviewType: ReviewType | null;
  setReviewStatus: (T) => void;
  setReviewType: (T) => void;
  setOpened: (T) => void;
};

const defaultData = {
  isOpen: false,
  reviewStatus: null,
  reviewType: null,
  setReviewStatus: () => null,
  setReviewType: () => null,
  setOpened: () => null,
};

const SuccessModalContext = createContext<Data>(defaultData);

export const SuccessModalProvider: FC = ({ children }) => {
  const [isOpen, setOpened] = useState<boolean>(false);
  const [reviewStatus, setReviewStatus] = useState<Status | null>(null);
  const [reviewType, setReviewType] = useState<ReviewType | null>(null);

  return (
    <SuccessModalContext.Provider
      value={{
        isOpen,
        reviewStatus,
        reviewType,
        setOpened,
        setReviewStatus,
        setReviewType,
      }}
    >
      {children}
    </SuccessModalContext.Provider>
  );
};

export const SuccessModalConsumer = SuccessModalContext.Consumer;
export const useSuccessModalContext = () => useContext(SuccessModalContext);
