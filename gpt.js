const OpenAI = require('openai');
const dotenv = require('dotenv');
const { get, ref } = require('firebase/database');
const { initializeApp } = require('firebase/app');
const { getDatabase } = require('firebase/database');
const firebaseConfig = require('./firebaseConfig'); 

dotenv.config();

const GPT_API_KEY = process.env.GPT_API_KEY;
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


async function main() {
  try {
    //fetch
    const transactions = await fetchTransactions();

    
    const transactionsArray = Object.values(transactions);

    
    const messages = [
      { role: 'system', content: 'You are a financial advisor chatbot. Use the following transaction data to answer questions: ' + JSON.stringify(transactionsArray) },
      { role: 'user', content: 'how should i invest in stock market' }
    ];

   
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-4',
    });

   
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();
