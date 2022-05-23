const {validationResult} = require('express-validator');
const auth = require('../auth.js');

const createForm = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(422).json({ message: "Could not create form" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const editForm = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(404).json({ message: "Could not find this form" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getForm = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    return res.status(404).json({ message: "Could not find this form" });
}

const getAllForms = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    return res.status(404).json({ message: "Could not find any forms" });
}

const deleteForm = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(404).json({ message: "Could not find the given form" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createForm, 
    editForm,
    getForm, 
    getAllForms, 
    deleteForm
}