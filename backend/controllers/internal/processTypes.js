const { validationResult } = require('express-validator');
const auth = require('../auth.js');
const prismaClient = require('../../prismaClient');

const createProcessType = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if (auth.auth()) {
        try {
            const result = await prismaClient.processTypes.create({
                data: {
                    name: req.body.name,
                    description: req.body.description ? req.body.description : "",
                },
            })
        } catch (e) {
            return res.status(422).json({ message: "Could not create processType" });
        }
        return res.status(201).json({ message: "The processType was created" });
    } else {
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}

const getAllProcessTypes = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    const result = await prismaClient.processTypes.findMany({ orderBy: [{ id: 'asc', }] })
    if (result.length == 0) {
        return res.status(404).json({ message: "No processTypes were found", result: [] });
    } else {
        return res.status(200).json({ message: result.length + " processTypes were found", result });
    }
}

const deleteProcessType = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if (auth.auth()) {
        try{
            const result = await prismaClient.processTypes.delete({
                where: {
                    id: parseInt(req.params['id'])
                },
            })
            return res.status(200).json({ message: "The processType was deleted" });
        }catch(e){
            return res.status(404).json({ message: "Could not find the given processType" });
        }
    } else {
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}

module.exports = {
    createProcessType,
    getAllProcessTypes,
    deleteProcessType
}