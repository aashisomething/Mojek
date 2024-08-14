const OpenAI = require('openai');
const dotenv = require('dotenv');
const { get, ref } = require('firebase/database');
const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const firebaseConfig = require('./firebaseConfig');
const axios = require('axios');

dotenv.config();

const GPT_API_KEY = process.env.GPT_API_KEY;
const AISENSY_API_KEY = process.env.AISENSY_API_KEY;
const AISENSY_API_URL = process.env.AISENSY_API_URL;

const openai = new OpenAI({
  apiKey: GPT_API_KEY,
});

// Initialized Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userId = 'singleUser';

// Function to fetch transactions
async function fetchTransactions() {
  try {
    const transactionsRef = ref(database, `users/${userId}/transactions`);
    const transactionsSnapshot = await get(transactionsRef);
    if (transactionsSnapshot.exists()) {
      return transactionsSnapshot.val();
    } else {
      console.log('No transactions found');
      return {};
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

// GPT Processing Function
async function processWithGPT(messageContent) {
  if (!messageContent || typeof messageContent !== 'string') {
    console.error('Invalid message content');
    return 'Invalid message content';
  }

  try {
    // Fetch transactions from Firebase
    const transactions = await fetchTransactions();
    const transactionsArray = Object.values(transactions);

    // Prepare messages for GPT
    const messages = [
      { role: 'system', content: 'You are a financial advisor chatbot. Use the following transaction data to answer questions: ' + JSON.stringify(transactionsArray) },
      { role: 'user', content: messageContent }
    ];

    //gpt
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-4',
    });


    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error processing with GPT:', error);
    throw error;
  }
}

// Function to send a message to the user via AiSensy API
const sendMessageToUser = async (phoneNumber, messageContent) => {
  const options = {
    method: 'POST',
    url: AISENSY_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-AiSensy-Project-API-Pwd': AISENSY_API_KEY
    },
    data: {
      to: phoneNumber,
      type: 'text',
      recipient_type: 'individual',
      text: { body: messageContent }
    }
  };

  try {
    const response = await axios.request(options);
    console.log('Response data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};

// Webhook handler
const handleWebhook = async (req, res) => {
  console.log("handle webhook");
  console.log('req.body', req.body)
  try {
    if (req.body && req.body.topic === 'message.created') {
      const message = req.body.data.message;
      const textToProcess = message.message_content.text || '';

      console.log('Text to Process:', textToProcess);

      const gptResponse = await processWithGPT(textToProcess);
      console.log('GPT Response:', gptResponse);

      // Send the GPT response back to the user
      const phoneNumber = message.phone_number; // Ensure phone_number is part of the message object
      await sendMessageToUser(phoneNumber, gptResponse);

      console.log('Response sent to user.');

    } else {
      console.log('Webhook handled but topic is not message.created');
    }
  } catch (error) {
    console.error('Error handling webhook:', error);
  }

  res.status(200).send('webhook handled');
};

module.exports = { handleWebhook };
