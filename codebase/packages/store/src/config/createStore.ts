import { createStore as __createStore, applyMiddleware, StoreEnhancer, Middleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import {
  // @ts-ignore
  RootState,
  // @ts-ignore
  RootReducer,
  // @ts-ignore
  Epic,
} from 'typesafe-actions';
import { Api } from '@pma/api';

export const createStore = ({
  reducer,
  epic,
  services,
  state,
  withLogger,
  composeEnhancer,
}: {
  reducer: RootReducer;
  epic: Epic;
  services: { api: Api };
  state: RootState;
  withLogger?: boolean;
  composeEnhancer?: (...func: StoreEnhancer<{ dispatch: unknown }>[]) => StoreEnhancer<{ dispatch: unknown }>;
}) => {
  const epicMiddleware: Middleware = createEpicMiddleware({
    dependencies: services,
  });
  const middlewares: Middleware[] = [epicMiddleware];

  if (withLogger) {
    const logger = createLogger({
      diff: true,
      duration: true,
      collapsed: true,
    });
    middlewares.push(logger);
  }
  let enhancer = applyMiddleware(...middlewares);

  if (composeEnhancer) {
    enhancer = composeEnhancer(enhancer);
  }

  const store = __createStore(reducer, state, enhancer);

  //@ts-ignore
  epicMiddleware.run(epic);

  return store;
};
