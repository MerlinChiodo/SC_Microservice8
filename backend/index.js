const app = require('./app.js');
const cron = require('node-cron');
const port = 3000;
const rabbitMQ = require('./controllers/rabbitMQ/rabbitMQReceive.js');

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

app.listen(port, () => console.log(`Finanzamt-backend listening at http://localhost:${port}`))