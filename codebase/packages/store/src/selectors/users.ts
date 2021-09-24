//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const usersSelector = (state: RootState) => state.users;

export const currentUserSelector = createSelector(usersSelector, ({ current }) => {
  //@ts-ignore
  const { firstName, middleName, lastName } = current?.info?.profile || {};
  //@ts-ignore
  const { name: job } = current?.info?.workRelationships?.[0]?.job || {};
  // @ts-ignore
  const { email } = current?.info?.contact || {};
  // @ts-ignore
  const { hireDate } = current?.info?.serviceDates || {};
  let fullName = '';
  fullName = firstName ? firstName : '';
  fullName = middleName ? `${fullName} ${middleName}` : fullName;
  fullName = lastName ? `${fullName} ${lastName}` : fullName;

  // @ts-ignore
  return {
    ...current,
    info: { ...current.info, fullName, job, email, hireDate },
  };
});

export const currentUserMetaSelector = createSelector(usersSelector, ({ meta }) => meta);
