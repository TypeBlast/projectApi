const States = require('../state/Entities/states.entity');
const Cities = require('./Entities/cities.entity');

async function getAllCitiesByStateId(stateId) {
    try {

        if (stateId === undefined || isNaN(stateId)) {
            return { status: 400, message: 'ID do estado inválido.' };
        }

        const cities = await Cities.findAll({
            where: { state_id: stateId }
        });

        const state = await States.findByPk(stateId);
        if (!state) {
            return { status: 404, message: 'Estado não encontrado.' };
        }


        return { status: 200, data: cities };

    } catch (e) {

        return { status: 400, message: e.message };
    }
}

async function getCityById(cityId) {
    try {

    
        const city = await Cities.findByPk(cityId);

        if (!city) {
            return { status: 404, message: 'Cidade não encontrada.' };
        }


        return { status: 200, data: city };
    } catch (e) {

        return { status: 400, message: e.message };
    }
}

module.exports = {
    getAllCitiesByStateId,
    getCityById
};
