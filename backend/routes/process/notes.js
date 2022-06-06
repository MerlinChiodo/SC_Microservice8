const express = require('express');
const { header, body, param } = require('express-validator');
const { createNote, getNotes, deleteNote } = require("../../controllers/process/notes.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('process').not().isEmpty().isNumeric(),
    body('date').optional().isDate(),
    body('text').not().isEmpty().trim().escape(),
    header('token').not().isEmpty().trim().escape(),
    createNote)

router.get('/:process',
    param('process').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getNotes)

router.delete('/',
    header('fromuser').not().isEmpty().isBoolean(),
    header('process').not().isEmpty().isNumeric(),
    header('date').not().isEmpty().isISO8601(),
    header('token').not().isEmpty().trim().escape(),
    deleteNote)

module.exports = router