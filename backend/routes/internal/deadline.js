const express = require('express');
const { header, body, param } = require('express-validator');
const { createDeadline, getDeadline, getAllDeadlines, deleteDeadline } = require("../../controllers/internal/deadline.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('date').optional().isLength({min:11}).isISO8601(),
    body('title').not().isEmpty().isAlphanumeric(),
    body('description').not().isEmpty().isAlphanumeric(),
    header('token').not().isEmpty().trim().escape(),
    createDeadline)

router.get('/all',getAllDeadlines)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    getDeadline)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteDeadline)

module.exports = router