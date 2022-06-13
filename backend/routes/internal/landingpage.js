const express = require('express');
const { header, body } = require('express-validator');
const { updateService, deleteService } = require("../../controllers/internal/landingpage.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.put('/',
    body('aboutus').not().isEmpty(),
    body('pictureurl').not().isEmpty().isURL(),
    body('surl').not().isEmpty().isURL(),
    header('token').not().isEmpty().trim().escape(),
    updateService)

router.delete('/',
    header('token').not().isEmpty().trim().escape(),
    deleteService)

module.exports = router