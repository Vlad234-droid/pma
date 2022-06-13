import { Status, TimelineType } from 'config/types';
import { generateEmployeeReview, generateTimelines, generateTimeline } from 'utils/test';

import { getLastTimelineStatus } from './index';

describe('<MyTeam /> utils', () => {
  describe('#getLastTimelineStatus', () => {
    it('should return Status.STARTED, if items has Status.STARTED', () => {
      const timeline = generateTimelines(2, { status: Status.STARTED });
      const employee = {
        ...generateEmployeeReview(),
        timeline,
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.STARTED);
    });

    it('should return Status.STARTED, if all types are TIMELINE_POINT', () => {
      const timeline = generateTimelines(2, { type: TimelineType.TIMELINE_POINT });
      const employee = {
        ...generateEmployeeReview(),
        timeline,
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.STARTED);
    });

    it('should return Status.STARTED, if there are no timeline with type different from TIMELINE_POINT or status different from STARTED', () => {
      const timeline1 = generateTimeline({ type: TimelineType.TIMELINE_POINT });
      const timeline2 = generateTimeline({ status: Status.STARTED });
      const employee = {
        ...generateEmployeeReview(),
        timeline: [timeline1, timeline2],
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.STARTED);
    });

    it('should return Status.PENDING, if last item in timelines has its status and is not TIMELINE_POINT', () => {
      const timeline1 = generateTimeline({ type: TimelineType.TIMELINE_POINT });
      const timeline2 = generateTimeline({ status: Status.STARTED });
      const timeline3 = generateTimeline();
      const employee = {
        ...generateEmployeeReview(),
        timeline: [timeline1, timeline2, timeline3],
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.PENDING);
    });

    it('should return Status.PENDING, if last item without TIMELINE_POINT in timelines has its status', () => {
      const timeline1 = generateTimeline({ type: TimelineType.TIMELINE_POINT });
      const timeline2 = generateTimeline({ status: Status.STARTED });
      const timeline3 = generateTimeline();
      const employee = {
        ...generateEmployeeReview(),
        timeline: [timeline1, timeline3, timeline2],
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.PENDING);
    });

    it('should return Status.Draft, if last item in timelines has its status and is not TIMELINE_POINT', () => {
      const timeline1 = generateTimeline({ type: TimelineType.TIMELINE_POINT });
      const timeline2 = generateTimeline({ status: Status.STARTED });
      const timeline3 = generateTimeline();
      const timeline4 = generateTimeline({ status: Status.DRAFT });
      const employee = {
        ...generateEmployeeReview(),
        timeline: [timeline1, timeline3, timeline2, timeline4],
      };

      expect(getLastTimelineStatus(employee)).toBe(Status.DRAFT);
    });
  });
});
