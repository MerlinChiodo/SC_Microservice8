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
                content: event.toString(),
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
    checkQueue: function () {
        connectionString = `amqp://${process.env.rabbitMQUsername}:${process.env.rabbitMQPassword}@${process.env.serverURL}`;
        amqp.connect(connectionString,{ timeout: 1000 } , function (error0, connection) {
            if (error0) {
                return 0;
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    return 0;
                }
                channel.consume('finanzamt', function (msg) {
                    try{
                        jsonMsg = JSON.parse(msg.content);
                    }catch(error){
                        console.log("Faulty Event")
                        return
                    }
                    if(jsonMsg.event_id==9003){
                        processDonation(msg.content);
                    }else{
                        console.log(msg.content.toString())
                    }
                }, {
                    noAck: true,
                })
            })
        })
        setTimeout(function() {}, 1000);
        return 1;
    }
  };