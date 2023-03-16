const express = require('express')
const router = express.Router()

const ToolController = require('../controllers/ToolController')


router.get('/create', ToolController.getCreate)
router.post('/create', ToolController.create)

module.exports = router