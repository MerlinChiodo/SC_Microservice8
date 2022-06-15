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

const CitizenChangeSchema = {
    title: "Changed_Citizen_Schema",
    description: "Changed Citizen Event Schema",
    type: "object",
    properties: {
        event_id: {
            type: 'number',
            const: 1002,
        },
        event_name: {
            type: 'string',
            const: 'Datenänderung',
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

const CitizenDeathSchema = {
    title: "Citizen_Death_Schema",
    description: "Citizen Death Schema",
    type: "object",
    properties: {
        event_id: {
            type: 'number',
            const: 1006,
        },
        event_name: {
            type: 'string',
            const: 'Todesmeldung',
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
        },
        time_of_death:{
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['event_id', 'event_name', 'service_name', 'citizen_id', 'date', 'time_of_death']
};

const CitizenMarriageSchema = {
    title: "Citizen_Marriage_Schema",
    description: "Citizen Marriage Event Schema",
    type: "object",
    properties: {
        event_id: {
            type: 'number',
            const: 1004,
        },
        event_name: {
            type: 'string',
            const: 'Eheschließung',
        },
        service_name: {
            type: 'string',
            const: 'buergerbuero',
        },
        date:{
            type: 'string', 
            format: 'date-time'
        },
        partners:{
            type: 'object',
            properties: {
                citizen_id_1: {
                    type: 'number',
                    minimum: 1
                },
                citizen_id_2: {
                    type: 'number',
                    minimum: 1
                }
            }
        }
    },
    required: ['event_id', 'event_name', 'service_name', 'date', 'partners']
};

const CitizenDivorceSchema = {
    title: "Citizen_Divorce_Schema",
    description: "Citizen Divorce Event Schema",
    type: "object",
    properties: {
        event_id: {
            type: 'number',
            const: 1005,
        },
        event_name: {
            type: 'string',
            const: 'Scheidung',
        },
        service_name: {
            type: 'string',
            const: 'buergerbuero',
        },
        date:{
            type: 'string', 
            format: 'date-time'
        },
        partners:{
            type: 'object',
            properties: {
                citizen_id_1: {
                    type: 'number',
                    minimum: 1
                },
                citizen_id_2: {
                    type: 'number',
                    minimum: 1
                }
            }
        }
    },
    required: ['event_id', 'event_name', 'service_name', 'date', 'partners']
};

module.exports = {CitizenNewSchema, CitizenChangeSchema, CitizenDeathSchema, CitizenMarriageSchema, CitizenDivorceSchema};