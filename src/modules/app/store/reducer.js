import { combineReducers } from 'redux';
import { SET_CONNECTION_STATUS, SET_AUTH_USER } from './constants';


const initialState = {
  connectionInfo: {},
  authUser: {}
};

const connectionInfo = (state = initialState.connectionInfo, action) => {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return action.connectionInfo;
    default:
      return state;
  }
};

const authUser = (state = initialState.authUser, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.user;
    default:
      return state;
  }
};


// Combine all sub-reducers into one root reducer
const reducer = combineReducers({
  connectionInfo,
  authUser
});

export default reducer;
