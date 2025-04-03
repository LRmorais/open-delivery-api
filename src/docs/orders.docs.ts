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
 *
 * /orders/{id}/cancellation:
 *   put:
 *     tags:
 *       - Orders
 *     summary: Cancela um pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 *       400:
 *         description: ID do pedido ausente ou inválido
 *       401:
 *         description: Token inválido ou ausente
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Erro interno ao cancelar pedido
 *
 * /orders:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Cria um novo pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Payload inválido
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno ao criar pedido
 *
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
 *
 *     CreateOrderRequest:
 *       type: object
 *       required:
 *         - company_id
 *         - orders
 *       properties:
 *         company_id:
 *           type: string
 *         orders:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               customer:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phones:
 *                     type: string
 *                   address:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       number:
 *                         type: string
 *                       complement:
 *                         type: string
 *                       neighborhood:
 *                         type: string
 *                       city:
 *                         type: string
 *                       uf:
 *                         type: string
 *                       postal_code:
 *                         type: string
 *                       latitude:
 *                         type: string
 *                       longitude:
 *                         type: string
 *               amount:
 *                 type: string
 *               change:
 *                 type: string
 *               observation:
 *                 type: string
 *               return:
 *                 type: boolean
 *               packet_type_id:
 *                 type: integer
 *               payment_type_id:
 *                 type: integer
 *               order_status_id:
 *                 type: integer
 *               thermal_box:
 *                 type: boolean
 *               get_sign:
 *                 type: boolean
 */
