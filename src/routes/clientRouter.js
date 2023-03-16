const express = require('express')
const router = express.Router()

const ClientController = require('../controllers/ClientController')



router.get('/', ClientController.home)
router.get('/create', ClientController.getCreate)
router.post('/create', ClientController.create)


module.exports = router