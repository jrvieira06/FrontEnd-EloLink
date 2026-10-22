import { Router } from 'express';
import { supabase } from '../config/supabase.js';

const router = Router();

/**
 * @openapi
 * /api/buscas/startups:
 *   get:
 *     summary: Busca startups por estágio ou localização
 *     tags: [Busca & Matchmaking]
 *     parameters:
 *       - in: query
 *         name: estagio
 *         schema:
 *           type: string
 *       - in: query
 *         name: uf
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resultados da busca
 */
router.get('/startups', async (req, res) => {
  const { estagio, uf } = req.query;
  let query = supabase.from('startups').select('*');

  if (estagio) {
    query = query.eq('estagio', estagio);
  }

  if (uf) {
    query = query.eq('uf', uf);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(data);
});

export default router;