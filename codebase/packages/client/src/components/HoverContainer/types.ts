import { ReactElement, CSSProperties } from 'react';
import { Rule } from '@pma/dex-wrapper';

export type HoverContainerProps = {
  children: ReactElement;
  message: ReactElement | string;
  isActive: boolean;
  customStyles?: CSSProperties | Rule;
};
