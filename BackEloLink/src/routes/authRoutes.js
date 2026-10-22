import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase.js';
import { validarRegistro } from '../middlewares/validacaoMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha, tipo]
 *             properties:
 *               nome: { type: string, example: "Camila Rocha" }
 *               email: { type: string, example: "camila@omniflow.ai" }
 *               senha: { type: string, example: "123456" }
 *               tipo: { type: string, example: "startup" }
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/register', validarRegistro, async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  // Verifica se o e-mail já existe
  const { data: usuarioExistente } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email)
    .single();

  if (usuarioExistente) {
    return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
  }

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email, senha_hash: senha, tipo, status: 'ativo' }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json({
    message: 'Usuário cadastrado com sucesso',
    usuario: data,
  });
});

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário e retorna o Token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string, example: "teste@exemplo.com" }
 *               senha: { type: string, example: "123456" }
 *     responses:
 *       200:
 *         description: Login realizado com sucesso e token gerado
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !usuario || usuario.senha_hash !== senha) {
    return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET || 'chave_secreta_padrao',
    { expiresIn: '24h' }
  );

  return res.status(200).json({
    message: 'Login realizado com sucesso',
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
    },
  });
});

/**
 * @openapi
 * /api/auth/usuarios:
 *   get:
 *     summary: Lista todos os usuários cadastrados
 *     tags: [Autenticação]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/usuarios', async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, tipo, status, criado_em');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

export default router;