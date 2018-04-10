import * as firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyDzOqVmlKCdrrKkTLCZUplj5brKlEvJaMo",
    authDomain: "bkapp-497ec.firebaseapp.com",
    databaseURL: "https://bkapp-497ec.firebaseio.com",
    projectId: "bkapp-497ec",
    storageBucket: "bkapp-497ec.appspot.com",
    messagingSenderId: "911987860662"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const api = {host: '', version: ''};
