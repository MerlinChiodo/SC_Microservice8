const express = require('express');
const { header, body } = require('express-validator');
const { createAppointment, getAllAppointments, deleteAppointment } = require("../controllers/appointments.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    header('token').not().isEmpty().trim().escape(),
    body('date').trim().escape().isDate(),
    body('customer').not().isEmpty().isNumeric(),
    body('official').not().isEmpty().trim().isNumeric(),
    createAppointment)

router.get('/',
    header('token').not().isEmpty().trim().escape(),
    header('customer').optional(),
    getAllAppointments)

router.delete('/',
    header('date').not().isEmpty().isDate(),
    header('official').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteAppointment)

module.exports = router