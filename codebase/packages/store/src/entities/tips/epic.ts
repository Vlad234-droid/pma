// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getAllTips, getTipHistory } from './actions'

export const getAllTipsEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getAllTips.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getAllTips(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          console.log(data)
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

export default combineEpics(
  getAllTipsEpic,
  getTipHistoryEpic,
);