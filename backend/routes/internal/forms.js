const express = require('express');
const { header, body, param } = require('express-validator');
const { createForm, getAllForms, deleteForm } = require("../../controllers/internal/forms.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('path').not().isEmpty(),
    body('date').optional().isDate(),
    body('target').not().isEmpty(),
    body('description').not().isEmpty(),
    body('title').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    createForm)

router.get('/all',getAllForms)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteForm)

module.exports = router