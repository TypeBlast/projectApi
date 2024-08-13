const userService = require('./user.service');

class UserController {
    constructor() {}

    async createUser(req, res) {
        const result = await userService.createUser(req.body);
        return res.status(result.status).json({ message: result.message, data: result.data });
    }
}

module.exports = new UserController();
