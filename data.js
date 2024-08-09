const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, push } = require("firebase/database");
const firebaseConfig = require('./firebaseConfig');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const transactions = [
  {
    "date": "2024-08-01",
    "amount": 150.75,
    "type": "groceries"
  },
  {
    "date": "2024-08-02",
    "amount": 75.00,
    "type": "entertainment"
  },
  {
    "date": "2024-08-03",
    "amount": 1200.00,
    "type": "rent"
  },
  {
    "date": "2024-08-04",
    "amount": 300.00,
    "type": "investments"
  },
  {
    "date": "2024-08-05",
    "amount": 50.00,
    "type": "electricity"
  },
  {
    "date": "2024-08-06",
    "amount": 45.25,
    "type": "groceries"
  },
  {
    "date": "2024-08-07",
    "amount": 180.00,
    "type": "entertainment"
  },
  {
    "date": "2024-08-08",
    "amount": 400.00,
    "type": "investments"
  },
  {
    "date": "2024-08-09",
    "amount": 100.50,
    "type": "electricity"
  },
  {
    "date": "2024-08-10",
    "amount": 130.00,
    "type": "groceries"
  },
  {
    "date": "2024-08-11",
    "amount": 90.00,
    "type": "entertainment"
  },
  {
    "date": "2024-08-12",
    "amount": 250.00,
    "type": "investments"
  },
  {
    "date": "2024-08-13",
    "amount": 100.00,
    "type": "electricity"
  },
  {
    "date": "2024-08-14",
    "amount": 1500.00,
    "type": "rent"
  },
  {
    "date": "2024-08-15",
    "amount": 60.75,
    "type": "groceries"
  },
  {
    "date": "2024-08-16",
    "amount": 200.00,
    "type": "entertainment"
  },
  {
    "date": "2024-08-17",
    "amount": 500.00,
    "type": "investments"
  },
  {
    "date": "2024-08-18",
    "amount": 70.50,
    "type": "electricity"
  },
  {
    "date": "2024-08-19",
    "amount": 80.25,
    "type": "groceries"
  },
  {
    "date": "2024-08-20",
    "amount": 110.00,
    "type": "entertainment"
  }
];

const userId = 'singleUser'; // Fixed ID for the only user

// Reference to the user's transactions
const transactionsRef = ref(database, 'users/' + userId + '/transactions');


transactions.forEach((transaction) => {
  const newTransactionRef = push(transactionsRef);
  set(newTransactionRef, transaction)
    .then(() => {
      console.log('Transaction saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving transaction:', error);
    });
});
