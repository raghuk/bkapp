import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: 0,
    connectionInfo: {},
    authUser: {}
};

const isFetching = (state = initialState.isFetching, action) => {
    switch (action.type) {
        case types.SHOW_LOADER:
            return state + 1;
        case types.HIDE_LOADER:
            return state > 0 ? state - 1 : 0;
        default:
            return state;
    }
};

const connectionInfo = (state = initialState.connectionInfo, action) => {
    switch (action.type) {
        case types.SET_CONNECTION_STATUS:
            return action.connectionInfo;
        default:
            return state;
    }
};

const authUser = (state = initialState.authUser, action) => {
    switch (action.type) {
        case types.SET_AUTH_USER:
            return action.user;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const app = combineReducers({
    isFetching,
    connectionInfo,
    authUser
});

export default app;
