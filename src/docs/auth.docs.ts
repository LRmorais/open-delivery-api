/**
 * @openapi
 * /authentication/token:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Gera um access token via OAuth2 Client Credentials
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - client_secret
 *               - grant_type
 *             properties:
 *               client_id:
 *                 type: string
 *               client_secret:
 *                 type: string
 *               grant_type:
 *                 type: string
 *                 enum: [client_credentials]
 *     responses:
 *       200:
 *         description: Token gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                 token_type:
 *                   type: string
 *                   example: bearer
 *                 expires_in:
 *                   type: integer
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/problem+json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 status:
 *                   type: integer
 *       401:
 *         description: Credenciais inválidas
 *       503:
 *         description: Serviço indisponível
 */
