import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { FeedbackStatus } from '@pma/client/src/config/enum';

//@ts-ignore

type statusType = 'DRAFT' | 'SUBMITTED' | 'PENDING' | 'COMPLETED';

export const feedbackSelector = (state: RootState) => state.feedback;

export const getReviews = createSelector(feedbackSelector, (feedback: any) => {
  const { reviews } = feedback;
  return reviews;
});

export const getNotesArgsSelector = (status, colleagueUuid) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;

    const filterByArgs = notes
      .filter((item) => item.status === status)
      .filter((item) => item.colleagueUuid === colleagueUuid);

    return filterByArgs;
  });

export const getUnReadSubmittedNotesSelector = (status, colleagueUuid) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;

    const filterByArgs = notes
      .filter((item) => (Array.isArray(status) ? status.includes(item.status) : item.status === status))
      .filter((item) => item.targetColleagueUuid === colleagueUuid)
      .filter((item) => !item.read);
    return filterByArgs;
  });

export const feedbackByUuidSelector = (uuid) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { giveFeedback, respondFeedback },
    } = feedback;

    const filtered = [...(giveFeedback || []), ...(respondFeedback || [])]?.find((item) => item.uuid === uuid) ?? [];

    return filtered;
  });

export const getPropperNotesByCriteria = ({ status, filterFn, sortFn, serializer }) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { viewFeedback },
    } = feedback;

    const filtered = viewFeedback
      ?.filter(
        (item) => filterFn(item) && (Array.isArray(status) ? status.includes(item.status) : item.status === status),
      )
      .map(serializer)
      .sort(sortFn);

    return filtered;
  });

export const getGiveFeedbacksSelector = (status) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { giveFeedback },
    } = feedback;

    const filtered = giveFeedback?.filter((item) => item.status === status) ?? [];

    return filtered;
  });

export const getRespondedFeedbacksSelector = (status) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { respondFeedback },
    } = feedback;

    const filtered = respondFeedback?.filter((item) => item.status === status) ?? [];

    return filtered;
  });
