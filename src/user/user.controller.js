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

    async getUserByIdUsingRelations(req, res) {
        const userId = req.params.id;
        const result = await userService.getUserByIdUsingRelations(userId);
        return res.status(result.status).json({ message: result.message, data: result.data });
      }


    async updateUser(req, res) {
        const { id } = req.params;
        const userData = req.body;
    
        const result = await userService.updateUser(id, userData);
    
        return res.status(result.status).json({ message: result.message, data: result.data });
    }

    async forgotPassword(req, res) {
        const { email } = req.body;
      
        const result = await userService.forgotPassword(email);
      
        return res.status(result.status).json({ message: result.message });
      }

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
      
        const result = await userService.resetPassword(token, newPassword);
      
        return res.status(result.status).json({ message: result.message });
      }
      
      
}

module.exports = new UserController();
