import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyDs4KObxOE9kMwEjtJFLdpAR4PwDl5Sg0I",
    authDomain: "j-m-f3217.firebaseapp.com",
    databaseURL: "https://j-m-f3217.firebaseio.com",
    projectId: "j-m-f3217",
    storageBucket: "j-m-f3217.appspot.com",
    messagingSenderId: "975698087098",
    appId: "1:975698087098:web:485509ad1f06a41241c683",
    measurementId: "G-0PLECRWDRR"
};
// Initialize Firebase
const fb = firebase.initializeApp(config);
const fba = firebase.analytics();
const db = firebase.firestore();

export {fb, db, fba}
