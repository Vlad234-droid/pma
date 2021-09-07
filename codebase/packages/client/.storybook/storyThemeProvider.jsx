import { DDLProvider } from '@dex-ddl/core';

/**
 *  reset styles when changing between stories
 * */
const resetFela = () => {
  const felaStyle = document.querySelector('style[data-fela-type="RULE"]');
  felaStyle?.parentNode.removeChild(felaStyle);

  const felaFont = document.querySelector('style[data-fela-type="FONT"]');
  felaFont?.parentNode.removeChild(felaFont);
};

export const StoryThemeProvider = ({ children }) => {
  resetFela();

  const globalCSS = `body {
    font-family: "TESCO Modern", Arial, sans-serif
  }`;

  return <DDLProvider rendererOptions={{ globalCSS }}>{children}</DDLProvider>;
};
