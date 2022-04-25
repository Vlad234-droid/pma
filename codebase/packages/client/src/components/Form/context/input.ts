import { createContext, useContext } from 'react';

const defaultEmpty = () => {
  // This is intentional
};

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
