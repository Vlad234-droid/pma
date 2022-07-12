//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status } from '@pma/client/src/config/enum';
import {
  SortBy,
  searchEmployeesFn,
  sortEmployeesFn,
  searchEmployeesAndManagersFn,
} from '@pma/client/src/features/general/Filters';
import { Employee } from '@pma/client/src/config/types';

export const managersSelector = (state: RootState) => state.managers || {};

export const getEmployeesWithReviewStatus = (status: Status, searchValue?: string, sortValue?: SortBy) =>
  // @ts-ignore
  createSelector(managersSelector, ({ data = [] }) => {
    const filteredWithStatusData = data
      .filter((employee) => employee.timeline.some((review) => review.summaryStatus === status))
      .map((employee) => ({
        ...employee,
        reviews: employee.reviews.filter((review) => review.status === status),
        timeline: employee.timeline.filter((review) => review.summaryStatus === status),
      }));

    return filteredWithStatusData
      ? sortEmployeesFn(searchEmployeesFn(filteredWithStatusData, searchValue), sortValue)
      : [];
  });

export const getAllEmployees = (search?: string, sort?: SortBy) =>
  createSelector(
    managersSelector,
    // @ts-ignore
    ({ data }) => (data ? sortEmployeesFn(searchEmployeesFn(data, search), sort) : []),
  );

export const getAllEmployeesWithManagerSearch = (search: string, sort: SortBy) =>
  createSelector(
    managersSelector,
    // @ts-ignore
    ({ data }) => (data ? sortEmployeesFn(searchEmployeesAndManagersFn(data, search), sort) : []),
  );

export const getPendingEmployees = (search?: string, sort?: SortBy) =>
  createSelector(
    managersSelector,
    // @ts-ignore
    ({ data }) => {
      const filteredData = data ? sortEmployeesFn(searchEmployeesFn(data, (search = '')), sort) : [];

      const employeeWithPendingApprovals = filteredData?.filter((employee: Employee) =>
        employee.timeline.some((review) => review.summaryStatus === Status.WAITING_FOR_APPROVAL),
      );

      const employeePendingApprovals = filteredData?.filter((employee: Employee) =>
        employee.timeline.some(
          (review) => review.summaryStatus === Status.DRAFT || review.summaryStatus === Status.DECLINED,
        ),
      );

      const employeeWithCompletedApprovals = filteredData?.filter((employee: Employee) =>
        employee.timeline.some((review) => review.summaryStatus === Status.APPROVED),
      );

      return {
        employeeWithPendingApprovals,
        employeePendingApprovals,
        employeeWithCompletedApprovals,
      };
    },
  );

export const getManagersMetaSelector = createSelector(managersSelector, ({ meta }) => meta);
