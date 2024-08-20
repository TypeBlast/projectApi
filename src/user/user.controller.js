const userService = require('./user.service');

class UserController {
    constructor() {}

    async createUser(req, res) {
        const result = await userService.createUser(req.body);
        return res.status(result.status).json({ message: result.message, data: result.data });
    }

    async getAllUsers(req, res) {
        const result = await userService.getAllUsers();
        return res.status(result.status).json({ message: result.message, data: result.data });
    }

    async getUserById(req, res) {
        const userId = req.params.id

        const result = await userService.getUserById(userId)

        return res.status(result.status).json({ message: result.message, data: result.data})
    }

    async deleteUserById(req, res) {
        const userId = req.params.id

        const result = await userService.deleteUserById(userId)

        return res.status(result.status).json({ message: result.message, data: result.data})

    }
}

module.exports = new UserController();
