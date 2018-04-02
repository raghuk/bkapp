import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';

const initialState = {
    isFetching: 0
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


// Combine all sub-reducers into one root reducer
const app = combineReducers({
    isFetching
});

export default app;
