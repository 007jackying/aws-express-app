const express = require('express');
require('dotenv').config();
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const isProduction = process.env.NODE_ENV === 'production';
console.log(process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  // Only enable SSL if we are in production
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

client.connect();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/questions', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM questions');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving questions');
  }
});

module.exports = app;