import { createAction, createAsyncAction } from 'typesafe-actions';
import { RestResponseColleagueFilterOptions } from '@pma/openapi';

export const getColleagueFilter = createAsyncAction(
  'colleagueFilter/FETCH_REQUEST',
  'colleagueFilter/FETCH_SUCCESS',
  'colleagueFilter/FETCH_FAILURE',
  'colleagueFilter/FETCH_CANCEL',
)<any, RestResponseColleagueFilterOptions, Error>();

export const getReportingFilters = createAsyncAction(
  'reportingFilters/FETCH_REQUEST',
  'reportingFilters/FETCH_SUCCESS',
  'reportingFilters/FETCH_FAILURE',
  'reportingFilters/FETCH_CANCEL',
)<any, any, Error>();

export const clearColleagueFilter = createAction('colleagueFilter/CLEAR')<undefined>();

export const Actions = {
  getColleagueFilter: getColleagueFilter.request,
  getReportingFilters: getReportingFilters.request,
  clearColleagueFilter,
};
