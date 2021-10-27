//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const usersSelector = (state: RootState) => state.users;

function getFullName(info) {
  const { firstName, middleName, lastName } = info?.profile || {};
  let fullName = '';
  fullName = firstName ? firstName : '';
  fullName = middleName ? `${fullName} ${middleName}` : fullName;
  return lastName ? `${fullName} ${lastName}` : fullName;
}

export const currentUserSelector = createSelector(usersSelector, ({ current }) => {
  // @ts-ignore
  const info = current?.info?.data?.colleague;
  const fullName = getFullName(info);
  //@ts-ignore
  const workRelationship = info?.workRelationships?.[0];
  const job = workRelationship?.job?.name;
  const department = workRelationship?.department?.name;
  const { businessType } = workRelationship?.department || {};
  const { managerUUID, employmentType } = workRelationship || {};
  // @ts-ignore
  const { email } = info?.contact || {};
  // @ts-ignore
  const { hireDate } = info?.serviceDates || {};
  // @ts-ignore
  const { countryCode } = info?.contact?.addresses || {};

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
      email,
      hireDate,
      countryCode,
    },
  };
});

export const currentUserMetaSelector = createSelector(usersSelector, ({ meta }) => meta);
