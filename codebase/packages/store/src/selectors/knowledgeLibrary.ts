//@ts-ignore
import { createSelector } from 'reselect'; //@ts-ignore
import { RootState } from 'typesafe-actions';

export const knowledgeLibrarySelector = (state: RootState) => state.knowledgeLibrary || {};

export const getKnowledgeLibraryData = createSelector(knowledgeLibrarySelector, ({ data }) => data || {});
