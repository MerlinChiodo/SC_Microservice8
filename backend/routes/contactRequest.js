const express = require('express')
const { param, header, body } = require('express-validator');
const { contact, getContactRequest, getAllContactRequests, deleteContactRequest } = require("../controllers/contactRequest.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('name').not().isEmpty().trim().escape(),
    body('email').not().isEmpty().isEmail(),
    body('message').not().isEmpty().trim().escape(),
    body('date').not().isEmpty().isDate(),
    contact)

router.get('/:contactRequestID',
    param('contactRequestID').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    getContactRequest)

router.get('/all',
    header('token').not().isEmpty().trim().escape(),
    getAllContactRequests)

router.delete('/:contactRequestID',
    param('contactRequestID').not().isEmpty().isNumeric(),
    header('token').trim().escape(),
    deleteContactRequest)

module.exports = router