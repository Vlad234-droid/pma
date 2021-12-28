// @ts-ignore
import { Epic, isActionOf } from 'typesafe-actions';
import { combineEpics } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { getAllTips, getTipHistory, createTip, getTipByUuid, deleteTip, publishTipByUuid } from './actions';
import { concatWithErrorToast, errorPayloadConverter } from '../../utils/toastHelper';

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
        // catchError(({ errors }) => of(createTip.failure(errors))),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(createTip.failure(errors[0]));
        }),
      );
    }),
  );

export const getTipByUuidEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(getTipByUuid.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.getTipByUuid(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return getTipByUuid.success(data);
        }),
        // catchError(({ errors }) => of(getTipByUuid.failure(errors))),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(getTipByUuid.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Tip by uuid fetch error' }),
          );
        }),
      );
    }),
  );
};

export const deleteTipEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(deleteTip.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.deleteTip(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return deleteTip.success(data);
        }),
        // catchError(({ errors }) => of(deleteTip.failure(errors))),
        catchError((e) => {
          const errors = e?.data?.errors;
          return concatWithErrorToast(
            of(deleteTip.failure(errors?.[0])),
            errorPayloadConverter({ ...errors?.[0], title: 'Delete tip error' }),
          );
        }),
      );
    }),
  );
};

export const publishTipByUuidEpic: Epic = (action$, _, { api }) => {
  return action$.pipe(
    filter(isActionOf(publishTipByUuid.request)),
    switchMap(({ payload }) => {
      //@ts-ignore
      return from(api.publishTipByUuid(payload)).pipe(
        //@ts-ignore
        map(({ data }) => {
          return publishTipByUuid.success(data);
        }),
        catchError(({ errors }) => of(publishTipByUuid.failure(errors))),
        catchError((e) => {
          const errors = e?.data?.errors;
          return of(publishTipByUuid.failure(errors?.[0]));
        }),
      );
    }),
  );
};

export default combineEpics(
  getAllTipsEpic,
  getTipHistoryEpic,
  createTipEpic,
  getTipByUuidEpic,
  deleteTipEpic,
  publishTipByUuidEpic,
);
