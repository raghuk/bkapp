import * as types from './actionTypes';


export function setCurrentBranch(id) {
    return {
        type: types.SET_CURRENT_BRANCH,
        id
    };
}
