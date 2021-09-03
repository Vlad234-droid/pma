//@ts-ignore
import { RootState } from 'typesafe-actions';

export const getRequestErrorsSelector = (state: RootState) => state.requestErrors.data;
export const getMetaOfRequestErrorsSelector = (state: RootState) => state.requestErrors.meta;
