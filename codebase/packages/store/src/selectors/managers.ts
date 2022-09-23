//@ts-ignore
import { createSelector, ParametricSelector, Selector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';
import { ReviewType, Status } from '@pma/client/src/config/enum';
import {
  searchEmployeesAndManagersFn,
  searchEmployeesFn,
  SortBy,
  sortEmployeesFn,
} from '@pma/client/src/features/general/Filters';
import { Employee } from '@pma/client/src/config/types';

export const managersSelector = (state: RootState) => state.managers || {};

export const getEmployeesWithReviewStatuses: ParametricSelector<RootState, Status[], any> = createSelector(
  [
    managersSelector,
    (_, statuses: Status[]) => statuses,
    (_, __, search?: string) => search,
    (_, __, ___?, sort?: SortBy) => sort,
  ],
  // @ts-ignore
  ({ data = [] }, statuses: Status[], searchValue = '', sortValue) => {
    const filteredWithStatusData = data
      .filter((employee) => employee.reviews.some((review) => statuses.includes(review.status)))
      .map((employee) => {
        const reviews = employee.reviews.filter((review) => statuses.includes(review.status));
        const timelineIds = reviews.map(({ tlPointUuid }) => tlPointUuid);
        const timeline = employee.timeline.filter((timeline) => timelineIds.includes(timeline.uuid));
        return {
          ...employee,
          reviews,
          timeline,
        };
      });

    return filteredWithStatusData
      ? sortEmployeesFn(searchEmployeesFn(filteredWithStatusData, searchValue), sortValue)
      : [];
  },
);

export const getAllEmployees: Selector<RootState, any, any> = createSelector(
  [managersSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
  // @ts-ignore
  ({ data }, search = '', sort) => (data ? sortEmployeesFn(searchEmployeesFn(data, search), sort) : []),
);

export const getAllEmployeesWithManagerSearch: Selector<RootState, any, any> = createSelector(
  [managersSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
  // @ts-ignore
  ({ data }, search = '', sort) => (data ? sortEmployeesFn(searchEmployeesAndManagersFn(data, search), sort) : []),
);

export const getPendingEmployees: Selector<RootState, any, any> = createSelector(
  [managersSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
  // @ts-ignore
  ({ data }, search = '', sort) => {
    const filteredData = data ? sortEmployeesFn(searchEmployeesFn(data, search), sort) : [];

    const employeeWithPendingApprovals = filteredData?.filter((employee: Employee) =>
      employee.reviews.some((review) =>
        [Status.WAITING_FOR_APPROVAL, Status.WAITING_FOR_COMPLETION].includes(review.status),
      ),
    );

    const employeePendingApprovals = filteredData?.filter((employee: Employee) =>
      employee.reviews.some((review) => review.status === Status.DRAFT || review.status === Status.DECLINED),
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

export const getOutstandingPendingEmployees: Selector<RootState, any, any> = createSelector(
  [managersSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
  // @ts-ignore
  ({ data }, search = '', sort) => {
    const filteredData = data ? sortEmployeesFn(searchEmployeesFn(data, search), sort) : [];

    const employeeOverdueAnniversary = filteredData?.filter(
      (employee) =>
        employee.timeline.length === 1 &&
        employee.timeline[0].reviewType === ReviewType.EYR &&
        isAfterDeadline({ date: employee.timeline[0].endTime, days: 7 }),
    );

    const employeeOverdueEYR = filteredData?.filter(
      (employee) =>
        employee.timeline.length !== 1 &&
        employee.timeline.some(
          (review) => review.reviewType === ReviewType.EYR && isAfterDeadline({ date: review.endTime, days: 7 }),
        ),
    );

    const employeeOverdueMYR = filteredData?.filter((employee) =>
      employee.timeline.some(
        (review) => review.reviewType === ReviewType.MYR && isAfterDeadline({ date: review.endTime, days: 7 }),
      ),
    );

    const employeeOverdueObjectives = filteredData?.filter((employee: Employee) =>
      employee.timeline.some(
        (review) => review.code === ReviewType.OBJECTIVE && review.summaryStatus === Status.OVERDUE,
      ),
    );

    const employeeObjectivesWaiting = filteredData?.filter((employee) =>
      employee.timeline.some(
        (point) =>
          point.summaryStatus === Status.OVERDUE &&
          employee.reviews.some(
            (review) =>
              review.tlPointUuid === point.uuid &&
              review.status === Status.WAITING_FOR_APPROVAL &&
              (review.type === ReviewType.OBJECTIVE || review.type === ReviewType.QUARTER),
          ),
      ),
    );

    return {
      employeeOverdueAnniversary,
      employeeOverdueObjectives,
      employeeObjectivesWaiting,
      employeeOverdueEYR,
      employeeOverdueMYR,
    };
  },
);

export const getManagersMetaSelector = createSelector(managersSelector, ({ meta }) => meta);

const isAfterDeadline = ({ date, days = 0 }) =>
  new Date().getTime() > new Date(date).getTime() - days * 24 * 60 * 60 * 1000;
