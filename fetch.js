const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get, child } = require("firebase/database");
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userId = 'singleUser'; // Fixed ID for the only user

// Reference to the user's transactions
const transactionsRef = ref(database, 'users/' + userId + '/transactions');

// Fetch the transactions
get(transactionsRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const transactions = snapshot.val();
      console.log('Transactions:', transactions);
    } else {
      console.log('No transactions found.');
    }
  })
  .catch((error) => {
    console.error('Error fetching transactions:', error);
  });
