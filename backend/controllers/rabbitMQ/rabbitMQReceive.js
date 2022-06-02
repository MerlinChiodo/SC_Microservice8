const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');
const DonationRabbitMQSchema = require('./events/donationEvent.js');
const prismaClient = require('../../prismaClient');

function processCitizenReports(event){
    
}

async function processDonation(event){
    var ajv = new Ajv();
    if (!ajv.validate(DonationRabbitMQSchema, event)) {
        // Faulty Donation
        result = await prismaClient.faultyEvents.create({
            data: {
                content: JSON.stringify(event),
                eventId: 9003
            },
        })
        console.log(result)
    }else{
        console.log("VALID - Donation")
        //Process
    }
}

module.exports = {
    checkQueue: function (incomingEvents) {
        connectionString = `amqp://${process.env.rabbitMQUsername}:${process.env.rabbitMQPassword}@${process.env.serverURL}`;
        amqp.connect(connectionString, function (error0, connection) {
            if (error0) {
                return 0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    return 0;
                }
                channel.consume('finanzamt', function (msg) {
                    try{
                        incomingEvents.push(JSON.parse(msg.content))
                    }catch(error){
                        console.log("Faulty Event")
                        return
                    }
                }, {
                    noAck: true,
                })
            })
        })
        return 1;
    },
    processEvents: function(events){
        events.forEach (function (event, index) {
            if(event.event_id==9003){
                processDonation(event);
            }else{
                console.log(event.toString())
            }
          });
    }
  };