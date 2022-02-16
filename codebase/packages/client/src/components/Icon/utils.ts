import {Colors, Theme} from '@dex-ddl/core';

import { IconColors } from './graphics/types';
import {Graphics} from "./graphics";
import {Status} from "../../config/enum";

export const invertColor = (color: IconColors, shouldInvert: boolean, { colors: { white, link } }: Theme) => {
  if (!shouldInvert) return color;

  if (color === white) {
    return link;
  }
  return white;
};

export const getId = (str: string): string => {
  return str.toLowerCase().replace(/ /g, '');
};

export const getTitle = (str: string): string => {
  return str.split(/(?=[A-Z])/).join(' ');
};

export const getIcon = (status): [Graphics, Colors] => {
  const contents: { [key: string]: [Graphics, Colors] } = {
    [Status.NOT_AVAILABLE]: ['calender', 'tescoBlue'],
    [Status.AVAILABLE]: ['roundAlert', 'pending'],
    [Status.OVERDUE]: ['roundAlert', 'error'],
    [Status.DRAFT]: ['roundPencil', 'base'],
    [Status.APPROVED]: ['roundTick', 'green'],
    [Status.PENDING]: ['roundClock', 'pending'],
    [Status.WAITING_FOR_APPROVAL]: ['roundClock', 'pending'],
    [Status.DECLINED]: ['roundAlert', 'pending'],
  };

  return contents[status] || ['roundCircle', 'pending'];
};
