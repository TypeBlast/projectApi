const router = require('express').Router()
const citiesController = require('./city.controller')

router.get('/cityToState/:stateId', citiesController.getAllCitiesByStateId)
router.get('/:id', citiesController.getCityById)

module.exports = router