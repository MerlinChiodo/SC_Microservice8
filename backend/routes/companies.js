const express = require('express');
const { query, header, body, param } = require('express-validator');
const { createCompany, getCompany, deleteCompany } = require("../controllers/companies.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('name').not().isEmpty().isAlphanumeric(),
    body('rep').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    createCompany)

router.get('/',
    query('id').optional().isNumeric(),
    query('rep').optional().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getCompany)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteCompany)

module.exports = router