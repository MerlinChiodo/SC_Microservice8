const {validationResult} = require('express-validator');
const prismaClient = require('../prismaClient');
const auth = require('./auth');

const createCitizen = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        try{
            const citizen = await prismaClient.citizens.create({
                data: {
                    id: req.body.id,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    birthday: req.body.birthday
                }
            })
            if(citizen){
                return res.status(201).json({ message: "Citizen was created" });
            }else{
                throw new Error("Could not create citizen");
            }
        }catch(e){
            return res.status(422).json({ message: "Could not create citizen" });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getCitizen = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        prismaClient.citizens.findUnique({
            where: {
                id: parseInt(req.params['id'])
            }
        }).then(citizen => {
            if(citizen){
                return res.status(200).json({ citizen });
            }else{
                throw new Error("Citizen not found");
            }
        }).catch(e => {
            return res.status(404).json({ message: "Citizen not found" });
        })
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getAllCitizens = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        prismaClient.citizens.findMany({
            orderBy: [{id: 'asc',}],
        }).then(citizens => {
            if(citizens.length == 0){
                throw new Error("No citizens found");
            }else{
                return res.status(200).json({ message: citizens.length+" citizen(s) were found", citizens });
            }
        }).catch(e => {
            return res.status(404).json({ message: "Could not find any citizens", citizens:[] });
        })
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteCitizen = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        citizen = await prismaClient.citizens.delete({
            where: {
                id: parseInt(req.params['id'])
            }
        }).then(citizen => {
            if(citizen){
                return res.status(200).json({ message: "Citizen was deleted" });
            }else{
                throw new Error("Could not find the given citizen");
            }
        }).catch(e => {
            return res.status(404).json({ message: "Could not find the given citizen" });
        })
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const editCitizen = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        prismaClient.citizens.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                birthday: req.body.birthday
            }
        }).then(citizen => {
            if(citizen){
                return res.status(200).json({ message: "Citizen was edited" });
            }else{
                throw new Error("Could not find the given citizen");
            }
        }).catch(e => {
            return res.status(404).json({ message: "Could not find the given citizen" });
        })
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createCitizen, 
    getCitizen, 
    getAllCitizens, 
    deleteCitizen,
    editCitizen
}