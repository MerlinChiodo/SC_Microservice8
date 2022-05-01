const prisma = require('../prismaClient');
const fs = require('fs')

const uploadFile = async (req, res) => {
    if(req.file !== undefined){
        // TODO: Check for ProcessID + Authentification
        const result = await prisma.file.create({
            data: {
                path: req.file.filename
            },
        })
        res.status(200).json({ message: "Successfully uploaded file" });
    }else{
        res.status(400).json({ message: "The file is missing" });
    }
}

const getFile = async (req, res) => {
    filename = req.params['fileUUID']
    path = "uploads/"+filename
    // TODO: Authentification
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
}

const getAllFiles = async (req,res) => {
    // TODO: get all files of Process
}

const deleteFile = async (req, res) => {
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