import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { success, problem } from '../../utils/responseHelper';
import { EventTypeEnum, ALL_EVENT_TYPES } from '../../enums/EventTypeEnum';
import { EventPollingResponse } from '../../interfaces/EventPollingResponse';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

/**
 * @openapi
 * /events:polling:
 *   get:
 *     tags:
 *       - events
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
 *       - in: header
 *         name: x-polling-merchants
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: ["22815773000169-dbc7e35a-c936-4665-9e13-eb55eb8b6824"]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *       400:
 *         description: Requisição inválida
 */
router.get('/events:polling', authenticateToken, async (req: AuthenticatedRequest, res) => {
    const { eventType } = req.query;

    const rawTypes = Array.isArray(eventType) ? eventType : eventType ? [eventType] : [];
    const selectedTypes: string[] = rawTypes
        .map((t) => String(t))
        .filter((t): t is EventTypeEnum => Object.values(EventTypeEnum).includes(t as EventTypeEnum));

    const typesToUse = selectedTypes.length > 0 ? selectedTypes : ALL_EVENT_TYPES;

    const simulatedOrderIds = [101, 102];

    const events: EventPollingResponse[] = simulatedOrderIds.flatMap((orderId) =>
        typesToUse.map((type) => ({
            eventId: uuidv4(),
            eventType: type as EventTypeEnum,
            orderId,
            orderURL: `https://api.seusistema.com.br/v1/orders/${orderId}`,
            createdAt: new Date().toISOString(),
            sourceAppId: req.client?.client_id || 'unknown',
            virtualBrand: 'Loja Padrão',
        }))
    );

    success(res, events);
    return
});

export default router;
