import { AndroidStudioTheme } from './android-studio-theme';
import { DefaultTheme } from './default-theme';
import { PlainTheme } from './plain-theme';
import { HighlightTheme } from './theme';

export type { HighlightTheme };

export { DefaultTheme };
export { PlainTheme };

export { AndroidStudioTheme };

const themes: Array<HighlightTheme> = [ 
    DefaultTheme, 
    PlainTheme, 
    AndroidStudioTheme,
];

/**
 * 
 * @param themeName 
 * @param defaultTheme 
 */
export const findThemeByName = (themeName: string, defaultTheme: HighlightTheme = DefaultTheme): HighlightTheme => {
  const theme = themes.find(t => themeName && t.THEME_NAME === themeName);
  if (theme === undefined) {
    console.warn(`[LOGGER] Logger theme not found: '${themeName}'. Using '${defaultTheme.THEME_NAME}' as fallback`);
  }

  return theme ?? defaultTheme;
}