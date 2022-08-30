import { createSelector, ParametricSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

interface WithUuid {
  uuid: string;
}

export const priorityNoteSelector = (state: RootState) => state.priorityNotes;

export const priorityNotesMetaSelector = createSelector(priorityNoteSelector, (notes: any) => {
  const { meta } = notes;
  return meta;
});

export const getPriorityNoteByUuid: ParametricSelector<RootState, any, any> = createSelector(
  [priorityNoteSelector, (_, id: string | undefined) => id],
  (notes, id) => (id ? notes.prioritiesNotes[id] : undefined),
);

export const getPriorityNoteByReviewId: ParametricSelector<RootState, any, any> = createSelector(
  [priorityNoteSelector, (_, reviewUuid: string) => reviewUuid],
  (notes, reviewUuid) => {
    const key = notes.linkMap?.[reviewUuid];
    return key && notes.prioritiesNotes?.[key];
  },
);

export const getReviewsWithoutPriorityNote: ParametricSelector<RootState, any, any> = createSelector(
  [priorityNoteSelector, (_, list: WithUuid[]) => list],
  (notes, list) => list.filter((element) => !notes.linkMap?.[element.uuid]),
);
