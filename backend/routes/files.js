const express = require('express')
const { body, query, param, header } = require('express-validator');
const { uploadFile, getFile, getAllFiles, getEveryFile, deleteFile } = require('../controllers/files.js');
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
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            return cb(new Error('Invalid mime type'));
        }
    }
})
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/', upload.single("file"),
    header('token').not().isEmpty().trim().escape(),
    body('processID').optional().isNumeric(),
    uploadFile)

router.get('/All',
    header('process').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getAllFiles)


router.get('/Every',
    header('token').not().isEmpty().trim().escape(),
    getEveryFile)

router.get('/:fileUUID',
    param('fileUUID').not().isEmpty(),
    query('token').trim().escape(),
    header('token').trim().escape(),
    getFile)

router.delete('/:fileUUID',
    param('fileUUID').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    deleteFile)

module.exports = router