import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

/**
 * @openapi
 * /api/conversas/{conversa_id}/mensagens:
 *   get:
 *     summary: Busca todas as mensagens de uma conversa
 *     tags: [Conversas & Mensagens]
 *     parameters:
 *       - in: path
 *         name: conversa_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Lista de mensagens retornada
 *   post:
 *     summary: Envia uma nova mensagem no chat
 *     tags: [Conversas & Mensagens]
 *     parameters:
 *       - in: path
 *         name: conversa_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [remetente_id, conteudo]
 *             properties:
 *               remetente_id:
 *                 type: string
 *                 format: uuid
 *               conteudo:
 *                 type: string
 *                 example: "Olá! Gostei muito do seu pitch deck. Vamos agendar uma call?"
 *     responses:
 *       201:
 *         description: Mensagem enviada com sucesso
 */
router.get('/:conversa_id/mensagens', async (req, res) => {
  const { conversa_id } = req.params;

  const { data, error } = await supabase
    .from('mensagens')
    .select('*')
    .eq('conversa_id', conversa_id)
    .order('enviada_em', { ascending: true });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

router.post('/:conversa_id/mensagens', async (req, res) => {
  const { conversa_id } = req.params;
  const { remetente_id, conteudo } = req.body;

  const { data, error } = await supabase
    .from('mensagens')
    .insert([{ conversa_id, remetente_id, conteudo }])
    .select()
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data);
});

export default router;