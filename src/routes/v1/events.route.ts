import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { success, problem } from '../../utils/responseHelper';
import { EventTypeEnum, ALL_EVENT_TYPES } from '../../enums/EventTypeEnum';

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
router.get('/events:polling', authenticateToken, async (req, res) => {
    const { eventType } = req.query;
    const merchants = req.headers['x-polling-merchants'];

    if (!merchants) {
        problem(res, 'x-polling-merchants header é obrigatório', 400);
        return
    }

    let selectedTypes: string[] = [];

    if (!eventType) {
        selectedTypes = ALL_EVENT_TYPES;
    } else if (Array.isArray(eventType)) {
        selectedTypes = eventType.filter((t) => ALL_EVENT_TYPES.includes(t));
    } else {
        if (ALL_EVENT_TYPES.includes(eventType)) {
            selectedTypes = [eventType];
        } else {
            problem(res, `eventType '${eventType}' é inválido`, 400);
            return
        }
    }

    const fakeEvents = [
        {
            id: 'event_123',
            type: EventTypeEnum.CREATED,
            orderId: 'order_abc123',
            timestamp: new Date().toISOString(),
        },
        {
            id: 'event_124',
            type: EventTypeEnum.CANCELLED,
            orderId: 'order_xyz456',
            timestamp: new Date().toISOString(),
        },
    ];

    const filtered = fakeEvents.filter((event) =>
        selectedTypes.includes(event.type)
    );

    success(res, filtered);
    return
});

export default router;
