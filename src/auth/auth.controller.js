const authService = require('./auth.service'); 

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

     
        const result = await authService.login(email, password);


        return res.status(result.status).json({
            message: result.message,
            token: result.token
        });

    } catch (e) {
      
        return res.status(result.status).json({
            message: e.message,
            error: e.message
        });
    }
};

module.exports = { login };
