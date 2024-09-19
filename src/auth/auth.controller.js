const authService = require('./auth.service'); 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
     
        const result = await authService.login(email, password);

        return res.status(result.status).json({
            message: result.message,
            token: result.token,
            user: result.user // Inclua os dados do usuário na resposta
        });

    } catch (e) {
        return res.status(400).json({
            message: e.message,
            error: e.message
        });
    }
};

module.exports = { login };
