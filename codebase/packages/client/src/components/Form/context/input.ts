import { createContext, useContext } from 'react';

const Context = createContext<any>(null);

export const useRefContainer = () => useContext(Context);
export default Context.Provider;
