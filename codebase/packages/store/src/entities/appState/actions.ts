import { createAction } from 'typesafe-actions';

export const addModalError = createAction('appState/ADD_MODAL_ERROR')<{
  title: string;
  description: string;
}>();

export const removeModalError = createAction('appState/REMOVE_MODAL_ERROR')();

export const Actions = {
  addModalError,
  removeModalError,
};
