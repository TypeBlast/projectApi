const router = require('express').Router()
const speciesController = require('./species.controller');

router.get('/', speciesController.getAllSpecies);

module.exports = router;
