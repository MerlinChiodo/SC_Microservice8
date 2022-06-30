const {validationResult} = require('express-validator');
const prismaClient = require('../../prismaClient');
const auth = require('../auth.js');

const createStatusUpdate = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.process.findUnique({
        where: {
            id: parseInt(req.body.process)
        },
        include: {
            citizens: true,
            worker: true
        },
    });
    if(await auth.auth(req.headers.token, auth.accessLevels.worker, result.citizens.id)){
        try{
            const result = await prismaClient.statusUpdates.create({
                data: {
                    process_processTostatusUpdates: {connect: {id: parseInt(req.body.process)}},
                    status: req.body.status,
                    date: req.body.date != null ? req.body.date : undefined,
                },
            })
            return res.status(201).json({ message: "The status update was created"});
        }catch(err) {
            console.log(err)
            return res.status(422).json({ message: "Could not create status update"});
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getStatusUpdate = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(await auth.auth(req.headers.token, auth.accessLevels.noRights, 0)){
        try{
            const result = await prismaClient.statusUpdates.findMany({
                where: {
                    process: {equals: parseInt(req.params['process'])}
                }
            })
            if(result.length == 0){
                return res.status(404).json({ message: "No status updates were found", result:[] });
            }else{
                return res.status(200).json({ message: result.length+" status update(s) were found", result });
            }
        }catch(err) {
            return res.status(404).json({ message: "No status updates were found", result:[] });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createStatusUpdate, 
    getStatusUpdate
}