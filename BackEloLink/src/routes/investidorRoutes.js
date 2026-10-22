import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

/**
 * @openapi
 * /api/investidores:
 *   get:
 *     summary: Lista todos os investidores cadastrados
 *     tags: [Investidores]
 *     responses:
 *       200:
 *         description: Sucesso ao listar investidores
 *   post:
 *     summary: Cadastra o perfil de um novo investidor
 *     tags: [Investidores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [usuario_id, tipo_investidor]
 *             properties:
 *               usuario_id:
 *                 type: string
 *                 format: uuid
 *                 example: "590a6774-ffe3-4406-bbe2-ba83a3487def"
 *               tipo_investidor:
 *                 type: string
 *                 example: "Investidor Anjo"
 *               tese_investimento:
 *                 type: string
 *                 example: "Focus em Startups B2B SaaS e AI em estágio Seed."
 *               faixa_minima:
 *                 type: number
 *                 example: 50000
 *               faixa_maxima:
 *                 type: number
 *                 example: 500000
 *               cidade:
 *                 type: string
 *                 example: "Recife"
 *               uf:
 *                 type: string
 *                 example: "PE"
 *     responses:
 *       201:
 *         description: Investidor cadastrado com sucesso
 */
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('investidores').select('*');

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

router.post('/', async (req, res) => {
  const {
    usuario_id,
    tipo_investidor,
    tese_investimento,
    faixa_minima,
    faixa_maxima,
    cidade,
    uf,
  } = req.body;

  const { data, error } = await supabase
    .from('investidores')
    .insert([{
      usuario_id,
      tipo_investidor,
      tese_investimento,
      faixa_minima,
      faixa_maxima,
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

export default router;