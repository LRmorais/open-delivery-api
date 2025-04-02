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

export default router;
