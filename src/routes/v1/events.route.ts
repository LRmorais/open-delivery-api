import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { success, problem } from '../../utils/responseHelper';
import { EventTypeEnum, ALL_EVENT_TYPES, EventTypeToOrderStatus } from '../../enums/EventTypeEnum';
import { EventPollingResponse } from '../../interfaces/EventPollingResponse';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';
import { v4 as uuidv4 } from 'uuid';
import Order from '../../database/models/Order';
import { Op } from 'sequelize';

const router = Router();

router.get('/events:polling', authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
        const { eventType } = req.query;

        const rawTypes = Array.isArray(eventType) ? eventType : eventType ? [eventType] : [];
        const selectedTypes: EventTypeEnum[] = rawTypes
            .map((t) => String(t))
            .filter((t): t is EventTypeEnum =>
                Object.values(EventTypeEnum).includes(t as EventTypeEnum)
            );

        const typesToUse = selectedTypes.length > 0 ? selectedTypes : ALL_EVENT_TYPES;

        const statusIds = typesToUse
            .map((type) => EventTypeToOrderStatus[type])
            .filter((id): id is number => typeof id === 'number');

        const orders = await Order.findAll({
            where: {
                company_id: req.client?.company_id,
                order_status_id: { [Op.in]: statusIds },
            },
        });

        const events: EventPollingResponse[] = orders.map((order) => {
            const matchedType = Object.entries(EventTypeToOrderStatus).find(
                ([eventType, statusId]) => statusId === order.order_status_id
            )?.[0] as EventTypeEnum;

            return {
                eventId: uuidv4(),
                eventType: matchedType,
                orderId: order.id,
                // orderURL: `https://api.seusistema.com.br/v1/orders/${order.id}`,
                createdAt: new Date().toISOString(),
                sourceAppId: req.client?.client_id || 'unknown',
                virtualBrand: 'Loja Padrão',
            };
        });

        success(res, events);
        return
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        problem(res, 'Erro interno ao buscar eventos', 500);
        return
    }
});

export default router;
