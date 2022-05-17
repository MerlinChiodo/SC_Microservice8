const {validationResult} = require('express-validator');
const prisma = require('../prismaClient');
const auth = require('./auth');
const fs = require('fs')

const uploadFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    if(req.file !== undefined){
        // TODO: Check for ProcessID
        if(auth.auth()){
            const result = await prisma.file.create({
                data: {
                    path: req.file.filename
                },
            })
            res.status(200).json({ message: "Successfully uploaded file" });
        }else{
            res.status(400).json({ message: "The file is missing" });
        }
    }else{
        res.status(401).json({ message: "Sorry, you have no rights to do this" });
    }
}

const getFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    filename = req.params['fileUUID']
    path = "uploads/"+filename
    if(auth.auth()){
        try {
            if (fs.existsSync(path)) {
                res.sendFile(filename, { root:"uploads" });
            }else{
                res.status(404).json({ message: "File not found" });
            }
        } catch(err) {
            console.error(err)
            res.status(500).json({ message: "Internal server error" });
        }
    }else{
        res.status(404).json({ message: "File not found" });
    }
}

const getAllFiles = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    // TODO: get all files of Process
}

const deleteFile = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()[0] });
    }
    filename = req.params['fileUUID']
    path = "uploads/"+filename
    // TODO: Authentification
    try {
        if (fs.existsSync(path)) {
            //file exists
            const result = await prisma.file.delete({
               where: {
                    path: filename
                },
            })
            fs.unlinkSync(path)
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
}
 
module.exports = {
    uploadFile, 
    getFile, 
    getAllFiles, 
    deleteFile
}