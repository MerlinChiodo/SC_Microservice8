const {validationResult} = require('express-validator');
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
        return res.status(404).json({ message: "Could not find any process" });
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
    deleteProcess,
    editProcess
}