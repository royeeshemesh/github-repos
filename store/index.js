import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// REDUCERS
import RepositoriesReducer from './repositories/reducer';

export function initializeStore(initialState = {}) {
  const reducers = {
    repositories: RepositoriesReducer,
  };

  return createStore(
    combineReducers(reducers),
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
