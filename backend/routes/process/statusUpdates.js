const express = require('express');
const { header, body, param } = require('express-validator');
const { createStatusUpdate, getStatusUpdate } = require("../../controllers/process/statusUpdates.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('process').not().isEmpty().isNumeric(),
    body('date').optional().isISO8601(),
    body('status').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    createStatusUpdate)

router.get('/:process',
    param('process').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getStatusUpdate)

module.exports = router