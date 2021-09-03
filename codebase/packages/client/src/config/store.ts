import { createStore, rootEpic, rootReducer } from '@pma/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from '@pma/api';

const store = createStore({
  reducer: rootReducer,
  epic: rootEpic,
  services: { api },
  state: {},
  withLogger: false,
  composeEnhancer: composeWithDevTools,
});

export default store;
