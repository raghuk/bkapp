import {
  APP_RESET,
  SET_CONNECTION_STATUS,
  SET_AUTH_USER,
  LOAD_NOTIFICATIONS,
  UPDATE_NOTIFICATIONS
} from './constants';


export function appReset() {
  return {
    type: APP_RESET
  };
}

export function connectionState(connectionInfo) {
  return {
    type: SET_CONNECTION_STATUS,
    connectionInfo
  };
}

export function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    user
  };
}

export function loadNotifications() {
  return {
    type: LOAD_NOTIFICATIONS
  };
}

export function updateNotification(notification) {
  return {
    type: UPDATE_NOTIFICATIONS,
    notification
  };
}
