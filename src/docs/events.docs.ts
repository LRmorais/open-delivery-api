/**
 * @openapi
 * components:
 *   schemas:
 *     EventPollingResponse:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           format: uuid
 *           description: Identificador único do evento
 *         eventType:
 *           type: string
 *           enum:
 *             - CREATED
 *             - CONFIRMED
 *             - PREPARING
 *             - DISPATCHED
 *             - READY_FOR_PICKUP
 *             - DELIVERED
 *             - CANCELLED
 *             - CONCLUDED
 *         orderId:
 *           type: string
 *           description: ID do pedido
 *         orderURL:
 *           type: string
 *           format: uri
 *         createdAt:
 *           type: string
 *           format: date-time
 *         sourceAppId:
 *           type: string
 *           format: uuid
 *         virtualBrand:
 *           type: string
 *           description: Nome da marca virtual
 *
 *     EventAcknowledgmentRequest:
 *       type: object
 *       required:
 *         - id
 *         - orderId
 *         - eventType
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID do evento reconhecido
 *         orderId:
 *           type: string
 *           format: uuid
 *           description: ID do pedido relacionado
 *         eventType:
 *           type: string
 *           description: Tipo do evento reconhecido
 *
 * /events:polling:
 *   get:
 *     tags:
 *       - Events
 *     summary: Retorna eventos de pedidos para Software Service
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: eventType
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["CREATED", "CANCELLED"]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventPollingResponse'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 *
 * /events/acknowledgment:
 *   post:
 *     tags:
 *       - Events
 *     summary: Reconhece eventos processados
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/EventAcknowledgmentRequest'
 *     responses:
 *       202:
 *         description: Eventos reconhecidos com sucesso
 *       400:
 *         description: Requisição inválida ou estrutura incorreta
 *       401:
 *         description: Token inválido ou ausente
 *       500:
 *         description: Erro interno do servidor
 */
