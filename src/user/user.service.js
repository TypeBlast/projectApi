const User = require('./Entities/user.entity');

async function createUser(userData) {
    try {
        const newUser = await User.create(userData);
        return { status: 201, message: "Usuário criado com sucesso", data: newUser };
    } catch (e) {
        return { status: 400, message: e.message };
    }
}

module.exports = {
    createUser
};