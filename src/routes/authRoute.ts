import {Router} from "express";

const router = Router();

/**
 * @openapi
 * /authentication/teste:
 *   get:
 *     summary: Teste de rota autenticada
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/token', async (req, res) => {});

export default router;
