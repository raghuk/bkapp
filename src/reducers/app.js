import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: 0,
    connectionInfo: {},
    user: {},
    updatedDBat: 0
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

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case types.SET_AUTH_USER:
            return action.user;
        default:
            return state;
    }
};

const updatedDBat = (state = initialState.updatedDBat, action) => {
    switch (action.type) {
        case types.SET_DB_UPDATE_DATE:
            return action.timestamp;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const app = combineReducers({
    isFetching,
    connectionInfo,
    user,
    updatedDBat
});

export default app;
