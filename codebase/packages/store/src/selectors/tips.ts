import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const tipsSelector = (state: RootState) => state.tips;

export const getTips = createSelector(tipsSelector, (tips: any) => {
  return tips?.data;
});