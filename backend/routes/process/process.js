const express = require('express');
const { header, body, param } = require('express-validator');
const { createProcess, getProcess, deleteProcess, editProcess } = require("../../controllers/process/process.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('type').not().isEmpty().isNumeric(),
    body('customer').not().isEmpty().isNumeric(),
    body('official').not().isEmpty().isNumeric(),
    body('date').optional().isDate(),
    header('token').not().isEmpty().trim().escape(),
    createProcess)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('type').optional().isNumeric(),
    body('official').optional().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    editProcess)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getProcess)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteProcess)

module.exports = router