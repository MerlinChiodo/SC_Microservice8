const {validationResult} = require('express-validator');
const prismaClient = require('../prismaClient');
const Prisma = require('@prisma/client')
const auth = require('./auth');
const fs = require('fs')

const uploadFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // show errors thrown by express validator
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(req.file !== undefined){
        filename = null
        if(auth.auth()){
            try {
                const result = await prismaClient.file.create({
                    data: {
                        path: req.file.filename,
                        process: req.body.processID != null ? parseInt(req.body.processID) : undefined
                    },
                })
                filename = result.path
            }catch(e){
                if(e instanceof Prisma.PrismaClientKnownRequestError){
                    // Error was thrown by Prisma
                    if (e.code === 'P2003') {
                        // Foreign key constraint failed on the field -> unknown process
                        return res.status(400).json({ message: "Unknown process" });
                    }
                }
                // Other error (should not happen)
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(201).json({ message: "Successfully uploaded file", filename: filename });
        }else{
            res.status(401).json({ message: "Sorry, you have no rights to do this" });
        }
    }else{
        res.status(400).json({ message: "The file is missing" });
    }
}

const getFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // show errors thrown by express validator
        return res.status(422).json({ errors: errors.array()[0] });
    }
    filename = req.params['fileUUID']
    path = "uploads/"+filename
    // Let query token overwrite token from header
    token = req.query.token.length > 0 ? req.query.token : req.headers.token;
    if(token == null || token.length == 0){
        return res.status(422).json({message: "Invalid token" })
    }
    if(auth.auth()){
        try {
            if (fs.existsSync(path)) {
                res.sendFile(filename, { root:"uploads" });
            }else{
                res.status(404).json({ message: "File not found" });
            }
        } catch(err) {
            // error while looking up files
            console.error(err)
            res.status(500).json({ message: "Internal server error" });
        }
    }else{
        // Deny existence of file when not authorized
        res.status(404).json({ message: "File not found" });
    }
}

const getAllFiles = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // show errors thrown by express validator
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(auth.auth()){
        // Get all files of process
        const result = await prismaClient.file.findMany({
            where: {
                process: {
                    equals: parseInt(req.headers.process),
                }
            }
        })
        if(result.length == 0){
            return res.status(404).json({ message: "No Files were found", result:[] });
        }else{
            return res.status(200).json({ message: result.length+" File(s) were found", result });
        }
    }else{
        res.status(401).json({ message: "Sorry, you have no rights to do this", result:[] });
    }
}

const deleteFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    filename = req.params['fileUUID']
    path = "uploads/"+filename
    if(auth.auth()){
        try {
            if (fs.existsSync(path)) {
                //file exists
                try{
                    const result = await prismaClient.file.delete({
                    where: {
                            path: filename
                        },
                    })
                    fs.unlinkSync(path)
                }catch(e){
                    if(e instanceof Prisma.PrismaClientKnownRequestError){
                        // Error was thrown by Prisma
                        if (e.code === 'P2025') {
                            // File is not present in DB -> cleanup
                            fs.unlinkSync(path)
                            return res.status(200).json({ message: "Successfully removed file" });
                        }
                    }
                    // Other error (should not happen)
                    return res.status(500).json({ message: "Internal server error" });
                }
                //file removed from db and storage
                res.status(200).json({ message: "Successfully removed file" });
            }else{
                //file doesn´t exist
                res.status(404).json({ message: "File not found" });
            }
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong" });
        }
    }else{
        // Deny existence of file when not authorized
        res.status(404).json({ message: "File not found" });
    }
}
 
module.exports = {
    uploadFile, 
    getFile, 
    getAllFiles, 
    deleteFile
}