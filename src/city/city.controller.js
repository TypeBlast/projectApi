const citiesService = require('./city.service')

class CitiesController {
    constructor() {}

    async getAllCitiesByStateId(req, res) {

        const { stateId } = req.params;
        const result = await citiesService.getAllCitiesByStateId(stateId);
        return res.status(result.status).json({ message: result.message, data: result.data });
    }

    async getCityById(req, res) {

        const idCity = req.params.id

        const result = await citiesService.getCityById(idCity);
        return res.status(result.status).json({ message: result.message, data: result.data });

    }
}

module.exports = new CitiesController();