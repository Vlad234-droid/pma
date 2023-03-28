// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, mergeMap, takeUntil } from 'rxjs/operators';
import { getTimeline, getUserTimeline } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';
import { addModalError } from '../appState/actions';

export const getTimelineEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getTimeline.request)),
    mergeMap(({ payload }) =>
      from(api.getTimeline(payload)).pipe(
        mergeMap((response: any) => {
          if (!response.data.length) {
            return of(
              addModalError({
                title: 'timeline_is_empty',
                description: 'you_dont_have_access_to_pma',
              }),
              getTimeline.success({
                colleagueUuid: payload.colleagueUuid,
                cycleUuid: payload.cycleUuid,
                success: response.success,
                data: response.data,
              }),
            );
          }
          return of(
            getTimeline.success({
              colleagueUuid: payload.colleagueUuid,
              cycleUuid: payload.cycleUuid,
              success: response.success,
              data: response.data,
            }),
          );
        }),
        catchError(({ status, data }) => {
          if (status === 404) {
            return of(
              addModalError({
                title: 'timeline_is_empty',
                description: 'you_dont_have_access_to_pma',
              }),
              getTimeline.success({
                colleagueUuid: payload.colleagueUuid,
                cycleUuid: payload.cycleUuid,
                success: data.success,
                data: data.data,
              }),
            );
          }
          const errors = data?.errors;
          return concatWithErrorToast(
            of(getTimeline.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Timeline fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getTimeline.cancel)))),
      ),
    ),
  );
export const getUserTimelineEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(getUserTimeline.request)),
    mergeMap(({ payload }) =>
      from(api.getTimeline(payload)).pipe(
        mergeMap((response: any) => {
          if (!response.data.length) {
            return of(
              addModalError({
                title: 'timeline_is_empty',
                description: 'please_contact_their_line_manager',
              }),
              getUserTimeline.success({
                colleagueUuid: payload.colleagueUuid,
                cycleUuid: payload.cycleUuid,
                success: response.success,
                data: response.data,
              }),
            );
          }
          return of(
            getUserTimeline.success({
              colleagueUuid: payload.colleagueUuid,
              cycleUuid: payload.cycleUuid,
              success: response.success,
              data: response.data,
            }),
          );
        }),
        catchError(({ status, data }) => {
          if (status === 404) {
            return of(
              addModalError({
                title: 'timeline_is_empty',
                description: 'please_contact_their_line_manager',
              }),
              getUserTimeline.success({
                colleagueUuid: payload.colleagueUuid,
                cycleUuid: payload.cycleUuid,
                success: data.success,
                data: data.data,
              }),
            );
          }
          const errors = data?.errors;
          return concatWithErrorToast(
            of(getUserTimeline.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Timeline fetch error' }),
          );
        }),
        takeUntil(action$.pipe(filter(isActionOf(getUserTimeline.cancel)))),
      ),
    ),
  );

export default combineEpics(getTimelineEpic, getUserTimelineEpic);
