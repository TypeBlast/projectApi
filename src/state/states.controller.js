const statesService = require('./states.service')

class StatesController {
    constructor() {}

    async getAllStates(req, res) {
        const result = await statesService.getAllState();
        return res.status(result.status).json({ message: result.message, data: result.data });
    }
}

module.exports = new StatesController();