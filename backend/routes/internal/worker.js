const express = require('express');
const { header, body, param } = require('express-validator');
const { createWorker, getAllWorkers, deleteWorker } = require("../../controllers/internal/worker.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('id').not().isEmpty().isNumeric(),
    body('sign').optional().isAlphanumeric(),
    body('admin').not().isEmpty().isBoolean(),
    header('token').not().isEmpty().trim().escape(),
    createWorker)

router.get('/',
    header('token').not().isEmpty().trim().escape(),
    getAllWorkers)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteWorker)

module.exports = router