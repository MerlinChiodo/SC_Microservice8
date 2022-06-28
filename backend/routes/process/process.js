const express = require('express');
const { header, body, param, query } = require('express-validator');
const { createProcess, getProcess, getAllProcesses, deleteProcess, editProcess } = require("../../controllers/process/process.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('type').not().isEmpty().isNumeric(),
    body('customer').optional().isNumeric(),
    body('official').optional().isNumeric(),
    body('dateOffset').not().isEmpty().isInt({ min: 0 , max: 2}),
    header('token').not().isEmpty().trim().escape(),
    createProcess)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('type').optional().isNumeric(),
    body('official').optional().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    editProcess)

router.get('/all',
    query('user').optional().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getAllProcesses)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getProcess)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteProcess)

module.exports = router