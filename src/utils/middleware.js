const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log('Cabeçalhos recebidos:', req.headers);

  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader) {

    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else {

      token = authHeader;
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  console.log('Token recebido:', token); 

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Erro na verificação do token:', err); 
      return res.status(401).json({ message: 'Token inválido.' });
    }

    req.userId = decoded.id; 
    next();
  });
};

module.exports = authenticate;
