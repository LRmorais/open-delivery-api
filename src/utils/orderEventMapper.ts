import { OrderStatusEnum } from '../enums/OrderStatusEnum';
import { EventTypeEnum } from '../enums/EventTypeEnum';

export function mapOrderStatusToEvent(statusId: number): EventTypeEnum {
  switch (statusId) {
    case OrderStatusEnum.RECEBIDO:
      return EventTypeEnum.CREATED;
    case OrderStatusEnum.AGUARDANDO_ENTREGADOR:
      return EventTypeEnum.CONFIRMED;
    case OrderStatusEnum.ENTREGADOR_NA_LOJA:
      return EventTypeEnum.READY_FOR_PICKUP;
    case OrderStatusEnum.A_CAMINHO_DO_CLIENTE:
      return EventTypeEnum.DISPATCHED;
    case OrderStatusEnum.ENTREGUE:
      return EventTypeEnum.DELIVERED;
    case OrderStatusEnum.CANCELADO:
      return EventTypeEnum.CANCELLED;
    case OrderStatusEnum.A_CAMINHO_DA_RETIRADA:
      return EventTypeEnum.PREPARING;
    case OrderStatusEnum.CHEGOU_NA_ENTREGA:
      return EventTypeEnum.PICKED_UP;
    default:
      return EventTypeEnum.CREATED;
  }
}
