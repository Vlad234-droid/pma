import { createAction, createAsyncAction } from 'typesafe-actions';
import { Status } from 'config/types';

export const createOrgObjective = createAsyncAction(
  'orgObjectives/CREATE_REQUEST',
  'orgObjectives/CREATE_SUCCESS',
  'orgObjectives/CREATE_FAILURE',
)<any, any, Error>();

export const createAndPublishOrgObjective = createAsyncAction(
  'orgObjectives/CREATE_AND_PUBLISH_REQUEST',
  'orgObjectives/CREATE_AND_PUBLISH_SUCCESS',
  'orgObjectives/CREATE_AND_PUBLISH_FAILURE',
)<any, any, Error>();

export const publishOrgObjective = createAsyncAction(
  'orgObjectives/PUBLISH_REQUEST',
  'orgObjectives/PUBLISH_SUCCESS',
  'orgObjectives/PUBLISH_FAILURE',
)<any, any, Error>();

export const getOrgObjectives = createAsyncAction(
  'orgObjectives/FETCH_ALL_REQUEST',
  'orgObjectives/FETCH_ALL_SUCCESS',
  'orgObjectives/FETCH_ALL_FAILURE',
  'orgObjectives/FETCH_ALL_CANCEL',
)<any, any, Error>();

export const getOrgAuditLogs = createAsyncAction(
  'orgObjectives/FETCH_AUDIT_REQUEST',
  'orgObjectives/FETCH_AUDIT_SUCCESS',
  'orgObjectives/FETCH_AUDIT_FAILURE',
  'orgObjectives/FETCH_AUDIT_CANCEL',
)<any, any, Error>();

export const changeOrgObjectiveMetaStatus = createAction('orgObjectives/meta/CHANGE_STATUS')<Status>();

export const clearOrgObjectiveData = createAction('orgObjectives/CLEAR')<undefined>();

export const Actions = {
  createOrgObjective: createOrgObjective.request,
  getOrgObjectives: getOrgObjectives.request,
  createAndPublishOrgObjective: createAndPublishOrgObjective.request,
  publishOrgObjective: publishOrgObjective.request,
  getOrgAuditLogs: getOrgAuditLogs.request,
  clearOrgObjectiveData,
  changeOrgObjectiveMetaStatus,
};
