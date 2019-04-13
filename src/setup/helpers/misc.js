import { Location, Permissions } from 'expo';

import { firebaseApp } from '../config';


export async function getUserLocation(userId) {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);

  // Stop here if the user did not grant permissions
  if (status !== 'granted') {
    return;
  }

  const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

  firebaseApp
    .database()
    .ref(`users/${userId}`)
    .update({ location });
}

export function getTime(date2, date1) {
  let diff = (date2.getTime() - date1.getTime()) / 1000;
  diff /= (60 * 60 * 24);
  return Math.abs(Math.round(diff));
}
