import { combineReducers } from 'redux';

import userReducer from '../entities/user/reducer';
import toastReducer from '../entities/toast/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  toasts: toastReducer,
});
