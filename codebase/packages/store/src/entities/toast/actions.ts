import { createAction } from 'typesafe-actions';

export enum Variant {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

export const addToast = createAction('toasts/ADD_REQUEST')<{
  id: string;
  variant: Variant;
  title: string;
  description: string;
}>();

export const removeToast = createAction('toasts/REMOVE_REQUEST')<string>();

export const Actions = {
  addToast: addToast,
  removeToast: removeToast,
};
