export interface EventAcknowledgmentAttributes {
    id: string;
    order_id: number;
    event_type: string;
    acknowledged_at?: Date;
    client_id: string;
    company_id: number;
}
