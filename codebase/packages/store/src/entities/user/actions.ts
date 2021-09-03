import { createAsyncAction, ActionType } from 'typesafe-actions';

export const loginAsync = createAsyncAction(
  'user/LOGIN_REQUEST',
  'user/LOGIN_SUCCESS',
  'user/LOGIN_FAILURE',
  'user/LOGIN_CANCEL',
)<{ email: string; password: string }, { authorized: boolean }, Error, undefined>();

export const logoutAsync = createAsyncAction(
  'user/LOGOUT_REQUEST',
  'user/LOGOUT_SUCCESS',
  'user/LOGOUT_FAILURE',
  'user/LOGOUT_CANCEL',
)<undefined, { authorized: boolean }, Error, undefined>();

export const Actions = {
  login: loginAsync.request,
  logout: logoutAsync.request,
};

export type Action = ActionType<typeof loginAsync>;
