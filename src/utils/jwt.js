const jwt = require('jsonwebtoken');

const JwtSecret = process.env.JWT_SECRET 

const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email, phone: user.phone, cpf: user.cpf }, JwtSecret, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
