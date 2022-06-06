const DonationRabbitMQSchema = {
    title: 'Send New Donation to Finanzamt via RabbitMQ',
    description: 'Event data',
    type: 'object',
    properties: {
      event_id: {
        type: 'integer',
        const: 9003,
      },
      event_name: {
        type: 'string',
        const: 'Notify Incoming Donation',
      },
      service_name: {
        type: 'string',
        const: 'integration',
      },
      amount: {
        type: 'number',
        minimum: 5,
        maximum: 5000,
      },
      citizen_id: {
        type: 'number',
        minimum: 1,
      },
    },
    required: ['event_id', 'event_name', 'service_name', 'amount', 'citizen_id'],
    additionalProperties: false,
  };
module.exports =  DonationRabbitMQSchema;