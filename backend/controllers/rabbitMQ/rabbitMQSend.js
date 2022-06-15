const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');

rmq_connection = null
async function connect() {
    connectionString = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_SERVER_URL}?heartbeat=60`;
    amqp.connect(connectionString, function (error0, connection) {
        if (error0) {
            console.error("[RABBITMQ fail] " + error0.message);
            return setTimeout(connect, 1000);
        }
        connection.on("error", function (err) {
            console.error("[RABBITMQ error]", err.message);
        });
        connection.on("close", function () {
            console.error("[RABBITMQ reconnecting]");
            connection.close();
            return setTimeout(connect, 1000);
        });
        rmq_connection = connection;
    })
}

async function publish(event, routingKey, schema) {
    if (rmq_connection) {
        rmq_connection.createChannel(function (channelError, channel) {
            if (channelError) {
                throw channelError
            }
            var ajv = new Ajv();
            if (ajv.validate(schema, event)) {
                channel.publish('events', routingKey, Buffer.from(JSON.stringify((event))))
                console.log(`RabbitMQ: sent event ${event.event_id}`);
            } else {
                console.log(`RabbitMQ: sent event AJV - FAIL`);
            }
            channel.close()
        })
    }
}

module.exports = {
    publish,
    connect
};