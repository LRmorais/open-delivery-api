export interface CreateOrderRequest {
    company_id: string;
    orders: OrderPayload[];
}

export interface OrderPayload {
    customer: CustomerPayload;
    amount: string;
    change: string;
    observation?: string;
    return: boolean;
    packet_type_id: number;
    payment_type_id: number;
    order_status_id: number;
    thermal_box: boolean;
    get_sign: boolean;
}

export interface CustomerPayload {
    name: string;
    phones: string;
    address: AddressPayload;
}

export interface AddressPayload {
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    uf: string;
    postal_code: string;
    latitude: string;
    longitude: string;
}
