import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';
import { IdDto } from 'common/dtos/id.dto';
import { IdentifierFn } from 'common/utils/id.util';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsEntity()
  readonly customerId: IdDto;

  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFn.ORDER_ITEM_DTO)
  @IsDefined()
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly orderItems: OrderItemDto[];
}
