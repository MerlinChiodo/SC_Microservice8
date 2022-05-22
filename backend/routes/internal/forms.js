const express = require('express');
const { header, body, param } = require('express-validator');
const { createForm, editForm, getForm, getAllForms, deleteForm } = require("../../controllers/internal/forms.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('path').not().isEmpty(),
    body('date').optional().isDate(),
    body('type').not().isEmpty().isNumeric(),
    body('target').not().isEmpty().isAlphanumeric(),
    body('description').not().isEmpty().isAlphanumeric(),
    header('token').not().isEmpty().trim().escape(),
    createForm)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('path').optional(),
    body('type').optional().isNumeric(),
    body('target').optional().isAlphanumeric(),
    body('description').optional().isAlphanumeric(),
    header('token').not().isEmpty().trim().escape(),
    editForm)

router.get('/all',
    header('token').not().isEmpty().trim().escape(),
    getAllForms)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getForm)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteForm)

module.exports = router