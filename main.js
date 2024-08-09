const { initializeApp } = require("firebase/app");
const dotenv = require('dotenv');
const axios = require('axios');
const firebaseConfig = require('./firebaseConfig');

dotenv.config();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// AI Sensy API key and URL
const AISENSY_API_KEY = process.env.AISENSY_API_KEY;
const AISENSY_API_URL = process.env.AISENSY_API_URL;

const sendMessage = async () => {
  const options = {
    method: 'POST',
    url: AISENSY_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-AiSensy-Project-API-Pwd': AISENSY_API_KEY
    },
    data: {
      to: '917397807939',
      type: 'text',
      recipient_type: 'individual',
      text: { body: 'hello this is a test message' }
    }
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};


sendMessage();
