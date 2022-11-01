import firebase from 'firebase/app';
// 개별 export 하려면 각각의 기능들을 import 해야 한다.
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBsviTaQ0e1fwqD4ulbFWPpUaffZ8xbf80",
    authDomain: "study52.firebaseapp.com",
    projectId: "study52",
    storageBucket: "study52.appspot.com",
    messagingSenderId: "379951577437",
    appId: "1:379951577437:web:274ca8acd2d7c02bf550b4",
    measurementId: "G-1JVWT7P3SL"
  };

firebase.initializeApp(firebaseConfig);

//export default firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
export const firebaseInstance = firebase;
