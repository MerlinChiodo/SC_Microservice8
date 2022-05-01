const express = require('express')
const {createOperation, getOperation, getAllOperations, deleteOperation} = require("../controllers/operations.js");
const router = express.Router()
 
router.use(express.urlencoded({ extended: false }))
router.use(express.json())
 
router.post('/', createOperation)
 
router.get('/:operationID', getOperation)
 
router.get('/all', getAllOperations)
 
router.delete('/:operationID', deleteOperation)
 
module.exports = router