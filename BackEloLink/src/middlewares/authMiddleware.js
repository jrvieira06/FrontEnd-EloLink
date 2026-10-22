import jwt from 'jsonwebtoken';

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret_placeholder', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido ou expirado.' });
    }

    req.user = user; // Armazena os dados do usuário decodificados na requisição
    next();
  });
};