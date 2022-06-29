const express = require('express');
const { header, body, param } = require('express-validator');
const { createBlogEntry, getAllBlogEntries, deleteBlogEntry } = require("../../controllers/internal/blogEntry.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('path').not().isEmpty(),
    body('date').optional().isDate(),
    body('target').not().isEmpty(),
    body('description').not().isEmpty(),
    header('token').not().isEmpty().trim().escape(),
    createBlogEntry)

router.get('/all',getAllBlogEntries)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteBlogEntry)

module.exports = router