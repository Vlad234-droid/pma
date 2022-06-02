import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

//@ts-ignore
export const colleagueSelector = (state: RootState) => state.colleague;

export const getColleagueMetaSelector = createSelector(colleagueSelector, (colleague: any) => colleague?.meta);

export const getColleagueSelector = createSelector(colleagueSelector, ({ colleague: { colleague } }: any) => {
  const workRelationships = colleague?.workRelationships?.[0];

  return {
    ...colleague,
    profile: {
      fullName: getFullName(colleague?.profile),
      managerName: getManagerFullName(workRelationships),
      department: getDepartmentName(workRelationships),
      job: workRelationships?.job?.name,
    },
  };
});

const getDepartmentName = (workRelationship) => workRelationship?.department?.name;

const getManagerFullName = (workRelationship) => getFullName(workRelationship?.manager?.profile);

const getFullName = (profile) => {
  const { firstName, middleName, lastName } = profile || {};
  const fullName = `${firstName ?? ''}${middleName ? ` ${middleName}` : ''}`;
  return `${fullName}${lastName ? ` ${lastName}` : ''}`;
};
