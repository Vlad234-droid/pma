import { buildSearchFeedbacksQuery, getSortString } from 'utils';
import { FEEDBACK_STATUS_IN, FeedbackStatus } from 'config/enum';

export const prepareData = (colleagueUuid, filter, _limit = '300') => ({
  _limit,
  'colleague-uuid': colleagueUuid,
  ...(filter.search.length > 2 && buildSearchFeedbacksQuery(filter.search)),
  _sort: getSortString(filter),
  status_in: [FEEDBACK_STATUS_IN.DRAFT, FEEDBACK_STATUS_IN.SUBMITTED],
  statuses_in: [FeedbackStatus.SUBMITTED, FeedbackStatus.COMPLETED],
});
