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
    const { list = [] } = colleagues;
    return list?.find(({ colleague }) => colleague?.colleagueUUID === colleagueUUID) || null;
  });

export const colleagueInfo = createSelector(colleaguesSelector, (colleagues: any) => {
  const { colleague } = colleagues;
  const firstName = colleague?.profile?.firstName || '';
  const lastName = colleague?.profile?.lastName || '';
  const job = colleague?.workRelationships?.[0]?.job?.name || '';
  const department = colleague?.workRelationships?.[0]?.department?.name || '';
  const managerName = colleague?.workRelationships?.[0]?.manager?.profile?.firstName || '';
  const managerUuid = colleague?.workRelationships?.[0]?.manager?.colleagueUUID || '';
  const managerSirName = colleague?.workRelationships?.[0]?.manager?.profile?.lastName || '';
  const businessType = colleague?.workRelationships?.[0]?.department?.businessType || '';

  return { managerUuid, firstName, lastName, job, department, managerName, managerSirName, businessType };
});
