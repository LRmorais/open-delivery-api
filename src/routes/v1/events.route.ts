import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { success, problem } from '../../utils/responseHelper';
import { EventTypeEnum, ALL_EVENT_TYPES, EventTypeToOrderStatus } from '../../enums/EventTypeEnum';
import { EventPollingResponse } from '../../interfaces/EventPollingResponse';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';
import { v4 as uuidv4 } from 'uuid';
import Order from '../../database/models/Order';
import { Op } from 'sequelize';
import Company from "../../database/models/Company";
import EventAcknowledgment from "../../database/models/EventAcknowledgment";
import {mapOrderStatusToEvent} from "../../utils/orderEventMapper";

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
            include: [{ model: Company, as: 'company', attributes: ['fantasy_name'] }],
        });

        const acknowledged = await EventAcknowledgment.findAll({
            where: {
                client_id: req.client?.client_id,
                company_id: req.client?.company_id,
            },
        });

        const events: EventPollingResponse[] = orders.map((order) => {
            const eventType = mapOrderStatusToEvent(order.order_status_id);
            return {
                eventId: uuidv4(),
                eventType,
                orderId: order.id,
                orderURL: `https://api.seusistema.com.br/v1/orders/${order.id}`,
                createdAt: order.created_at.toISOString(),
                sourceAppId: req.client?.client_id || 'unknown',
                virtualBrand: order.company?.fantasy_name || 'Loja Padrão',
            };
        }).filter((event) => {
            return !acknowledged.find(
                (ack) => ack.order_id === event.orderId && ack.event_type === event.eventType
            );
        });

        success(res, events);
        return
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        problem(res, 'Erro interno ao buscar eventos', 500);
        return
    }
});

router.post('/events/acknowledgment', authenticateToken, async (req: AuthenticatedRequest, res) => {
    try {
        const events = req.body;

        if (!Array.isArray(events) || events.length === 0) {
            problem(res, 'O corpo da requisição deve ser um array com pelo menos um evento.', 400);
            return;
        }

        if (events.length > 100) {
            problem(res, 'É permitido reconhecer no máximo 100 eventos por vez.', 400);
            return;
        }

        const client_id = req.client?.client_id;
        const company_id = req.client?.company_id;

        if (!client_id || !company_id) {
            problem(res, 'Credenciais do client inválidas ou ausentes.', 401);
            return;
        }

        const registros = events.map((event) => ({
            id: event.id || uuidv4(),
            order_id: event.orderId,
            event_type: event.eventType,
            acknowledged_at: new Date(),
            client_id,
            company_id,
        }));

        await EventAcknowledgment.bulkCreate(registros);

        res.status(202).json({ message: 'Eventos reconhecidos com sucesso' });
        return;
    } catch (err) {
        console.error('Erro ao processar acknowledgment:', err);
        problem(res, 'Erro interno ao reconhecer eventos', 500);
        return;
    }
});

export default router;
