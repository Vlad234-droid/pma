import { Colors, Theme } from '@pma/dex-wrapper';
import { Status } from 'config/enum';
import { IconColors } from './graphics/types';
import { Graphics } from './graphics';
import { TFunction } from 'components/Translation';

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

export const getIcon = (status: Status | undefined, t: TFunction): [Graphics, Colors, string] => {
  const contents: { [key: string]: [Graphics, Colors, string] } = {
    [Status.NOT_AVAILABLE]: ['calender', 'tescoBlue', t('not_available', 'Not available')],
    [Status.AVAILABLE]: ['roundAlert', 'pending', t('available', 'Available')],
    [Status.OVERDUE]: ['roundAlert', 'error', t('overdue', 'Overdue')],
    [Status.DRAFT]: ['roundPencil', 'base', t('draft', 'Draft')],
    [Status.APPROVED]: ['roundTick', 'green', t('completed', 'Completed')],
    [Status.PENDING]: ['roundClock', 'pending', t('pending', 'Pending')],
    [Status.WAITING_FOR_APPROVAL]: ['roundClock', 'pending', t('waiting_for_approval', 'Waiting for approval')],
    [Status.DECLINED]: ['roundAlert', 'pending', t('declined', 'Declined')],
  };

  return contents[status!] || ['roundCircle', 'pending', t('not_completed', 'Not completed')];
};
