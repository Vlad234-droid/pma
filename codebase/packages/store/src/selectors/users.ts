//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const usersSelector = (state: RootState) => state.users;

export const getFullName = (profile) => {
  const { firstName, middleName, lastName } = profile || {};
  let fullName = '';
  fullName = firstName ? firstName : '';
  fullName = middleName ? `${fullName} ${middleName}` : fullName;
  return lastName ? `${fullName} ${lastName}` : fullName;
};

export const colleagueUUIDSelector = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  return current?.info?.data?.colleague?.colleagueUUID;
});

export const isManager = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  return current?.info?.data?.colleague?.workRelationship?.[0]?.isManager;
});

export const currentUserSelector = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  const info = current?.info?.data?.colleague;
  const fullName = getFullName(info?.profile);
  //@ts-ignore
  const workRelationship = info?.workRelationships?.[0];
  const colleagueUUID = info?.colleagueUUID;
  const job = workRelationship?.job?.name;
  const manager = getFullName(workRelationship?.manager?.profile);
  workRelationship?.job?.name;
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
    },
  };
});

export const currentUserMetaSelector = createSelector(usersSelector, ({ meta }) => meta);
