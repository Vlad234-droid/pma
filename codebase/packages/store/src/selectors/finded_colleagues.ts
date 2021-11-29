import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { FeedbackStatus } from '@pma/client/src/config/enum';

//@ts-ignore
export const colleguesSelector = (state: RootState) => state.colleagues;

export const getFindedColleguesS = createSelector(colleguesSelector, (colleagues: any) => {
  const { finded_colleagues } = colleagues;
  return finded_colleagues;
});
