import { ReactElement } from 'react';

export type HoverContainerProps = {
  children: ReactElement;
  message: ReactElement | string;
  isActive: boolean;
};
