const amqp = require('amqplib/callback_api.js');
const Ajv = require('ajv');
const addFormats = require("ajv-formats")
const DonationRabbitMQSchema = require('./events/donationEvent.js');
const { CitizenNewSchema, CitizenChangeSchema, CitizenDeathSchema, CitizenDivorceSchema, citizenMarriageSchema, CitizenMarriageSchema } = require('./events/citizenEvent.js');
const prismaClient = require('../../prismaClient');
const fetch = require('node-fetch');
let secret = process.env.backendSecret;

async function storeFaultyEvent(id, content) {
    return await prismaClient.faultyEvents.create({
        data: {
            content: JSON.stringify(content),
            eventId: parseInt(id)
        },
    })
}

async function getAllCitizenDetails(citizenId) {
    return fetch('http://vps2290194.fastwebserver.de:9710/api/citizen/' + citizenId, { method: 'GET', headers: { 'token': secret } })
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

async function getCitizenDetails(citizenId) {
    data = await getAllCitizenDetails(citizenId);
    return {
        id: data.citizen_id,
        name: data.firstname,
        lastname: data.lastname,
        email: data.email,
        birthday: data.birthdate,
        spouse_id: data.spouse_id,
        child_ids: data.child_ids
    };
}

function validator(event, schema, callback) {
    var ajv = new Ajv();
    addFormats(ajv);
    if (!ajv.validate(schema, event)) {
        console.log(ajv.errors);
        storeFaultyEvent(event.event_id, event);
    } else {
        callback(event);
    }
}

async function processNewCitizen(event) {
    let citizen = await getCitizenDetails(event.citizen_id);
    await fetch('http://localhost:3000/api/citizen', { method: 'POST', body: JSON.stringify(citizen), headers: { 'token': secret, 'Content-Type': "application/json" } })
        .then(response => {
            if (response.status === 201) {
                console.log("Citizen was created")
            } else {
                // Faulty citizen (wrong content)
                storeFaultyEvent(1001, event).then(console.log("Faulty citizen"))
            }
        }); 
    if(citizen.spouse_id != null){
        citizen1 = await getAllCitizenDetails(event.citizen_id);
        citizen2 = await getAllCitizenDetails(citizen.spouse_id);
        try {
            let childs = citizen1.child_ids.concat(citizen2.child_ids);
            await marry(citizen1.citizen_id, citizen2.citizen_id, childs);
            console.log("Marriage was successful");
        } catch (err) {
            console.log("Marriage failed");
        }
    }
}

async function updateCitizen(event) {
    // check if citizen exists
    citizen = await prismaClient.citizens.findUnique({
        where: {
            id: event.citizen_id
        }
    });
    if (citizen) {
        // update citizen
        citizend = await getCitizenDetails(event.citizen_id);
        await fetch('http://localhost:3000/api/citizen', { method: 'put', body: JSON.stringify(citizend), headers: { 'token': secret, 'Content-Type': "application/json" } })
            .then(response => {
                if (response.status === 200) {
                    console.log("Citizen was updated")
                } else {
                    // Faulty citizen (wrong content)
                    storeFaultyEvent(1002, event).then(console.log("Faulty citizen update"))
                }
            });
    } else {
        //create citizen
        processNewCitizen(event);
    }
}

async function marry(partner1, partner2, childs){
    await prismaClient.couples.create({
        data: {
            partner1: partner1,
            partner2: partner2,
            child_amount: [...new Set(childs)].length
        }
    });
}

async function citizenMarriage(event) {
    citizen1 = await getAllCitizenDetails(event.partners.citizen_id_1);
    citizen2 = await getAllCitizenDetails(event.partners.citizen_id_2);
    try {
        let childs = citizen1.child_ids.concat(citizen2.child_ids);
        await marry(citizen1.citizen_id, citizen2.citizen_id, childs);
        console.log("Marriage was successful");
    } catch (err) {
        storeFaultyEvent(event.event_id, event);
        console.log("Marriage failed");
    }

}

async function citizenDivorce(event) {
    citizen1 = await getAllCitizenDetails(event.partners.citizen_id_1);
    citizen2 = await getAllCitizenDetails(event.partners.citizen_id_2);
    try {
        await prismaClient.couples.create({
            data: {
                partner1: citizen1.citizen_id,
                child_amount: Object.keys(citizen1.child_ids).length
            }
        });
        console.log("Partner1 was divorced");
    } catch (err) {
        console.log("Divorce failed");
    }
    try {
        await prismaClient.couples.create({
            data: {
                partner1: citizen2.citizen_id,
                child_amount: Object.keys(citizen2.child_ids).length
            }
        });
        console.log("Partner2 was divorced");
    } catch (err) {
        console.log("Divorce failed");
        storeFaultyEvent(event.event_id, event);
    }
}

async function citizenDeath(event) {
    await fetch('http://localhost:3000/api/citizen/' + event.citizen_id, { method: 'delete', headers: { 'token': secret } })
        .then(response => {
            if (response.status === 200) {
                console.log("Citizen was removed")
            } else {
                // Unknown citizen
                storeFaultyEvent(event.event_id, event).then(console.log("Faulty citizen death"))
            }
        });
}

async function processDonation(event) {
    const body = {
        amount: event.amount,
        donator: event.citizen_id,
        recipiant: 0
    };
    await fetch('http://localhost:3000/api/donations', { method: 'post', body: JSON.stringify(body), headers: { 'token': secret, 'Content-Type': "application/json" } })
        .then(response => {
            if (response.status === 201) {
                console.log("Donation was created")
            } else {
                // Faulty donation (wrong content)
                storeFaultyEvent(9003, event).then(console.log("Faulty donation"))
            }
        });
}

function checkQueue(incomingEvents) {
    connectionString = `amqp://${process.env.RABBIT_USERNAME}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_SERVER_URL}?heartbeat=60`;
    amqp.connect(connectionString, function (error0, connection) {
        if (error0) {
            console.error("[RABBITMQ fail] " + error0.message);
            return setTimeout(checkQueue, 1000, incomingEvents);
        }
        connection.on("error", function (err) {
            console.error("[RABBITMQ error]", err.message);
        });
        connection.on("close", function () {
            console.error("[RABBITMQ reconnecting]");
            connection.close();
            return setTimeout(checkQueue, 1000, incomingEvents);
        });
        connection.createChannel(function (error1, channel) {
            if (error1) {
                return 0;
            }
            channel.consume('finanzamt', function (msg) {
                try {
                    incomingEvents.push(JSON.parse(msg.content))
                } catch (error) {
                    console.log("Faulty Event", error)
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
    processEvents: function (events) {
        while (events.length > 0) {
            item = events.pop()
            switch (item.event_id) {
                case 9003:
                    validator(item, DonationRabbitMQSchema, processDonation);
                    break;
                case 1001:
                    validator(item, CitizenNewSchema, processNewCitizen);
                    break;
                case 1002:
                    validator(item, CitizenChangeSchema, updateCitizen);
                    break;
                case 1004:
                    validator(item, CitizenMarriageSchema, citizenMarriage);
                    break;
                case 1005:
                    validator(item, CitizenDivorceSchema, citizenDivorce);
                    break;
                case 1006:
                    validator(item, CitizenDeathSchema, citizenDeath);
                    break;
                default:
                    console.log(item);
                    break;
            }
        }
    }
};