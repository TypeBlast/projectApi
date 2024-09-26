const User = require('../user/Entities/user.entity');
const { generateToken } = require('../utils/jwt');

const login = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await user.verifyPassword(password))) {
            throw new Error('Credenciais inválidas');
        }

        const token = generateToken(user);

        // Inclua as informações do usuário na resposta
        return {
            status: 201,
            message: 'Login bem-sucedido',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                phone: user.phone
            }
        };

    } catch (e) {
        return {
            status: 400,
            message: e.message,
        };
    }
};

// Nova função para login com Google
const googleLogin = async (email) => {
    try {
        // Verifica se o usuário já existe
        let user = await User.findOne({ where: { email } });

        if (!user) {
            // Se não existir, cria um novo usuário com dados padrão
            user = await User.create({
                email,
                name: 'Nome padrão', // Substitua por um valor adequado, se necessário
                // Adicione outros campos necessários aqui, como cpf, phone, etc.
            });
        }

        // Gera o token
        const token = generateToken(user);

        // Retorna o resultado
        return {
            status: 200,
            message: 'Login com Google bem-sucedido',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                phone: user.phone
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
