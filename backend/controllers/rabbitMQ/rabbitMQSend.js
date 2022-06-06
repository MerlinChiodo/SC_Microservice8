const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');

async function publish(event, routingKey,schema){
    connectionString = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_SERVER_URL}?heartbeat=60`;
    amqp.connect(connectionString, function(connectError, connection){
    if (connectError) {
        throw connectError
    }
    connection.createChannel(function (channelError, channel) {
        if (channelError) {
            throw channelError
        }
        var ajv = new Ajv();
        if (ajv.validate(schema,event)) {
            channel.publish('events', routingKey, Buffer.from(JSON.stringify((event))))
            console.log(`RabbitMQ: sent event ${event.event_id}`)
        } else {
            console.log(`RabbitMQ: sent event AJV - FAIL`)
        }
        connection.close()
     })
    })
}
module.exports = {
    publish
};