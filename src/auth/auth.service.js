const User = require('../user/Entities/user.entity')
const { generateToken } = require('../utils/jwt')

const login = async (email, password) => {

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.verifyPassword(password))) {
        throw new Error('Credenciais inválidas');
      }

      const token = generateToken(user);
      
      return { user, token };

    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = { login };