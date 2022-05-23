const express = require('express');
const { header, param, body } = require('express-validator');
const { createDonation, getAllDonations, deleteDonation, getReceivedDonations } = require("../controllers/donations.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('date').not().isEmpty().isDate(),
    body('amount').not().isEmpty().isNumeric(),
    body('recipiant').not().isEmpty().isNumeric(),
    body('donator').not().isEmpty().isNumeric(),
    body('reason').optional(),
    body('purpose').optional(),
    header('token').not().isEmpty().trim().escape(),
    createDonation)

router.get('/',
    header('token').not().isEmpty().trim().escape(),
    getAllDonations)

router.get('/:recipiant',
    param('recipiant').not().isEmpty().isNumeric(),
    header('token').trim().escape(),
    getReceivedDonations)

router.delete('/',
    header('date').not().isEmpty().isDate(),
    header('amount').not().isEmpty().isNumeric(),
    header('recipiant').not().isEmpty().isNumeric(),
    header('donator').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteDonation)

module.exports = router