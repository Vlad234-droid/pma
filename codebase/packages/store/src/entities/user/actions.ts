import { ActionType, createAsyncAction, createAction } from 'typesafe-actions';

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

export const getCurrentUser = createAsyncAction(
  'user/current/REQUEST',
  'user/current/SUCCESS',
  'user/current/FAILURE',
  'user/current/CANCEL',
)<undefined, any, Error, undefined>();

export const updateUserNotification = createAsyncAction(
  'user/notification/REQUEST',
  'user/notification/SUCCESS',
  'user/notification/FAILURE',
  'user/notification/CANCEL',
)<any, any, Error, undefined>();

export const createProfileAttribute = createAsyncAction(
  'user/CREATE_PROFILE_ATTRIBUTE_REQUEST',
  'user/CREATE_PROFILE_ATTRIBUTE_SUCCESS',
  'user/CREATE_PROFILE_ATTRIBUTE_FAILURE',
)<any, any, Error>();

export const updateProfileAttribute = createAsyncAction(
  'user/UPDATE_PROFILE_ATTRIBUTE_REQUEST',
  'user/UPDATE_PROFILE_ATTRIBUTE_SUCCESS',
  'user/UPDATE_PROFILE_ATTRIBUTE_FAILURE',
)<any, any, Error>();

export const Actions = {
  login: loginAsync.request,
  logout: logoutAsync.request,
  getCurrentUser: getCurrentUser.request,
  updateUserNotification: updateUserNotification.request,
  createProfileAttribute: createProfileAttribute.request,
  updateProfileAttribute: updateProfileAttribute.request,
};

export type Action = ActionType<typeof loginAsync>;
