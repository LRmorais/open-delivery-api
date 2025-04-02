/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Retorna os detalhes de um pedido
 *     description: Retorna informações detalhadas de um pedido no formato Open Delivery.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Detalhes do pedido retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 type:
 *                   type: string
 *                   example: DELIVERY
 *                 displayId:
 *                   type: string
 *                 sourceAppId:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 virtualBrand:
 *                   type: string
 *                 preparationStartDateTime:
 *                   type: string
 *                   format: date-time
 *                 merchant:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *                 customer:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     phones:
 *                       type: array
 *                       items:
 *                         type: string
 *                     address:
 *                       $ref: '#/components/schemas/Address'
 *                 total:
 *                   type: object
 *                   properties:
 *                     subTotal:
 *                       type: number
 *                     deliveryFee:
 *                       type: number
 *                     otherFees:
 *                       type: number
 *                     discounts:
 *                       type: number
 *                     total:
 *                       type: number
 *                 payment_type_id:
 *                   type: integer
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     deliveredBy:
 *                       type: string
 *                       example: MERCHANT
 *                     deliveryAddress:
 *                       $ref: '#/components/schemas/Address'
 *                     distance:
 *                       type: number
 *       400:
 *         description: ID do pedido ausente ou inválido
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno ao buscar o pedido
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         neighborhood:
 *           type: string
 *         postal_code:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *         city:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             state_id:
 *               type: string
 */
