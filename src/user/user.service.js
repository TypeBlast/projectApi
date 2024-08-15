const User = require('./Entities/user.entity');

async function createUser(userData) {
    try {
        const newUser = await User.create(userData);
        return { status: 201, message: "Usuário criado com sucesso", data: newUser };
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

async function getAllUsers() {
    try{

        const users = await User.findAll()
        return { status: 201, data: users };
    }
    
    catch (e) {

    return { status: 400, message: e.message };
 }

}

async function getUserById(idUser) {
    try{

        const user = await User.findByPk(idUser)
        return { status: 201, data: user };
    }
    catch (e) {

        return { status: 400, message: e.message };
     }
}

module.exports = {
    createUser, getAllUsers, getUserById
};