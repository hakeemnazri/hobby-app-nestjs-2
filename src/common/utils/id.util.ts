import { ArrayUniqueIdentifier } from 'class-validator';
import { IdDto } from 'common/dtos/id.dto';
import { OrderItemDto } from 'orders/dto/order-item.dto';

export const IdentifierFn = {
  ID_DTO: (dto: IdDto) => dto.id,
  ORDER_ITEM_DTO: (dto: OrderItemDto) => dto.productId.id,
} as const satisfies Record<string, ArrayUniqueIdentifier>;
