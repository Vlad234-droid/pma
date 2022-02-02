//@ts-ignore
import { RootState } from 'typesafe-actions';

export const appStateSelector = (state: RootState) => state.appState;

export const appStateModalErrorSelector = (state: RootState) => state.appState.modalError;
