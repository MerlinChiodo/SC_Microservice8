const express = require('express');
const { param, header } = require('express-validator');
const { getFaultyEvents, deleteFaultyEvent } = require("../../controllers/internal/faultyEvents.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/',
    header('token').not().isEmpty().trim().escape(),
    getFaultyEvents)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteFaultyEvent)

module.exports = router