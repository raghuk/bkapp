import {Constants, Permissions, Notifications} from 'expo';

import {firebaseApp} from '../config';


export default (async function registerForPN(userId) {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    firebaseApp.database().ref('users/'+ userId).update({
        token: token,
        platform: Constants.platform,
        deviceName: Constants.deviceName
    });
});
