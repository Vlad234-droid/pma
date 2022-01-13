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

export const getReviewsS = createSelector(feedbackSelector, (feedback: any) => {
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
      .filter((item) => item.status === status)
      .filter((item) => item.targetColleagueUuid === colleagueUuid)
      .filter((item) => !item.read);
    return filterByArgs;
  });

export const getPropperNotesByStatusSelector = (status) =>
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

export const getPropperNotesByCriterionSelector = ({ status, isReaded, filterFn, sortFn, serializer }) =>
  createSelector(feedbackSelector, (feedback: any) => {
    const { notes } = feedback;
    let filteredByStatus = [] as any;

    if (typeof status === 'string') {
      filteredByStatus = notes.filter((item) => item.status === status);
    }
    if (typeof status === 'object' && !!status.length) {
      (status as Array<statusType>).forEach((itemStatus) => {
        notes.forEach((item) => {
          if (item.status === itemStatus) {
            filteredByStatus.push(item);
          }
        });
      });
    }

    return filteredByStatus
      .filter((item) => filterFn(item, isReaded))
      .map(serializer)
      .sort(sortFn);
  });
