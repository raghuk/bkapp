import * as types from './actionTypes';


export function setCurrentBranch(id) {
    return {
        type: types.SET_CURRENT_BRANCH,
        id
    };
}

export function setDateDB(timestamp = Date.now()) {
    return {
        type: types.SET_DB_DATE,
        timestamp
    };
}

export function getLocations() {
    return {
        type: [types.LOCATIONS_LOAD, types.LOCATIONS_LOAD_SUCCESS, types.LOCATIONS_LOAD_FAILURE],
        promise: (sdk) => sdk.getLocations(),
        loader: true
    };
}
