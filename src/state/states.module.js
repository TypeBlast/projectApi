const router = require('express').Router()
const statesController = require('./states.controller')

router.get('/', statesController.getAllStates)

module.exports = router;