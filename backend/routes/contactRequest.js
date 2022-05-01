const express = require('express')
const {contact, getContactRequest, getAllContactRequests, deleteContactRequest} = require("../controllers/contactRequest.js");
const router = express.Router()
 
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
 
router.post('/', contact)
 
router.get('/:contactRequestID', getContactRequest)
 
router.get('/all', getAllContactRequests)
 
router.delete('/:contactRequestID', deleteContactRequest)
 
module.exports = router