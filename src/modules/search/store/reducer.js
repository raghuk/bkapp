import { combineReducers } from 'redux';

import * as types from './constants';

const initialState = {
  selectedId: 0,
  updatedAt: 0,
  error: null
};

const selectedId = (state = initialState.selectedId, action) => {
  switch (action.type) {
    case types.SET_CURRENT_BRANCH:
      return action.id;
    default:
      return state;
  }
};

const updatedAt = (state = initialState.updatedAt, action) => {
  switch (action.type) {
    case types.SET_DB_DATE:
      return action.timestamp;
    default:
      return state;
  }
};

const error = (state = initialState.error, action) => {
  switch (action.type) {
    case types.LOCATIONS_LOAD_FAILURE:
      return action.error;
    case types.LOCATIONS_LOAD_SUCCESS:
      return null;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const search = combineReducers({
  selectedId,
  updatedAt,
  error
});

export default search;
