import { EventTypeEnum } from '../enums/EventTypeEnum';

export interface EventPollingResponse {
    eventId: string; // UUID do evento
    eventType: EventTypeEnum;
    orderId: number; // id interno da tabela orders
    // orderURL: string;
    createdAt: string; // ISO string
    sourceAppId: string; // client_id da integração
    virtualBrand?: string;
}
