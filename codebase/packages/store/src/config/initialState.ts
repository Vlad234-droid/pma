import { StateType } from 'typesafe-actions';
import { initialState as userInitialState } from '../entities/user/reducer';
import { initialState as toastInitialState } from '../entities/toast/reducer';
import { initialState as objectiveInitialState } from '../entities/objective/reducer';
import { initialState as schemaInitialState } from '../entities/schema/reducer';

//@ts-ignore
export const initialState = {
  users: userInitialState,
  toasts: toastInitialState,
  objectives: objectiveInitialState,
  schema: schemaInitialState,
};

export type State = StateType<typeof initialState>;
