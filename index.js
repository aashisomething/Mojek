const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");

const firebaseConfig = {
  apiKey: "AIzaSyAa-FMKDNUDNJdgpv8_LRIes12io0s8K0U",
  authDomain: "mojek-eb001.firebaseapp.com",
  databaseURL: "https://mojek-eb001-default-rtdb.firebaseio.com",
  projectId: "mojek-eb001",
  storageBucket: "mojek-eb001.appspot.com",
  messagingSenderId: "495484876927",
  appId: "1:495484876927:web:4eb5b014c7bb2c4689274a",
  measurementId: "G-M0EC4SZ3NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
