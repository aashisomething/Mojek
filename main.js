const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');
const axios = require('axios');
const firebaseConfig = require('./firebaseConfig');


dotenv.config();

// Initialized Firebase
const app = initializeApp(firebaseConfig);

// AI Sensy API key and URL
const AISENSY_API_KEY = process.env.AISENSY_API_KEY;
const AISENSY_API_URL = process.env.AISENSY_API_URL;

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


sendMessage('+1234567890', 'Hello! This is a test message.');
