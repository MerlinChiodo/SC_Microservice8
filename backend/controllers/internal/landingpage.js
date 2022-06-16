const {validationResult} = require('express-validator');
const auth = require('../auth.js');
const rabbitMQSend = require('../rabbitMQ/rabbitMQSend');
const { updateSchema, deleteSchema} = require('../rabbitMQ/events/landingpageEvents.js');

const updateService = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        var date = new Date();
        ce_time = date.toISOString();
        jsevent = {
            event_id: 8081,
            event_name: "Updated About US",
            service_name: "Finanzamt",
            date: ce_time,
            url: req.body.surl,
            about_us: req.body.aboutus, 
            picture: req.body.pictureurl
        }
        rabbitMQSend.publish(jsevent, 'public.finanzamt', updateSchema);
        return res.status(200).json({ message: "Event was sent" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteService = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        var date = new Date();
        ce_time = date.toISOString();
        jsevent = {
            event_id: 8081,
            event_name: "Delete My Service",
            service_name: "Finanzamt",
            date: ce_time,
        }
        console.log(jsevent)
        rabbitMQSend.publish(jsevent, 'public.finanzamt', deleteSchema);
        return res.status(200).json({ message: "Event was sent" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    updateService,
    deleteService
}