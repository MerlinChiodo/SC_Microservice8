const express = require('express');
const { query, header, body } = require('express-validator');
const { createIncome, getIncome, deleteIncome } = require("../controllers/income.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('date').optional().isDate(),
    body('amount').not().isEmpty().isNumeric(),
    body('recipiant').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    createIncome)

router.get('/',
    query('recipiant').optional().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getIncome)

router.delete('/',
    header('date').optional().isDate(),
    header('amount').not().isEmpty().isNumeric(),
    header('recipiant').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteIncome)

module.exports = router