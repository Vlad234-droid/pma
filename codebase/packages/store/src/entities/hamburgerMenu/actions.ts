import { createAsyncAction } from 'typesafe-actions';

export const getTopMenu = createAsyncAction(
  'menu-data-top/REQUEST',
  'menu-data-top/SUCCESS',
  'menu-data-top/FAILURE',
  'menu-data-top/CANCEL',
)<any, any, Error>();

export const getBottomMenu = createAsyncAction(
  'menu-data-bottom/REQUEST',
  'menu-data-bottom/SUCCESS',
  'menu-data-bottom/FAILURE',
  'menu-data-bottom/CANCEL',
)<any, any, Error>();

export const Actions = {
  getTopMenu: getTopMenu.request,
  getBottomMenu: getBottomMenu.request,
};
