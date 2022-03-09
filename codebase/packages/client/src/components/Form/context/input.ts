import { createContext, useContext } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultEmpty = () => {};

type ContextType = {
  inputRef: any;
  hasFocus: boolean;
  setFocus: (T: boolean) => void;
};
const Context = createContext<ContextType>({
  inputRef: null,
  hasFocus: false,
  setFocus: defaultEmpty,
});

export const useFormContainer = () => useContext(Context);
export default Context.Provider;
