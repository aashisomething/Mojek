import dotenv from "dotenv"

dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import { handleWebhook } from './controllers.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Webhook route
app.post('/webhook', handleWebhook);

app.listen(3000, () => {
  console.log('Server is listening on port 3000 🎉');
});