const { validationResult } = require('express-validator');
const auth = require('../auth.js');
const prismaClient = require('../../prismaClient');
const rabbitMQSend = require('../rabbitMQ/rabbitMQSend');
const ForumCalendarRabbitMQSchema = require('../rabbitMQ/events/ForumCalendarEvent.json');

const createDeadline = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if (await auth.auth(req.headers.token, auth.accessLevels.worker)>0) {
        ce_time = req.body.date
        if (!req.body.date) {
            var date = new Date();
            ce_time = date.toISOString();
        }
        ce_title = req.body.title
        ce_descr = req.body.description
        jsevent = {
            event_id: 8001,
            event_name: "newServicePost",
            service: "Finanzamt",
            title: ce_title,
            short_description: ce_descr,
            event_on: ce_time
        }
        rabbitMQSend.publish(jsevent, 'public.finanzamt', ForumCalendarRabbitMQSchema);
        try {
            const result = await prismaClient.deadlines.create({
                data: {
                    title: ce_title,
                    descr: ce_descr,
                    date: ce_time,
                },
            })
        } catch (e) {
            return res.status(422).json({ message: "Could not create deadline" });
        }
        return res.status(201).json({ message: "The deadline was created" });
    } else {
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}

const getAllDeadlines = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.deadlines.findMany({ orderBy: [{ date: 'asc', }] })
    if (result.length == 0) {
        return res.status(404).json({ message: "No deadlines were found", result: [] });
    } else {
        return res.status(200).json({ message: result.length + " deadline(s) were found", result });
    }
}

const deleteDeadline = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if (await auth.auth(req.headers.token, auth.accessLevels.worker)>0) {
        try{
            const result = await prismaClient.deadlines.delete({
                where: {
                    id: parseInt(req.params['id'])
                },
            })
            return res.status(200).json({ message: "The deadline was deleted" });
        }catch(e){
            console.log(e)
            return res.status(404).json({ message: "Could not find the given deadline" });
        }
    } else {
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}

module.exports = {
    createDeadline,
    getAllDeadlines,
    deleteDeadline
}