import { Status, TimelineType } from 'config/enum';
import { Employee } from 'config/types';

export const getLastTimelineStatus = (employee: Employee) =>
  employee.timeline.reduce((prev, current) => {
    if (current.type !== TimelineType.TIMELINE_POINT && current.status !== Status.STARTED) {
      prev = current.status;
    }

    return prev;
  }, Status.STARTED);
