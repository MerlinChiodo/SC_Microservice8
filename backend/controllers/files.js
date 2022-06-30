const {validationResult} = require('express-validator');
const prismaClient = require('../prismaClient');
const Prisma = require('@prisma/client')
const auth = require('./auth');
const fs = require('fs')
const path = require('path');

const uploadFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // show errors thrown by express validator
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(req.file !== undefined){
        filename = null
        if(await auth.auth(req.headers.token, auth.accessLevels.noRights)){
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
    filepath = "uploads/"+filename
    // Let query token overwrite token from header
    token = req.query.token.length > 0 ? req.query.token : req.headers.token;
    if(token == null || token.length == 0){
        return res.status(422).json({message: "Invalid token" })
    }
    if(await auth.auth(req.headers.token, auth.accessLevels.noRights)){
        try {
            if (fs.existsSync(filepath)) {
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
    // get user from process
    const process = await prismaClient.process.findMany({
        where:{
            id: parseInt(req.headers.process)
        }
    })
    let userID = await auth.auth(req.headers.token, auth.accessLevels.citizen, process[0].customer)
    if(userID > 0){
        // Get all files of process
        const result = await prismaClient.file.findMany({
            orderBy: [
                {
                  date: 'asc',
                }
              ],
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
    filepath = "uploads/"+filename
    if(await auth.auth(req.headers.token, auth.accessLevels.worker)){
        try {
            if (fs.existsSync(filepath)) {
                //file exists
                try{
                    const result = await prismaClient.file.delete({
                    where: {
                            path: filename
                        },
                    })
                    fs.unlinkSync(filepath)
                }catch(e){
                    if(e instanceof Prisma.PrismaClientKnownRequestError){
                        // Error was thrown by Prisma
                        if (e.code === 'P2025') {
                            // File is not present in DB -> cleanup
                            fs.unlinkSync(filepath)
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
 
const getEveryFile = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // show errors thrown by express validator
        return res.status(422).json({ errors: errors.array()[0] });
    }
    // TODO: Check if user has admin rights
    if(await auth.auth(req.headers.token, auth.accessLevels.admin)){
        localfiles = []
        onlyDBfiles = []
        validFiles = []
        // Get all files in dir
        const directoryPath = path.join(__dirname, '../uploads');
        fs.readdir(directoryPath, function (err, files) {
            if (err) {
                return res.status(404).json({ message: "No Files were found", onlyInDB: [], onlyInStorage: [], validFiles: [] });
            } 
            localfiles = files
        });
        // Get all files in DB
        const dbfiles = await prismaClient.file.findMany()
        // Sort files
        dbfiles.forEach(function (file) {
            if(localfiles.includes(file.path)){
                // File from DB is stored locally -> valid
                var index = localfiles.indexOf(file.path);    
                if (index !== -1) {
                    localfiles.splice(index, 1);
                }
                validFiles.push(file)
            }else{
                // File from DB is not stored locally -> only in DB
                onlyDBfiles.push(file)
            }
        });
        return res.status(200).json({ message: "All Files:", onlyInDB: onlyDBfiles, onlyInStorage: localfiles, validFiles: validFiles });
    }else{
        res.status(401).json({ message: "Sorry, you have no rights to do this", onlyInDB: [], onlyInStorage: [], validFiles: [] });
    }
}

module.exports = {
    uploadFile, 
    getFile, 
    getAllFiles, 
    deleteFile,
    getEveryFile
}