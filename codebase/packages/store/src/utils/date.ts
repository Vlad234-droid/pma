import { DateTime } from 'luxon';

export type DateFormat = string;

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_STRING_FORMAT = 'dd LLL yyyy';
export const YEAR_FORMAT = 'yyyy';

export const sortByDate = (a, b) =>
  DateTime.fromFormat(a, DATE_FORMAT) > DateTime.fromFormat(b, DATE_FORMAT) ? -1 : 1;

export const filterByDate = (a: string, b: string) => (DateTime.fromISO(a) > DateTime.fromISO(b) ? 1 : -1);

export const formatDateStringFromISO = (date: string, format: DateFormat = DATE_STRING_FORMAT) =>
  DateTime.fromISO(date).setLocale('en').toFormat(format);
