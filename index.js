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

const axios = require('axios');

const AISENSY_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWYxZDU3YmVjYjA0MGNmNzY5NWU0MCIsIm5hbWUiOiJVbmNvZGV6IERpZ2l0YWwgU29sdXRpb25zIiwiYXBwTmFtZSI6IkFpU2Vuc3kiLCJjbGllbnRJZCI6IjY2NWYxZDU3YmVjYjA0MGNmNzY5NWUzNyIsImFjdGl2ZVBsYW4iOiJCQVNJQ19NT05USExZIiwiaWF0IjoxNzE3NTA5NDYzfQ.KbrHLq1S6WBm2FCrr9r7ri2sdWVjRXksLKXF22RZn8A';
const AISENSY_API_URL = 'https://api.aisensy.com/send-message';

async function sendMessage(toNumber, messageContent) {
    try {
        const response = await axios.post(AISENSY_API_URL, {
            apiKey: AISENSY_API_KEY,
            to: toNumber,
            message: messageContent,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.data && response.data.success) {
            console.log('Message sent successfully:', response.data);
        } else {
            console.log('Failed to send message:', response.data);
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Usage
sendMessage('+1234567890', 'Hello! This is a test message.');
