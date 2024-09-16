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

    async getUserByEmail(req, res) {
        try {
            const { email } = req.params; 
    
            const result = await userService.getUserByEmail(email);
    
            return res.status(result.status).json({ message: result.message, data: result.data });
        } catch (e) {
            return res.status(result.status).json({ message: result.message, data: result.data });
        }
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
    

    async getUserByIdWithPetsAndAppointments(req, res) {
        const userId = req.params.id;
        const result = await userService.getUserByIdWithPetsAndAppointments(userId);
        return res.status(result.status).json({ message: result.message, data: result.data });
      }

}

module.exports = new UserController();
