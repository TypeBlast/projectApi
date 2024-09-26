const authService = require('./auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se a senha foi fornecida para o login padrão
        if (password) {
            const result = await authService.login(email, password);
            return res.status(result.status).json(result);
        } else {
            // Caso contrário, tenta o login com o Google
            const result = await authService.googleLogin(email);
            return res.status(result.status).json(result);
        }
    } catch (e) {
        return res.status(400).json({
            message: e.message,
            error: e.message,
        });
    }
};

module.exports = { login };
