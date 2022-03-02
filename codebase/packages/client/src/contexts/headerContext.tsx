import React, { createContext, FC, useContext, useState } from 'react';
import { Page } from 'pages/types';

const defaultData = {
  linkTitle: {},
  setLinkTitle: () => ({}),
};

export type HeaderData = {
  linkTitle?: { [key in Page]: string } | {};
  setLinkTitle: (T) => void;
};

const HeaderContext = createContext<HeaderData>(defaultData);

export const HeaderProvider: FC = ({ children }) => {
  const [linkTitle, setLinkTitle] = useState({});

  return <HeaderContext.Provider value={{ linkTitle, setLinkTitle }}>{children}</HeaderContext.Provider>;
};

export const HeaderConsumer = HeaderContext.Consumer;
export const useHeaderContainer = () => useContext(HeaderContext);

export default HeaderContext;
