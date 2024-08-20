const User = require('./Entities/user.entity');

async function createUser(userData) {
    try {
        const newUser = await User.create(userData);

        const userJson = newUser.toJSON();

        delete userJson.password;

    
        return { status: 201, message: "Usuário criado com sucesso", data: userJson };
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
    try {
        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }

        const user = await User.findByPk(idUser);

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        return { status: 200, data: user }; 
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

async function deleteUserById(idUser) {
    try {

        if (!idUser || isNaN(idUser)) {
            throw new Error('Id de usuário inválido.');
        }
        
        const user = await User.findByPk(idUser);

        if (!user) 
        {
            throw new Error('Usuário não encontrado.');
        }

        await user.destroy(); 
        
        return { status: 200, message: "Usuário excluído com sucesso" };

    } catch (e) {
        return { status: 400, message: e.message };
    }
}

module.exports = {
    createUser, getAllUsers, getUserById, deleteUserById
};