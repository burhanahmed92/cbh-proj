const {deterministicPartitionKey} = require("./dpk");

console.log(deterministicPartitionKey());

const express = require('express');
const { Client } = require('pg');
const reportsRouter = require('./routes/reports');

const app = express();

// Connect to the database
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'software@alliance',
  database: 'staffing_company'
});
client.connect(()=>{
    console.log('database conected')
});

// Use the reports router for generating reports

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/reports', reportsRouter);


// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
