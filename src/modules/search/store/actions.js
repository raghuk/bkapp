import {
  SET_DB_DATE,
  SET_CURRENT_BRANCH
} from './constants';


export function setCurrentBranch(id) {
  return {
    type: SET_CURRENT_BRANCH,
    id
  };
}

export function setDateDB(timestamp = Date.now()) {
  return {
    type: SET_DB_DATE,
    timestamp
  };
}
