import { OrderWithAssociations } from '../interfaces/OrderWithAssociations';
import Address from '../database/models/Address';

export const mapOrderToOpenDelivery = (order: OrderWithAssociations, sourceAppId: string) => {
    const parseCoordinate = (value: string | number | null | undefined): number | null => {
        if (typeof value === 'string') return parseFloat(value);
        if (typeof value === 'number') return value;
        return null;
    };

    const mapAddress = (address?: Address | null) => {
        if (!address) return undefined;

        return {
            street: address.address,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: {
                name: address.city?.name || '',
                state: address.city?.state_id?.toString() || '',
            },
            postalCode: address.postal_code,
            coordinates: {
                latitude: parseCoordinate(address.latitude),
                longitude: parseCoordinate(address.longitude),
            }
        };
    };

    return {
        id: order.id.toString(),
        type: 'DELIVERY',
        displayId: order.id.toString(),
        sourceAppId,
        createdAt: order.created_at.toISOString(),
        virtualBrand: order.company?.fantasy_name,
        preparationStartDateTime: order.created_at.toISOString(),

        merchant: {
            name: order.company?.fantasy_name,
            address: mapAddress(order.company?.address || null),
        },

        customer: {
            name: order.customer?.name,
            address: mapAddress(order.customer?.address || null),
        },

        total: {
            subTotal: Number(order.amount) - Number(order.delivery_cost || 0),
            deliveryFee: Number(order.delivery_cost || 0),
            otherFees: Number(order.loocal_fee || 0),
            discounts: 0,
            total: Number(order.amount),
        },

        payment: {
            prepaid: true,
            methods: [
                {
                    method: order.payment_type?.name || 'Desconhecido',
                    value: Number(order.amount),
                }
            ]
        },

        delivery: {
            deliveredBy: 'MERCHANT',
            deliveryAddress: mapAddress(order.customer?.address || null),
            distance: order.distance,
        }
    };
};
