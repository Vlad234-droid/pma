import { ActionType, createAsyncAction } from 'typesafe-actions';

import { RestResponseUser, RestResponseVoid } from '@pma/openapi';

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
)<undefined, RestResponseUser, RestResponseVoid, undefined>();

export const getCurrentUserMetadata = createAsyncAction(
  'user/current/metadata/REQUEST',
  'user/current/metadata/SUCCESS',
  'user/current/metadata/FAILURE',
  'user/current/metadata/CANCEL',
)<undefined, any, any, undefined>();

export const createProfileAttribute = createAsyncAction(
  'user/CREATE_PROFILE_ATTRIBUTE_REQUEST',
  'user/CREATE_PROFILE_ATTRIBUTE_SUCCESS',
  'user/CREATE_PROFILE_ATTRIBUTE_FAILURE',
)<any, any, Error>();

export const updateProfileAttribute = createAsyncAction(
  'user/update-profile-attribute/REQUEST',
  'user/update-profile-attribute/SUCCESS',
  'user/update-profile-attribute/FAILURE',
)<any, any, Error>();

export const deleteProfileAttribute = createAsyncAction(
  'user/delete-profile-attribute/REQUEST',
  'user/delete-profile-attribute/SUCCESS',
  'user/delete-profile-attribute/FAILURE',
)<any, any, Error>();

export const getColleaguePerformanceCycles = createAsyncAction(
  'user/performance-cycles/REQUEST',
  'user/performance-cycles/SUCCESS',
  'user/performance-cycles/FAILURE',
)<any, any, Error>();

export const Actions = {
  login: loginAsync.request,
  logout: logoutAsync.request,
  getCurrentUser: getCurrentUser.request,
  createProfileAttribute: createProfileAttribute.request,
  updateProfileAttribute: updateProfileAttribute.request,
  deleteProfileAttribute: deleteProfileAttribute.request,
  getColleaguePerformanceCycles: getColleaguePerformanceCycles.request,
};

export type Action = ActionType<typeof loginAsync>;
