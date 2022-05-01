const uploadFile = async (req, res) => {
    if(req.file !== undefined){
        console.log(req.file.filename)
        res.status(200).json({ message: "Successfully uploaded file" });
    }else{
        res.status(400).json({ message: "The file is missing" });
    }
}

const getFile = async (req, res) => {
}

const getAllFiles = async (req,res) => {
}

const deleteFile = async (req, res) => {
}
 
module.exports = {
    uploadFile, 
    getFile, 
    getAllFiles, 
    deleteFile
}