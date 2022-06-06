const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');
const DonationRabbitMQSchema = require('./events/donationEvent.js');
const prismaClient = require('../../prismaClient');
const fetch = require('node-fetch');

async function storeFaultyEvent(id,content){
    return await prismaClient.faultyEvents.create({
        data: {
            content: JSON.stringify(content),
            eventId: parseInt(id)
        },
    })
}

function processCitizenReports(event){
    
}

async function processDonation(event){
    var ajv = new Ajv();
    if (!ajv.validate(DonationRabbitMQSchema, event)) {
        // Faulty Donation (correct id, wrong fields)
        storeFaultyEvent(9003,event).then(console.log("Faulty donation"))
    }else{
        const body = {
            amount: event.amount,
            donator: event.citizen_id,
            recipiant: 0 
        }
        await fetch('http://localhost:3000/api/donations', {method: 'post', body: JSON.stringify(body), headers: {'token':"1234",'Content-Type':"application/json"}})
        .then(response => {
            if(response.status === 201){
                console.log("Donation was created")
            }else{
                // Faulty donation (wrong content)
                storeFaultyEvent(9003,event).then(console.log("Faulty donation"))
            }
          })
    }
}

function checkQueue(incomingEvents){
    connectionString = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_SERVER_URL}?heartbeat=60`;
    amqp.connect(connectionString, function (error0, connection) {
        if (error0) {
            console.error("[RABBITMQ fail] "+error0.message);
            return setTimeout(checkQueue, 1000, incomingEvents);
        }
        connection.on("error", function(err) {
            console.error("[RABBITMQ error]", err.message);
        });
        connection.on("close", function() {
            console.error("[RABBITMQ reconnecting]");
            connection.close();
            return setTimeout(checkQueue, 1000, incomingEvents);
        });
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
}
module.exports = {
    checkQueue,
    processEvents: function(events){
        while(events.length>0){
            item = events.pop()
            switch (item.event_id) {
                case 9003:
                    processDonation(item);
                    break;
                default:
                    storeFaultyEvent(item.event_id,item)
                    console.log(item);
                    break;
            }
        }
    }
  };