const express = require('express');
const { header, body, param } = require('express-validator');
const { createProcessType, getAllProcessTypes, deleteProcessType } = require("../../controllers/internal/processTypes.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('name').not().isEmpty(),
    body('description').optional(),
    header('token').not().isEmpty().trim().escape(),
    createProcessType)

router.get('/',getAllProcessTypes)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteProcessType)

module.exports = router