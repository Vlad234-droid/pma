import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const usersSelector = (state: RootState) => state.users;

export const getFullName = (profile) => {
  const { firstName, middleName, lastName } = profile || {};
  let fullName = '';
  fullName = firstName ? firstName : '';
  fullName = middleName ? `${fullName} ${middleName}` : fullName;
  return lastName ? `${fullName} ${lastName}` : fullName;
};

export const colleagueUUIDSelector = (state: RootState) => {
  const users = usersSelector(state);
  return users.current.info?.colleague?.colleagueUUID;
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
  const { length, [length - 1]: cycle } = metadata;
  return cycle?.cycleType;
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
