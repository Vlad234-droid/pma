import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ActionStatus, CycleType, Status } from 'config/enum';
import { getEmployeesWithReviewStatuses } from '@pma/store';
import { Tenant, useTenant } from 'features/general/Permission';
import { SortBy } from '../../Filters';

export default (status: Status | ActionStatus, searchValue?: string, sortValue?: SortBy) => {
  const tenant = useTenant();
  const employees = useSelector((state) => getEmployeesWithReviewStatuses(state, status, searchValue, sortValue)) || [];

  return useMemo(
    () =>
      tenant === Tenant.GENERAL
        ? employees
            .map((colleague) => {
              const cycleUuids = colleague.cycles
                .filter((cycle) => cycle.type === CycleType.FISCAL)
                .map(({ uuid }) => uuid);
              const excludeTimeline =
                colleague.timeline
                  ?.filter(
                    (timeline) =>
                      timeline?.code === 'EYR' &&
                      cycleUuids.includes(timeline?.cycleUuid) &&
                      [Status.LOCKED, Status.FINISHING, Status.COMPLETED].includes(timeline?.status),
                  )
                  .map((timeline) => timeline.uuid) || [];

              return {
                ...colleague,
                timeline: colleague.timeline.filter((timeline) => !excludeTimeline.includes(timeline.uuid)),
                reviews: colleague.reviews.filter((review) => !excludeTimeline.includes(review.tlPointUuid)),
              };
            })
            .filter((colleague) => !!colleague?.reviews?.length)
        : employees,
    [employees, tenant],
  );
};
