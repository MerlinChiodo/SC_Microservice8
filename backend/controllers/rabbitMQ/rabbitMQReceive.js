const ampq = require('amqplib/callback_api.js');
const Ajv = require('ajv');
const { DonationRabbitMQSchema } = require('./events/donationEvent.js');

function processCitizenReports(event){
    
}

function processDonations(event){
    if (!ajv.validate(DonationRabbitMQSchema, event)) {
        //Fail
    }
}

module.exports = {
    checkQueue: function () {
        return 1;
    }
  };