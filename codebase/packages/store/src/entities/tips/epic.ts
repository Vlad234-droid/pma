// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getAllTips, getTipHistory, createTip } from './actions'

export const getAllTipsEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getAllTips.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getAllTips(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getAllTips.success(data);
        }),
        catchError(({ errors }) => of(getAllTips.failure(errors))),
      );
    }),
  );
};

export const getTipHistoryEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getTipHistory.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getTipHistory(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getTipHistory.success(data);
        }),
        catchError(({ errors }) => of(getTipHistory.failure(errors))),
      );
    }),
  );
};

export const createTipEpic: Epic = (action$, _, { api }) =>
  action$.pipe(
    filter(isActionOf(createTip.request)),
    switchMap(({ payload }) => {
      return from(api.createTip(payload)).pipe(
        // @ts-ignore
        map((data) => {
          return getAllTips.request({});
        }),
        catchError(({ errors }) => of(createTip.failure(errors))),
      );
    }),
  );

export default combineEpics(
  getAllTipsEpic,
  getTipHistoryEpic,
  createTipEpic,
);