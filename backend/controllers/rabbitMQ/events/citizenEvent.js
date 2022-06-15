const CitizenNewSchema = {
    title: "New_Citizen_Schema",
    description: "New Citizen Event Schema",
    type: "object",
    properties: {
        event_id: {
            type: 'number',
            const: 1001,
        },
        event_name: {
            type: 'string',
            const: 'Neuer Bürger gemeldet',
        },
        service_name: {
            type: 'string',
            const: 'buergerbuero',
        },
        citizen_id: {
            type: 'number',
            minimum: 1,
        },
        date:{
            type: 'string', 
            format: 'date-time'
        }
    },
    required: ['event_id', 'event_name', 'service_name', 'citizen_id', 'date']
};

module.exports = CitizenNewSchema;