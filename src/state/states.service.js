const States = require('./Entities/states.entity')

async function getAllState(){
    try{

        const states = await States.findAll()
        return { status: 201, data: states };
    }
    
    catch (e) {

    return { status: 400, message: e.message };
 }

}

module.exports = {
    getAllState,
};