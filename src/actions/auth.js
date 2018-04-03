import * as types from './actionTypes';


export function setAuthUser(user) {
    return {
        type: types.SET_AUTH_USER,
        user
    };
}
