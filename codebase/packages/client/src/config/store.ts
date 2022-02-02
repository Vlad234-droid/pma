import { createStore, rootEpic, rootReducer } from '@pma/store';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from '@pma/api';
import openapi from './api-client';

const store = createStore({
  reducer: rootReducer,
  epic: rootEpic,
  services: { api, openapi },
  state: {},
  withLogger: false,
  composeEnhancer: composeWithDevTools({}),
});

export default store;
