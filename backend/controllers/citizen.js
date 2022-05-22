const {validationResult} = require('express-validator');
const auth = require('./auth');

const createCitizen = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(422).json({ message: "Could not create citizen" });
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
        return res.status(404).json({ message: "Could not find any citizen" });
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
        return res.status(404).json({ message: "Could not find the given citizen" });
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
        return res.status(404).json({ message: "Could not find the given citizen" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createCitizen, 
    getCitizen, 
    deleteCitizen,
    editCitizen
}