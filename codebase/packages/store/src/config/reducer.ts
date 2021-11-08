import { combineReducers } from 'redux';

import userReducer from '../entities/user/reducer';
import toastReducer from '../entities/toast/reducer';
import testReducer from '../entities/test/reducer';
import objectiveReducer from '../entities/objective/reducer';
import schemaReducer from '../entities/schema/reducer';
import timelineReducer from '../entities/timeline/reducer';
import managersReducer from '../entities/managers/reducer';

export const rootReducer = combineReducers({
  users: userReducer,
  toasts: toastReducer,
  test: testReducer,
  objectives: objectiveReducer,
  schema: schemaReducer,
  timeline: timelineReducer,
  managers: managersReducer,
});
