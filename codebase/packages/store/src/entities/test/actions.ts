import { createAction } from 'typesafe-actions';

export const addTest = createAction('toasts/ADD_REQUEST')<{
  id: string;
  title: string;
  description: string;
}>();

export const Actions = {
  addTest,
};
