import { Router } from 'express';
import { authenticateToken } from '../../middleware/authenticateToken';
import { success, problem } from '../../utils/responseHelper';
import { AuthenticatedRequest } from '../../interfaces/AuthenticatedRequest';
import Order from '../../database/models/Order';
import Company from '../../database/models/Company';
import Customer from '../../database/models/Customer';
import Address from '../../database/models/Address';
import OrderStatus from '../../database/models/OrderStatus';
import PaymentType from '../../database/models/PaymentType';
import { mapOrderToOpenDelivery } from '../../utils/mapOrderToOpenDelivery';
import City from "../../database/models/City";
import getLoocalApiInstance from "../../service/loocalApiService";
import {CreateOrderRequest} from "../../interfaces/CreateOrderRequest";

const router = Router();

router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;

    if (!id) {
        problem(res, 'ID do pedido é obrigatório', 400);
        return;
    }

    try {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: Company,
                    as: 'company',
                    include: [
                        {
                            model: Address,
                            as: 'address',
                            include: [{ model: City, as: 'city' }]
                        }
                    ]
                },
                {
                    model: Customer,
                    as: 'customer',
                    include: [
                        {
                            model: Address,
                            as: 'address',
                            include: [{ model: City, as: 'city' }]
                        }
                    ]
                },
                { model: OrderStatus, as: 'status' },
                { model: PaymentType, as: 'payment_type' },
            ],
        });

        if (!order) {
            problem(res, 'Pedido não encontrado', 404);
            return;
        }

        const mapped = mapOrderToOpenDelivery(order, req.client?.client_id || 'unknown');
        success(res, mapped);
        return;
    } catch (err: any) {
        console.error('Erro ao buscar detalhes do pedido:', err);
        problem(res, 'Erro interno ao buscar pedido', 500);
        return;
    }
});

router.put('/:id/cancellation', authenticateToken, async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;

    if (!id) {
        problem(res, 'ID do pedido é obrigatório.', 400);
        return
    }

    try {
        const loocalApi = await getLoocalApiInstance();

        const payload = {
            order_status_id: 6
        };

        await loocalApi.put(`/orders/${id}/status`, payload);

        success(res, { message: 'Pedido cancelado com sucesso.' });
        return
    } catch (err: any) {
        console.error('Erro ao cancelar pedido:', err);

        if (err.response?.status === 404) {
            problem(res, 'Pedido não encontrado.', 404);
            return
        }

        problem(res, 'Erro interno ao cancelar pedido.', 500);
        return
    }
});

router.post('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
    const payload: CreateOrderRequest = req.body;

    if (!payload || !payload.company_id || !Array.isArray(payload.orders) || payload.orders.length === 0) {
        problem(res, 'Payload inválido. Verifique os campos obrigatórios.', 400);
        return;
    }

    try {
        const loocalApi = await getLoocalApiInstance();
        const response = await loocalApi.post('/orders', payload);

        success(res, response.data);
        return;
    } catch (err: any) {
        console.error('Erro ao criar pedido:', err.response?.data || err);
        problem(res, 'Erro interno ao criar pedido', 500);
        return;
    }
});


export default router;
