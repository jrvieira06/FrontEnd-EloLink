export const validarRegistro = (req, res, next) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({
      error: 'Todos os campos (nome, email, senha, tipo) são obrigatórios.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de e-mail inválido.' });
  }

  if (senha.length < 6) {
    return res.status(400).json({
      error: 'A senha deve conter no mínimo 6 caracteres.',
    });
  }

  next(); 
};

export const validarStartup = (req, res, next) => {
  const { usuario_id, nome_fantasia } = req.body;

  if (!usuario_id || !nome_fantasia) {
    return res.status(400).json({
      error: 'Os campos usuario_id e nome_fantasia são obrigatórios.',
    });
  }

  next();
};