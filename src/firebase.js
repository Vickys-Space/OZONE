import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl5rH30tGwk2v0zUVkDrUPcqF-YblEYLY",
  authDomain: "ozone-shop.firebaseapp.com",
  databaseURL: "https://ozone-shop.firebaseio.com",
  projectId: "ozone-shop",
  storageBucket: "ozone-shop.appspot.com",
  messagingSenderId: "600101111431",
  appId: "1:600101111431:web:7b43d54bd0eddb49a0da22",
  measurementId: "G-DR5B9691G9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
