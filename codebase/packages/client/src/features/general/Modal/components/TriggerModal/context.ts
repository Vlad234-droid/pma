import { createContext, useContext } from 'react';

const defaultEmpty = () => ({});

type Context = {
  onClose: () => void;
};
const TriggerModalContext = createContext<Context>({
  onClose: defaultEmpty,
});

export const TriggerModalConsumer = TriggerModalContext.Consumer;
export const TriggerModalProvider = TriggerModalContext.Provider;
export const useTriggerModalContext = () => useContext(TriggerModalContext);
