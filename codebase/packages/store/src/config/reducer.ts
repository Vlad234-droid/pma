import { combineReducers } from 'redux';

import userReducer from '../entities/user/reducer';
import toastReducer from '../entities/toast/reducer';
import objectiveReducer from '../entities/objective/reducer';
import schemaReducer from '../entities/schema/reducer';
import timelineReducer from '../entities/timeline/reducer';

export const rootReducer = combineReducers({
  users: userReducer,
  toasts: toastReducer,
  objectives: objectiveReducer,
  schema: schemaReducer,
  timeline: timelineReducer,
});
