import { formatDateStringFromISO } from '@pma/client/src/utils';
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Statuses } from '../config/types';
import { filterByDate, YEAR_FORMAT } from '../utils/date';

export const usersSelector = (state: RootState) => state.users;
const colleagueSelector = (state: RootState) => state.colleague;

export const getFullName = (profile) => {
  const { firstName, middleName, lastName } = profile || {};
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
};

export const colleagueUUIDSelector = (state: RootState) => {
  const users = usersSelector(state);
  return users.current.info?.colleague?.colleagueUUID as string;
};

export const uuidCompareSelector = (uuid) => (state) => {
  const users = usersSelector(state);
  return users.current.info?.colleague?.colleagueUUID === uuid;
};

export const getUserRoles = (state: RootState) => {
  const users = usersSelector(state);
  return users.current.info?.roles;
};

export const userCurrentCycleTypeSelector = (state: RootState) => {
  const users = usersSelector(state);
  const { metadata } = users.current;
  return metadata?.currentCycle;
};

export const getUserWorkLevels = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  return current?.info?.colleague?.workRelationships?.map((workRelationship) => workRelationship.workLevel);
});

export const isManager = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  return current?.info?.roles?.some((role) => role.toLowerCase().includes('manager'));
});

export const currentUserSelector = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  const info = current?.info?.colleague;
  const fullName = getFullName(info?.profile);
  //@ts-ignore
  const workRelationship = info?.workRelationships?.[0];
  const colleagueUUID = info?.colleagueUUID;
  //@ts-ignore
  const tenant = current?.info?.tenant?.code;
  const job = workRelationship?.job?.name;
  const manager = getFullName(workRelationship?.manager?.profile);
  const department = workRelationship?.department?.name;
  const { businessType } = workRelationship?.department || {};
  const { managerUUID, employmentType, isManager } = workRelationship || {};
  // @ts-ignore
  const { email } = info?.contact || {};
  // @ts-ignore
  const { hireDate } = info?.serviceDates || {};
  // @ts-ignore
  const { countryCode } = info || {};

  // @ts-ignore
  return {
    ...current,
    info: {
      // @ts-ignore
      ...current.info,
      fullName,
      job,
      department,
      businessType,
      managerUUID,
      employmentType,
      isManager,
      email,
      hireDate,
      countryCode,
      manager,
      colleagueUUID,
      tenant,
    },
  };
});

export const currentUserMetaSelector = createSelector(usersSelector, ({ meta }) => meta);

export const userPerformanceCyclesSelector = (state: RootState) => {
  const users = usersSelector(state);
  return users.current.metadata.cycles;
};

export const userCurrentPerformanceCycleSelector = (state: RootState) => {
  const users = usersSelector(state);
  return (
    users.current.metadata.cycles
      .filter(({ status }) => status === Statuses.STARTED)
      .sort(({ endTime }, { endTime: nextEndTime }) => filterByDate(endTime, nextEndTime))[0] || {}
  );
};

export const colleagueCycleSelector = (state: RootState) => {
  const users = usersSelector(state);
  return users.current.metadata.colleagueCycle;
};

export const colleagueCycleYearSelector = (state: RootState) => {
  const users = usersSelector(state);
  const startTime = users.current.metadata.colleagueCycle.startTime || Date.now();

  return new Date(startTime).getFullYear();
};

export const colleagueCurrentCycleSelector = (colleagueUuid: string) => (state: RootState) => {
  const users = usersSelector(state);
  const colleague = colleagueSelector(state);
  if (colleagueUuid === users.current.info?.colleague?.colleagueUUID) {
    return users.current.metadata.currentCycle;
  }
  return colleague.data[colleagueUuid]?.currentCycle || 'CURRENT';
};

export const userCurrentPerformanceCyclePeriodSelector = (state: RootState) => {
  const users = usersSelector(state);

  return users.current.metadata.cycles
    .filter(({ status }) => status === Statuses.STARTED || status === Statuses.FINISHING)
    .map(({ endTime, startTime }) => ({
      endTime,
      startTime,
      value: `${formatDateStringFromISO(startTime, YEAR_FORMAT)}`,
      label: `${formatDateStringFromISO(startTime, YEAR_FORMAT)} - ${formatDateStringFromISO(endTime, YEAR_FORMAT)}`,
    }))
    .sort(({ endTime }, { endTime: nextEndTime }) => filterByDate(endTime, nextEndTime))?.[0]?.value;
};
