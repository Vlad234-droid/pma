import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

export const feedbackSelector = (state: RootState) => state.feedback;

export const getReviews = createSelector(feedbackSelector, (feedback: any) => {
  const { reviews } = feedback;
  return reviews;
});

export const getGivenFeedbacksSelector = createSelector(feedbackSelector, (feedback: any) => {
  const {
    feedbacksCount: { given },
  } = feedback;
  return given;
});
export const getRequestedFeedbacksSelector = createSelector(feedbackSelector, (feedback: any) => {
  const {
    feedbacksCount: { requested },
  } = feedback;
  return requested;
});

export const feedbackByUuidSelector = (uuid) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { give, respond, view },
    } = feedback;

    const filtered = [...(give || []), ...(respond || []), ...(view || [])]?.find((item) => item.uuid === uuid) ?? [];

    return filtered;
  });

export const getPropperNotesByCriteria = ({ status, filterFn, sortFn, serializer }) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { view },
    } = feedback;

    const filtered = view
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
      feedbacks: { give },
    } = feedback;

    const filtered = give?.filter((item) => item.status === status) ?? [];

    return filtered;
  });

export const getRespondedFeedbacksSelector = (status) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const {
      feedbacks: { respond },
    } = feedback;

    const filtered = respond?.filter((item) => item.status === status) ?? [];

    return filtered;
  });
