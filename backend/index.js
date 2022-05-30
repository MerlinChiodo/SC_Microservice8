const app = require('./app.js');
const cron = require('node-cron');
const port = 3000;
const rabbitMQ = require('./controllers/rabbitMQ/rabbitMQReceive.js');

/**
 * Cronjobs
 */
cron.schedule('0 */12 * * *', function() {
  console.log('---------------------');
  console.log('Running Daily Cron Job');
  //Daily check of RabbitMQ,...
  if(rabbitMQ.checkQueue()<1){
    console.log('Cron job failed')
  }
  console.log('---------------------');
});

app.listen(port, () => console.log(`Finanzamt-backend listening at http://localhost:${port}`))