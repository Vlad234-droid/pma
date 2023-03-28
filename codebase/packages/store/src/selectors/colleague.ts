import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Statuses } from '../config/types';
import { filterByDate } from '../utils/date';
import { colleagueUUIDSelector } from './users';

//@ts-ignore
export const colleagueSelector = (state: RootState) => state.colleague;

export const colleagueCyclesSelector = (uuid: string) =>
  createSelector(colleagueSelector, (colleague: any) => colleague?.data[uuid]?.cycles || []);

export const getColleagueMetaSelector = createSelector(colleagueSelector, (colleague: any) => colleague?.meta);

export const getColleagueSelector = (uuid: string) =>
  createSelector(colleagueSelector, ({ data }: any) => {
    const { colleague, tenant } = data[uuid] || {};
    const workRelationships = colleague?.workRelationships?.[0];

    return {
      ...colleague,
      tenant,
      profile: {
        fullName: getFullName(colleague?.profile),
        managerName: getManagerFullName(workRelationships),
        department: getDepartmentName(workRelationships),
        job: workRelationships?.job?.name,
      },
    };
  });

export const isDirectReportSelector = (colleagueUuid: string) =>
  createSelector(colleagueUUIDSelector, getColleagueSelector(colleagueUuid), (userUuid, colleague): boolean => {
    const { workRelationships } = colleague;
    const [{ managerUUID = '' } = {}] = workRelationships || [];
    return userUuid === managerUUID;
  });

export const isDirectReportPlusOneSelector = (colleagueUuid: string) =>
  createSelector(colleagueUUIDSelector, getColleagueSelector(colleagueUuid), (userUuid, colleague): boolean => {
    const { workRelationships } = colleague;
    const [{ manager = {} } = {}] = workRelationships || [];
    const { workRelationships: managerWorkRelationships } = manager;
    const [{ managerUUID = '' } = {}] = managerWorkRelationships || [];

    return userUuid === managerUUID;
  });

export const getColleagueCycleSelector = (uuid: string) =>
  createSelector(colleagueSelector, ({ data }: any) => {
    const { cycles = [] } = data[uuid] || {};

    return cycles;
  });

export const colleagueCycleDataSelector = (colleagueUuid: string, cycleId: string) => (state: RootState) => {
  const colleague = colleagueSelector(state);
  if (cycleId === 'CURRENT') {
    return (
      colleague.data[colleagueUuid]?.cycles
        .filter(({ status }) => status === Statuses.STARTED)
        .sort(({ endTime }, { endTime: nextEndTime }) => filterByDate(endTime, nextEndTime))[0] || {}
    );
  }
  return colleague.data[colleagueUuid]?.cycles?.find((cycle) => cycle.uuid === cycleId) || {};
};

const getDepartmentName = (workRelationship) => workRelationship?.department?.name;

const getManagerFullName = (workRelationship) => getFullName(workRelationship?.manager?.profile);

const getFullName = (profile) => {
  const { firstName, middleName, lastName } = profile || {};
  const fullName = `${firstName ?? ''}${middleName ? ` ${middleName}` : ''}`;
  return `${fullName}${lastName ? ` ${lastName}` : ''}`;
};
