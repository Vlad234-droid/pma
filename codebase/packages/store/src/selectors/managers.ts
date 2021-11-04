//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status } from '@pma/client/src/config/enum';

export const managersSelector = (state: RootState) => state.managers || {};

/*const colleagueUuid = employee.uuid;
const fullName = `${employee.firstName} ${employee.lastName}`;
const jobBusinessType = `${employee.jobName}, ${employee.businessType}`;*/

// @ts-ignore
export const getAllEmployees = createSelector(managersSelector, ({ data }) => {
  return data;
});

// @ts-ignore
export const getPendingEmployees = createSelector(managersSelector, ({ data }) => {
  const employeeWithPendingApprovals = data?.filter((employee) =>
    employee.reviews.some((review) => review.status === Status.WAITING_FOR_APPROVAL),
  );
  const employeeWithDraftApprovals = data?.filter((employee) =>
    employee.reviews.some((review) => review.status === Status.DRAFT),
  );
  return {
    employeeWithPendingApprovals,
    employeeWithDraftApprovals,
  };
});

export const getManagersMetaSelector = createSelector(managersSelector, ({ meta }) => meta);
