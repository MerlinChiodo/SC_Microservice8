const {validationResult} = require('express-validator');
const prismaClient = require('../../prismaClient');
const Prisma = require('@prisma/client')
const auth = require('../auth');

const createProcess = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(422).json({ message: "Could not create process" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getProcess = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        const result = await prismaClient.process.findUnique({
            where: {
                id: parseInt(req.params['id'])
            },
            include: {
                citizens: true,
                worker: true,
                processTypes: true,
                statusUpdates: true
            },
        })
        if(result){
            return res.status(200).json({ message: "Found the process", process: result });
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
    if(auth.auth()){
        userid = 0; //get from token
        const result = await prismaClient.process.findMany({
            where: {
                citizens: {id: userid}
            },
            include: {
                citizens: true,
                worker: true,
                processTypes: true,
                statusUpdates: true
            },
        })
        if(result.length == 0){
            return res.status(404).json({ message: "No processes were found", result:[] });
        }else{
            return res.status(200).json({ message: result.length+" processes were found", result });
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
    if(auth.auth()){
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
    if(auth.auth()){
        return res.status(404).json({ message: "Could not find the given process" });
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