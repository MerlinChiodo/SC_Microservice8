const express = require('express');
var history = require('connect-history-api-fallback');
const app = express();
const cron = require('node-cron');
const cors = require('cors')
const port = 3000;

/**
 * Middleware
 */
 app.use(express.json())
 app.use(express.urlencoded({
     extended: false,
 }))
 app.use(cors())

/**
 * Imports
 */
const rabbitMQ = require('./controllers/rabbitMQ.js');
const contactRequest = require('./routes/contactRequest.js')
const operations = require('./routes/operations.js')
const files = require('./routes/files.js')

/**
 * Cronjobs
 */
cron.schedule('59 23 * * *', function() {
  console.log('---------------------');
  console.log('Running Daily Cron Job');
  //Daily check of RabbitMQ,...
  if(rabbitMQ.checkQueue()<1){
    console.log('Cron job failed')
  }
  console.log('---------------------');
});

/**
 * Routes
 */
// API routes
app.use('/api/contactRequest', contactRequest)
app.use('/api/operations', operations)
app.use('/api/files', files)

// Use history for delivering Vue.js 
app.use(history());
// Deliver static files from directory 'public'
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Finanzamt-backend listening at http://localhost:${port}`);
});