const express = require('express')
const {uploadFile, getFile, getAllFiles, deleteFile} = require('../controllers/files.js');
const router = express.Router()
const multer = require('multer');
const path = require('path')
const { v4 } = require('uuid');
let upload = multer({
    errorHandling: 'manual',
    storage: multer.diskStorage({
       destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '../uploads/'))
     },
     filename: (req, file, cb) => {
        let customFileName = v4()
        cb(null, customFileName + path.extname(file.originalname))
     }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
 
router.post('/', upload.single("file"), uploadFile)
 
router.get('/:fileUUID', getFile)

router.get('/All', getAllFiles)

router.delete('/:fileUUID', deleteFile)
 
module.exports = router