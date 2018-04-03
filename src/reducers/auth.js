import { combineReducers } from 'redux';

import * as types from '../actions/actionTypes';

const initialState = {
    user: {}
};

const user = (state = initialState.user, action) => {
    switch (action.type) {
        case types.SET_AUTH_USER:
            return action.user;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const auth = combineReducers({
    user
});

export default auth;
