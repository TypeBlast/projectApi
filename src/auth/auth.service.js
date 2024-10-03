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
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                phone: user.phone,
                role: user.role
            }
        };

    } catch (e) {
        return {
            status: 400,
            message: e.message,
        };
    }
};


const googleLogin = async (email) => {
    try {

        let user = await User.findOne({ where: { email } });

        if (!user) {

            user = await User.create({
                email,
                name: 'Nome padrão', 
                
            });
        }

        const token = generateToken(user);

        return {
            status: 200,
            message: 'Login com Google bem-sucedido',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                phone: user.phone,
                role: user.role
            }
        };
    } catch (e) {
        return {
            status: 400,
            message: e.message,
        };
    }
};

module.exports = { login, googleLogin };
