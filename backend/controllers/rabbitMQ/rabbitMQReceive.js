const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');
const DonationRabbitMQSchema = require('./events/donationEvent.js');
const prismaClient = require('../../prismaClient');
const fetch = require('node-fetch');

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
        console.log("Faulty donation")
    }else{
        const body = {
            amount: event.amount,
            donator: event.citizen_id,
            recipiant: 0 
        }
        await fetch('http://localhost:3000/api/donations', {method: 'post', body: JSON.stringify(body), headers: {'token':"1234",'Content-Type':"application/json"}})
        .then(res => res.json())
        .then(json => console.log("Donation -",json));
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
        while(events.length>0){
            item = events.pop()
            switch (item.event_id) {
                case 9003:
                    processDonation(item);
                    break;
                default:
                    console.log(item);
                    break;
            }
        }
    }
  };