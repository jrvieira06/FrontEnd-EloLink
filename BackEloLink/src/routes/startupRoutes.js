import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { validarStartup } from '../middlewares/validacaoMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/startups:
 *   get:
 *     summary: Lista todas as startups cadastradas
 *     tags: [Startups]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *   post:
 *     summary: Cadastra uma nova startup
 *     tags: [Startups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuario_id, nome_fantasia]
 *             properties:
 *               usuario_id: { type: string, format: uuid, example: "590a6774-ffe3-4406-bbe2-ba83a3487def" }
 *               nome_fantasia: { type: string, example: "OmniFlow AI" }
 *               cnpj: { type: string, example: "12.345.678/0001-90" }
 *               descricao: { type: string, example: "Solução de automação inteligente para Supply Chain" }
 *               estagio: { type: string, example: "Seed" }
 *               investimento_pretendido: { type: number, example: 3500000 }
 *               cidade: { type: string, example: "Recife" }
 *               uf: { type: string, example: "PE" }
 *     responses:
 *       201:
 *         description: Startup cadastrada com sucesso no Supabase
 * 
 * /api/startups/{id}:
 *   get:
 *     summary: Busca uma startup específica pelo ID
 *     tags: [Startups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Dados da startup
 *   delete:
 *     summary: Remove/Deleta uma startup pelo ID
 *     tags: [Startups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Startup excluída com sucesso
 */

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('startups').select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: 'Startup não encontrada' });
  }

  return res.status(200).json(data);
});

router.post('/', validarStartup, async (req, res) => {
  const {
    usuario_id,
    nome_fantasia,
    cnpj,
    descricao,
    estagio,
    investimento_pretendido,
    cidade,
    uf,
  } = req.body;

  const { data, error } = await supabase
    .from('startups')
    .insert([{
      usuario_id,
      nome_fantasia,
      cnpj,
      descricao,
      estagio,
      investimento_pretendido,
      cidade,
      uf,
    }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('startups')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Startup não encontrada ou já excluída' });
  }

  return res.status(200).json({
    message: 'Startup excluída com sucesso',
    startup_deletada: data,
  });
});

export default router;