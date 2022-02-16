import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const colleaguesSelector = (state: RootState) => state.colleagues;

export const getColleaguesSelector = createSelector(colleaguesSelector, (colleagues: any) => {
  return colleagues?.list;
});

export const getColleagueByUuidSelector = (colleagueUUID) =>
  createSelector(colleaguesSelector, (colleagues: any) => {
    return colleagues.list.find(({ colleague }) => colleague.colleagueUUID === colleagueUUID) || null;
  });
