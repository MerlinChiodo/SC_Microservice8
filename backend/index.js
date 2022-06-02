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
const rabbitMQ = require('./controllers/rabbitMQ/rabbitMQReceive.js');
const contactRequest = require('./routes/contactRequest.js')
const operations = require('./routes/operations.js')
const files = require('./routes/files.js')
const appointments = require('./routes/appointments.js')
const donations = require('./routes/donations.js')
const income = require('./routes/income.js')
const companies = require('./routes/companies.js')
const notes = require('./routes/process/notes.js')
const statusUpdates = require('./routes/process/statusUpdates.js')
const citizens = require('./routes/citizen.js')
const processes = require('./routes/process/process.js')
const forms = require('./routes/internal/forms.js')
const blogEntries = require('./routes/internal/blogEntry.js')
const worker = require('./routes/internal/worker.js')
const deadline = require('./routes/internal/deadline.js')
/**
 * RabbitMQ
 */
incomingEvents = []
if(rabbitMQ.checkQueue(incomingEvents)<1){
  console.log("RabbitMQ - Connection failed")
}else{
  console.log("RabbitMQ - Connected")
}
/**
 * Cronjobs
 */
cron.schedule('* * * * *', function() { // '0 */12 * * *'
  console.log('---------------------');
  console.log('Running Daily Cron Job');
  //Daily check of RabbitMQ,...
  rabbitMQ.processEvents(incomingEvents);
});

/**
 * Routes
 */
// API routes
app.use('/api/contactRequest', contactRequest)
app.use('/api/operations', operations)
app.use('/api/files', files)
app.use('/api/appointments', appointments)
app.use('/api/donations', donations)
app.use('/api/income', income)
app.use('/api/companies', companies)
app.use('/api/notes', notes)
app.use('/api/statusUpdates', statusUpdates)
app.use('/api/citizen', citizens)
app.use('/api/process', processes)
app.use('/api/forms', forms)
app.use('/api/blogEntries', blogEntries)
app.use('/api/worker', worker)
app.use('/api/deadline', deadline)

// Use history for delivering Vue.js 
app.use(history());
// Deliver static files from directory 'public'
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Finanzamt-backend listening at http://localhost:${port}`);
});