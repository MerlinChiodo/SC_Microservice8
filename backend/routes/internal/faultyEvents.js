const express = require('express');
const { getFaultyEvents} = require("../../controllers/internal/faultyEvents.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.get('/',getFaultyEvents)


module.exports = router