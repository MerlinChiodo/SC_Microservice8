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
        connectionString = `amqp://${process.env.rabbitMQUsername}:${process.env.rabbitMQPassword}@${process.env.serverURL}`;
        amqp.connect(connectionString, function (error0, connection) {
        if (error0) {
            return 1;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                return 1;
            }

            console.log('Listening for events')

            channel.consume('finanzamt', function (msg) {
                console.log(msg.content.toString())
            }, {
                noAck: true,
            })
        })
    })
    return 0;
    }
  };