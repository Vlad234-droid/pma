import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { FeedbackStatus } from '@pma/client/src/config/enum';

//@ts-ignore

type statusType = 'DRAFT' | 'SUBMITTED' | 'PENDING' | 'COMPLETED';

export const feedbackSelector = (state: RootState) => state.feedback;

export const getCompletedFeedbackNotesS = createSelector(feedbackSelector, (feedback: any) => {
  const { notes } = feedback;
  const completedNotes = notes.filter((item) => item.status === FeedbackStatus.COMPLETED);
  return completedNotes;
});

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

export const feedbackByStatusSelector = (status) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;
    if (typeof status === 'string') {
      const filterByStatus = notes.filter((item) => item.status === status);
      return filterByStatus;
    }
    if (typeof status === 'object' && !!status.length) {
      const filteredByStatus: any = [];
      (status as Array<statusType>).forEach((itemStatus) => {
        notes.forEach((item) => {
          if (item.status === itemStatus) {
            filteredByStatus.push(item);
          }
        });
      });

      return filteredByStatus;
    }
  });

export const feedbackByUuidSelector = (uuid) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;
    return notes.find((item) => item.uuid === uuid);
  });

export const getPropperNotesByCriteria = ({ status, filterFn, sortFn, serializer }) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;

    return notes
      .filter(
        (item) => filterFn(item) && (Array.isArray(status) ? status.includes(item.status) : item.status === status),
      )
      .map(serializer)
      .sort(sortFn);
  });
