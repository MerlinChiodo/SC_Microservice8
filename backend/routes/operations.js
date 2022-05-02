const express = require('express');
const { param, header, body } = require('express-validator');
const { createOperation, getOperation, getAllOperations, deleteOperation } = require("../controllers/operations.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    header('token').not().isEmpty().trim().escape(),
    body('type').not().isEmpty().isNumeric(),
    body('date').trim().escape().isDate(),
    body('customer').not().isEmpty().isNumeric(),
    body('official').not().isEmpty().trim().isNumeric(),
    createOperation)

router.get('/:operationID',
    param('operationID').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    getOperation)

router.get('/all',
    header('token').not().isEmpty().trim().escape(),
    getAllOperations)

router.delete('/:operationID',
    param('operationID').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    deleteOperation)

module.exports = router