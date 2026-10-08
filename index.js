/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, Platform } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

// Initialize Firebase with explicit configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCPGdlseahB_GhS8eTPvTh1G-PgpyNvD-U',
  authDomain: 'yerin-567d7.firebaseapp.com',
  projectId: 'yerin-567d7',
  storageBucket: 'yerin-567d7.firebasestorage.app',
  messagingSenderId: '780053798586',
  appId: '1:780053798586:ios:b252d1c55eaa40412cac83',
  databaseURL: 'https://yerin-567d7.firebaseio.com',
};

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
    console.log('✅ Firebase initialized successfully');
  } catch (error) {
    console.error('❌ Firebase initialization error:', error);
  }
}

// Set up background message handler for FCM
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);