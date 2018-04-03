import {Constants, Location, Permissions, Notifications} from 'expo';

import {firebaseApp} from '../config';


export default (async function registerForPN() {
    // let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let { status } = await Permissions.getAsync(Permissions.LOCATION);

    // Stop here if the user did not grant permissions
    if (status !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    let userId = firebaseApp.auth().currentUser.uid;

    firebaseApp.database().ref('users/'+ userId).update({
        token: token,
        location: location,
        platform: Constants.platform,
        deviceName: Constants.deviceName
    });
});
