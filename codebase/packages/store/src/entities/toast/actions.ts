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
  autoClose?: boolean;
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
  autoClose?: boolean;
};

export const addToastFabric = ({ id, title, description, autoClose = true }: ToastFabricPayload) => ({
  error: addToast({
    id: id ?? uuid(),
    variant: Variant.ERROR,
    title: title ?? 'Error',
    autoClose,
    description: description ?? 'Something going wrong',
  }),
  success: addToast({
    id: id ?? uuid(),
    variant: Variant.SUCCESS,
    title: title ?? 'Success',
    autoClose,
    description: description ?? 'N/A',
  }),
  info: addToast({
    id: id ?? uuid(),
    variant: Variant.INFO,
    title: title ?? 'Info',
    autoClose,
    description: description ?? 'N/A',
  }),
});
