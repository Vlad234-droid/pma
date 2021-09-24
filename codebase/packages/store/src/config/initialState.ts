import {StateType} from 'typesafe-actions';
import {initialState as userInitialState} from '../entities/user/reducer';
import {initialState as toastInitialState} from '../entities/toast/reducer';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
};

export type State = StateType<typeof initialState>;
