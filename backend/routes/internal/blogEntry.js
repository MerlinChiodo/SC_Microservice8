const express = require('express');
const { header, body, param } = require('express-validator');
const { createBlogEntry, editBlogEntry, getBlogEntry, getAllBlogEntries, deleteBlogEntry } = require("../../controllers/internal/blogEntry.js");
const router = express.Router()

router.use(express.urlencoded({ extended: false }))
router.use(express.json())

router.post('/',
    body('path').not().isEmpty(),
    body('date').optional().isDate(),
    body('type').not().isEmpty().isNumeric(),
    body('target').not().isEmpty().isAlphanumeric(),
    body('description').not().isEmpty().isAlphanumeric(),
    header('token').not().isEmpty().trim().escape(),
    createBlogEntry)

router.put('/',
    body('id').not().isEmpty().isNumeric(),
    body('path').optional(),
    body('type').optional().isNumeric(),
    body('target').optional().isAlphanumeric(),
    body('description').optional().isAlphanumeric(),
    header('token').not().isEmpty().trim().escape(),
    editBlogEntry)

router.get('/all',
    header('token').not().isEmpty().trim().escape(),
    getAllBlogEntries)

router.get('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    getBlogEntry)

router.delete('/:id',
    param('id').not().isEmpty().isNumeric(),
    header('token').not().isEmpty().trim().escape(),
    deleteBlogEntry)

module.exports = router