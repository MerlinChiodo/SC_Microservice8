const prismaClient = require('../prismaClient');
const {validationResult} = require('express-validator');
const {auth, accessLevels} = require('./auth.js');

const contact = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    result = await prismaClient.contactrequest.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        }
    });
    if(!result){
        return res.status(500).json({ message: "Sorry, this request couldn't be requested" });
    }
    return res.status(201).json({ message: "Contact request was created"});
}

const getAllContactRequests = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    userID = await auth(req.headers.token, accessLevels.worker);
    if(userID > 0){
        const contactRequests = await prismaClient.contactrequest.findMany();
        if (contactRequests.length == 0) {
            return res.status(404).json({ message: "No contact requests were found", result: [] });
        } else {
            return res.status(200).json({ message: contactRequests.length + " contactRequest(s) were found", result: contactRequests });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
        
}

const deleteContactRequest = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    userID = await auth(req.headers.token, accessLevels.worker);
    if(userID > 0){
        const contactRequest = await prismaClient.contactrequest.delete({
            where: {
                id: parseInt(req.params['contactRequestID'])
            }
        });
        if(!contactRequest){
            return res.status(404).json({msg: 'Contact request not found'});
        }
        return res.status(200).json({message: 'Contact request deleted'});
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}
 
module.exports = {
    contact, 
    getAllContactRequests, 
    deleteContactRequest
}