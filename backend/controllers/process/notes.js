const {validationResult} = require('express-validator');
const auth = require('../auth.js');
const prismaClient = require('../../prismaClient');
const Prisma = require('@prisma/client')

const createNote = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        var fromUser = req.headers.token=='1234' //only for testing - get from token later
        try{
            const result = await prismaClient.note.create({ 
                data: {
                    process: req.body.process,
                    text: req.body.text,
                    fromUser: fromUser,
                    date: req.body.date != null ? req.body.date : undefined,
                },
            })
        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                // Error was thrown by Prisma
                if (e.code === 'P2003') {
                    // Foreign key constraint failed on the field -> process unknown
                    return res.status(400).json({ message: "Unknown process" });
                }
                return res.status(422).json({ message: "Could not create note" });
            }
            // Other error (should not happen)
            return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(201).json({ message: "The note was created" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const getNotes = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        // get all files of process
        const result = await prismaClient.note.findMany({
            orderBy: [
                {
                  date: 'asc',
                }
              ],
            where: {
                process: {
                    equals: parseInt(req.params['process']),
                }
            }
        })
        if(result.length == 0){
            return res.status(404).json({ message: "No notes were found", result:[] });
        }else{
            return res.status(200).json({ message: result.length+" note(s) were found", result });
        }
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}

const deleteNote = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        try{
            const result = await prismaClient.note.delete({
                where: {
                    process_fromUser_date:{
                        date: req.headers.date,
                        process: parseInt(req.headers.process),
                        fromUser: req.headers.fromuser === '1' || req.headers.fromuser === 'true'
                    }
                },
            })
        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                // Error was thrown by Prisma
                if (e.code === 'P2025') {
                    return res.status(404).json({ message: "Could not find the given note" });
                }
            }
            // Other error (should not happen)
            return res.status(500).json({ message: "Internal server error" });
        }
        //file removed from db and storage
        res.status(200).json({ message: "Successfully removed note" });
    }else{
        return res.status(401).json({ message: "Sorry, you have no rights to do this" });
    } 
}
 
module.exports = {
    createNote, 
    getNotes, 
    deleteNote
}