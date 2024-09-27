const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

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


/* Criação do Middleware de autenticação que será usado para
 proteger alguns métodos de endpoints que necessitam do ID 
do usuário em questão */