const express = require('express')
const RentTollController = require('../controllers/RentToolController')
const router = express.Router()

const rentToolController = require('../controllers/RentToolController')

router.get('/', RentTollController.home)
router.get('/create', rentToolController.getCreate)
router.post('/create', rentToolController.create)

module.exports = router