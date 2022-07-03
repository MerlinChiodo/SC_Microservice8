const {validationResult} = require('express-validator');
const prismaClient = require('../../prismaClient');
const Prisma = require('@prisma/client')
const auth = require('../auth');

const createProcess = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    let userID = -1;
    if(req.body.customer){
        userID = await auth.auth(req.headers.token, auth.accessLevels.citizen, req.body.customer)
    }else{
        userID = await auth.auth(req.headers.token, auth.accessLevels.citizen)
    }
    if(userID > 0){
        date = new Date()
        date.setFullYear(date.getFullYear() - req.body.dateOffset);
        const result = await prismaClient.process.create({
            data: {
                type: parseInt(req.body.type),
                customer: parseInt(userID),
                official: req.body.official ? parseInt(req.body.official) : 0,
                date: date
            }
        })
        if(result){
            return res.status(201).json({
                message: 'Process created successfully',
                data: result
            })
        }
        return res.status(422).json({ message: "Could not create process" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

async function getRelationship(citizenID){
    console.log("CID ",citizenID);
    const result = await prismaClient.couples.findMany({
        where: {
            OR: [
                { partner1: { equals: citizenID } },
                { partner2: { equals: citizenID } }
              ]
        },
        include:{
            citizens_citizensTocouples_partner1: true,
            citizens_citizensTocouples_partner2: true,
        },
        orderBy: [{date: 'desc',}]
    })
    if(result){
        return result[0]
    }else{
        return null
    }
};

const getProcess = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.process.findUnique({
        where: {
            id: parseInt(req.params['id'])
        },
        include: {
            citizens: true,
            worker: true,
            processTypes: true,
            statusUpdates: {orderBy: [{date: 'asc',}]}
        },
    });
    if(await auth.auth(req.headers.token, auth.accessLevels.citizen, result.customer)){
        if(result){
            return res.status(200).json({ message: "Found the process", process: result, relationship: await getRelationship(result.customer) });
        }
        return res.status(404).json({ message: "Could not find this process" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getAllProcesses = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    let reqUserID = req.query.user ? parseInt(req.query.user) : null;
    let userID = await auth.auth(req.headers.token, auth.accessLevels.citizen, reqUserID)
    if(userID > 0){
        const result = await prismaClient.process.findMany({
            where: {
                citizens: {id: userID}
            },
            include: {
                citizens: true,
                worker: true,
                processTypes: true,
                statusUpdates: {orderBy: [{date: 'asc',}]}
            },
        })
        if(result.length == 0){
            return res.status(404).json({ message: "No processes were found", result:[] });
        }else{
            return res.status(200).json({ message: result.length+" processes were found", result, relationship: await getRelationship(result[0].customer) });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteProcess = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.process.findUnique({
        where: {
            id: parseInt(req.params['id'])
        },
        include: {
            citizens: true,
            worker: true
        },
    });
    if(await auth.auth(req.headers.token, auth.accessLevels.worker, result.citizens.id)){
        const result = await prismaClient.process.delete({
            where: {
                id: parseInt(req.params['id'])
            }
        })
        if(result){
            return res.status(200).json({ message: "Process deleted successfully" });
        }
        return res.status(404).json({ message: "Could not find the given process" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const editProcess = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.process.findUnique({
        where: {
            id: parseInt(req.params['id'])
        },
        include: {
            citizens: true,
            worker: true
        },
    });
    if(await auth.auth(req.headers.token, auth.accessLevels.worker, result.citizens.id)){
        try{
            const result = await prismaClient.process.update({
                where: {
                    id: parseInt(req.body.id)
                },
                data: {
                    type: req.body.type ? parseInt(req.body.type) : undefined,
                    official: req.body.official ? parseInt(req.body.official) : undefined
                }
            })
            if(result){
                return res.status(200).json({ message: "Process updated successfully" });
            }
            return res.status(404).json({ message: "Could not find the given process" });
        }catch(e){
            return res.status(422).json({ message: "Could not edit process" });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createProcess, 
    getProcess, 
    getAllProcesses, 
    deleteProcess,
    editProcess
}