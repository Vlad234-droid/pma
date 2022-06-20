import { Theme } from 'cli-highlight';
import chalk from 'chalk';

/**
 * 
 */
export type Colorizer = (input: string) => string;

/**
 * 
 * @param input 
 * @returns 
 */
export const nocolor: Colorizer = (input: string) => { return input };

/**
 * 
 */
export type HighlightFunction = chalk.ChalkFunction | Colorizer;

/**
 * 
 */
export interface HighlightTheme extends Theme {

   /**
    * Theme name
    */
   THEME_NAME: string,

   /**
    * 
    */
   logLevels: Record<string | number, HighlightFunction>,

   /**
    * Using to colorize message
    */
   message: HighlightFunction,
   
   /**
    * Using to colorize grey message
    */
   greyMessage: HighlightFunction,
   
   /**
    * Using to colorize time
    */
   time: HighlightFunction,

   /**
    * 
    * @param level 
    */
   colorizeLevel?(level: number | string): string,
}

