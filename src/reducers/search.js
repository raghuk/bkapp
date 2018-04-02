import {combineReducers} from 'redux';

import * as types from '../actions/actionTypes';

const initialState = {
    selectedId: 0
};

const selectedId = (state = initialState.selectedId, action) => {
    switch (action.type) {
        case types.SET_CURRENT_BRANCH:
            return action.id;
        default:
            return state;
    }
};


// Combine all sub-reducers into one root reducer
const search = combineReducers({
    selectedId
});

export default search;
