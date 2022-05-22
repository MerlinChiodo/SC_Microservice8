const express = require('express');
const { header, body, param } = require('express-validator');
const { createCitizen, getCitizen, deleteCitizen, editCitizen } = require("../controllers/citizen.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('id').not().isEmpty().isNumeric(),
    body('name').not().isEmpty().isAlpha(),
    body('lastname').not().isEmpty().isAlpha(),
    body('email').not().isEmpty().isEmail(),
    body('birthday').not().isEmpty().isDate(),
    header('token').not().isEmpty().trim().escape(),
    createCitizen)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('name').optional().isAlpha(),
    body('lastname').optional().isAlpha(),
    body('email').optional().isEmail(),
    header('token').not().isEmpty().trim().escape(),
    editCitizen)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getCitizen)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteCitizen)

module.exports = router