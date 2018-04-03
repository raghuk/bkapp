import * as types from './actionTypes';


export function updateNotification(notification) {
    return {
        type: types.UPDATE_NOTIFICATIONS,
        notification
    }
}

export function loadNotifications() {
    return {
        type: types.LOAD_NOTIFICATIONS
    }
}
