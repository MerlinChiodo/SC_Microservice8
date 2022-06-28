const {validationResult} = require('express-validator');
const prismaClient = require('../../prismaClient');
const auth = require('../auth');

const getFaultyEvents = async (req,res) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    let userID = await auth.auth(req.headers.token, auth.accessLevels.worker)
    if(userID>0){
        const events = await prismaClient.faultyEvents.findMany({})
        if(events.length == 0){
            return res.status(404).json({ message: "Could not find any events", events:[] });
        }else{
            return res.status(200).json({ message: events.length+" event(s) were found", events });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteFaultyEvent = async (req,res) => {
    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    let userID = await auth.auth(req.headers.token, auth.accessLevels.worker)
    if(userID>0){
        try {
            const result = await prismaClient.faultyEvents.delete({
                where: {
                    id: parseInt(req.params['id'])
                },
            })
            res.status(200).json({ message: "Successfully removed event" });
        } catch(err) {
            res.status(404).json({ message: "Could not find event" });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    getFaultyEvents,
    deleteFaultyEvent
}