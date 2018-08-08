/* eslint-disable */

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDt_BbaFtlFlgDccIiUw2BtpxpjdZ5pDtw",
  authDomain: "qr-app-4198a.firebaseapp.com",
  databaseURL: "https://qr-app-4198a.firebaseio.com",
  projectId: "qr-app-4198a",
  storageBucket: "qr-app-4198a.appspot.com",
  messagingSenderId: "158580488270"
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db,
}