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

export const managersReviewsSelector = (state: RootState) => state.managers.reviews.data || {};
export const managersCalibrationsSelector = (state: RootState) => state.managers.calibrations.data || {};
export const getManagersMetaSelector = (state: RootState) => state.managers.reviews.meta || {};

export const getEmployeesWithReviewStatuses: ParametricSelector<RootState, string, any> = createSelector(
  [
    managersReviewsSelector,
    (_, status: string) => status,
    (_, __, search?: string) => search,
    (_, __, ___?, sort?: SortBy) => sort,
  ],
  // @ts-ignore
  (data = {}, status: string, searchValue = '', sortValue) => {
    const filteredWithStatusData = (data[status] || [])
      ?.filter((employee) => employee.reviews.length)
      ?.map((employee) => {
        const reviews = employee.reviews;
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

export const getEmployeesWithCalibrationStatus: ParametricSelector<RootState, string, any> = createSelector(
  [
    managersCalibrationsSelector,
    (_, status: string) => status,
    (_, __, search?: string) => search,
    (_, __, ___?, sort?: SortBy) => sort,
  ],
  // @ts-ignore
  (data = {}, status: string, searchValue = '', sortValue) => {
    const filteredWithStatusData = (data[status] || [])
      ?.filter((employee) => employee.reviews.length)
      ?.map((employee) => {
        const reviews = employee.reviews;
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
  [
    managersReviewsSelector,
    (_, status: string) => status,
    (_, __, search?: string) => search,
    (_, __?, sort?: SortBy) => sort,
  ],
  // @ts-ignore
  (data, status, search = '', sort) => {
    return data[status] ? sortEmployeesFn(searchEmployeesFn(data[status], search), sort) : [];
  },
);

export const getAllEmployeesWithManagerSearch: Selector<RootState, any, any> = createSelector(
  [
    managersReviewsSelector,
    (_, status: string) => status,
    (_, __, search?: string) => search,
    (_, __?, sort?: SortBy) => sort,
  ],
  // @ts-ignore
  (data, status, search = '', sort) => {
    return data[status] ? sortEmployeesFn(searchEmployeesAndManagersFn(data[status], search), sort) : [];
  },
);

export const getPendingEmployees: Selector<RootState, any, any> = createSelector(
  [managersReviewsSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
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

const isAnniversaryTimeline = (timeline: any) => {
  const reviewTypes = timeline.map(({ reviewType }) => reviewType);
  return (
    reviewTypes.includes(ReviewType.EYR) &&
    !reviewTypes.includes(ReviewType.MYR) &&
    !reviewTypes.includes(ReviewType.OBJECTIVE) &&
    !reviewTypes.includes(ReviewType.QUARTER)
  );
};

export const getOutstandingPendingEmployees = createSelector(
  [managersReviewsSelector, (_, search?: string) => search, (_, __?, sort?: SortBy) => sort],
  ({ ALL }, search = '', sort) => {
    const filteredData: Employee[] = ALL ? sortEmployeesFn(searchEmployeesFn(ALL, search), sort) : [];

    const employeeOverdueAnniversary = filteredData?.filter(
      (employee) =>
        isAnniversaryTimeline(employee.timeline) &&
        employee.timeline.some(
          (review) =>
            review.reviewType === ReviewType.EYR &&
            isAfterDeadline({
              date: review?.properties?.OVERDUE_DATE || review?.properties?.END_DATE || review.endTime,
              days: 7,
            }) &&
            (review.summaryStatus === Status.OVERDUE || review.summaryStatus === Status.STARTED),
        ),
    );

    const employeeOverdueEYR = filteredData?.filter(
      (employee) =>
        !isAnniversaryTimeline(employee.timeline) &&
        employee.timeline.some(
          (review) =>
            review.reviewType === ReviewType.EYR &&
            isAfterDeadline({
              date: review?.properties?.OVERDUE_DATE || review?.properties?.END_DATE || review.endTime,
              days: 7,
            }) &&
            (review.summaryStatus === Status.OVERDUE || review.summaryStatus === Status.STARTED),
        ),
    );

    const employeeOverdueMYR = filteredData?.filter((employee) =>
      employee.timeline.some(
        (review) =>
          review.reviewType === ReviewType.MYR &&
          isAfterDeadline({
            date: review?.properties?.OVERDUE_DATE || review?.properties?.END_DATE || review.endTime,
            days: 7,
          }) &&
          (review.summaryStatus === Status.OVERDUE || review.summaryStatus === Status.STARTED),
      ),
    );

    const employeeOverdueObjectives = filteredData?.filter((employee: Employee) =>
      employee.timeline.some(
        (review) =>
          review.code === ReviewType.OBJECTIVE &&
          isAfterDeadline({
            date: review?.properties?.OVERDUE_DATE || review?.properties?.END_DATE || review.endTime,
            days: 7,
          }) &&
          (review.summaryStatus === Status.OVERDUE || review.summaryStatus === Status.STARTED),
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

const isAfterDeadline = ({ date, days = 0 }) =>
  new Date().getTime() > new Date(date).getTime() - days * 24 * 60 * 60 * 1000;
