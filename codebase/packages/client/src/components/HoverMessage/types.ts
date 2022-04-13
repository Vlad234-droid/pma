import { CSSProperties } from 'react';
import { Rule, Styles } from '@pma/dex-wrapper';

export type HoverMessage = {
  text: string;
  customStyles?: Rule | Styles | CSSProperties | {};
};
