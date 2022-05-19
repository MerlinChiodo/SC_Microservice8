const {validationResult} = require('express-validator');
const auth = require('./auth');

const createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(422).json({ message: "Could not create appointments" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getAllAppointments = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        return res.status(404).json({ message: "Could not find any appointments" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteAppointment = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    if(auth.auth()){
        return res.status(404).json({ message: "Could not find the given appointment" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }    
}
 
module.exports = {
    createAppointment, 
    getAllAppointments, 
    deleteAppointment
}