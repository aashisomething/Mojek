const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userId = 'singleUser'; // Fixed ID for the only user


async function fetchTransactions() {
  const transactionsRef = ref(database, 'users/' + userId + '/transactions');

  try {
    const snapshot = await get(transactionsRef);
    if (snapshot.exists()) {
      const transactions = snapshot.val();
      console.log('Transactions:', transactions);
      return transactions;
    } else {
      console.log('No transactions found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

module.exports = { fetchTransactions };
