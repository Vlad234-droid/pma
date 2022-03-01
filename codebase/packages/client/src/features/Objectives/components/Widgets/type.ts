import { HTMLProps } from 'react';

export enum widgetTypes {
  PDP = 'pdp',
  FEEDBACK = 'feedback',
  NOTES = 'notes',
}

type MainWidgetProps = {};

export type Props = HTMLProps<HTMLInputElement> & MainWidgetProps;
