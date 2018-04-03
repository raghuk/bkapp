import * as types from './actionTypes';


export function showLoader() {
    return {
        type: types.SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: types.HIDE_LOADER
    }
}

export function appReset() {
    return {
        type: types.APP_RESET
    };
}

export function connectionState(connectionInfo) {
    return {
        type: types.SET_CONNECTION_STATUS,
        connectionInfo
    };
}
