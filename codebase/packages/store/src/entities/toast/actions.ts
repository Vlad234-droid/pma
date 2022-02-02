import { createAction } from 'typesafe-actions';
import { v4 as uuid } from 'uuid';

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
  addToast,
  removeToast,
};

export type ToastFabricPayload = {
  id?: string;
  title?: string;
  description?: string;
};

export const addToastFabric = ({ id, title, description }: ToastFabricPayload) => ({
  error: addToast({
    id: id ?? uuid(),
    variant: Variant.ERROR,
    title: title ?? 'Error',
    description: description ?? 'Something going wrong',
  }),
  success: addToast({
    id: id ?? uuid(),
    variant: Variant.SUCCESS,
    title: title ?? 'Success',
    description: description ?? 'N/A',
  }),
  info: addToast({
    id: id ?? uuid(),
    variant: Variant.INFO,
    title: title ?? 'Info',
    description: description ?? 'N/A',
  }),
});
