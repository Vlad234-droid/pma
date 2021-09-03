import { DateTime } from 'luxon';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const sortByDate = (a, b) =>
  DateTime.fromFormat(a, DATE_FORMAT) > DateTime.fromFormat(b, DATE_FORMAT) ? -1 : 1;
