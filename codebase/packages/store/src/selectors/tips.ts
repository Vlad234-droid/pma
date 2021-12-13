import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const tipsSelector = (state: RootState) => state.tips;

export const getTipsSelector = createSelector(tipsSelector, (tips: any) => {
  return tips?.tipsList;
});

export const getTipHistorySelector = createSelector(tipsSelector, (tips: any) => {
  return tips?.viewHistory;
})