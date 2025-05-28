export interface Order {
    id: number;
    company_id: number;
    customer_id: number;
    order_status_id: number;
    payment_type_id: number;
    packet_type_id: number;
    amount: number;
    change: number;
    thermal_box?: boolean;
    get_sign?: boolean;
    cpf?: string;
    return?: boolean;
    distance?: number;
    delivery_cost?: number;
    local_fee?: number;
    scheduled?: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at?: Date;
    dynamic_cost?: boolean;
}
