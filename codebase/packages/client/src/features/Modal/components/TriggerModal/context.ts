import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultEmpty = () => {};

type Context = {
  onClose: () => void;
};
const { Provider, Consumer } = createContext<Context>({
  onClose: defaultEmpty,
});

export { Provider, Consumer, useContext };
