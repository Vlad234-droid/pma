//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status } from '@pma/client/src/config/enum';

export const managersSelector = (state: RootState) => state.managers || {};

// @ts-ignore
export const getAllEmployees = createSelector(managersSelector, ({ data }) => {
  return data;
});

// @ts-ignore
export const getPendingEmployees = createSelector(managersSelector, ({ data }) => {
  const employeeWithPendingApprovals = data?.filter((employee) =>
    employee.timeline.some((review) => review.status === Status.WAITING_FOR_APPROVAL),
  );
  const employeePendingApprovals = data?.filter((employee) =>
    employee.timeline.some((review) => review.status === Status.DRAFT || review.status === Status.DECLINED),
  );
  const employeeWithCompletedApprovals = data?.filter((employee) =>
    employee.timeline.some((review) => review.status === Status.APPROVED),
  );
  return {
    employeeWithPendingApprovals,
    employeePendingApprovals,
    employeeWithCompletedApprovals,
  };
});

export const getManagersMetaSelector = createSelector(managersSelector, ({ meta }) => meta);
