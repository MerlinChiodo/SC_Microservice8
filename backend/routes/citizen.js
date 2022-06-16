const express = require('express');
const { header, body, param } = require('express-validator');
const { createCitizen, getCitizen, getAllCitizens, deleteCitizen, editCitizen } = require("../controllers/citizen.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('id').not().isEmpty().isNumeric(),
    body('name').not().isEmpty(),
    body('lastname').not().isEmpty(),
    body('email').not().isEmpty().isEmail(),
    body('birthday').not().isEmpty().isISO8601(),
    header('token').not().isEmpty().trim().escape(),
    createCitizen)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('name').optional(),
    body('lastname').optional(),
    body('email').optional().isEmail(),
    body('birthday').optional().isISO8601(),
    header('token').not().isEmpty().trim().escape(),
    editCitizen)

router.get('/all',
    header('token').not().isEmpty().trim().escape(),
    getAllCitizens)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getCitizen)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteCitizen)

module.exports = router