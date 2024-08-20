// services/auth.service.js
const User = require('../user/Entities/user.entity');
const { generateToken } = require('../utils/jwt');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });


        if (!user || !(await user.verifyPassword(password))) {
            throw new Error('Credenciais inválidas');
        }

        const token = generateToken(user);

    
        return {
            status: 201,
            message: 'Login bem-sucedido',
            token
        };

    } catch (e) {
    
        return {
            status: 400,
            message: e.message,
        };
    }
};

module.exports = { login };
