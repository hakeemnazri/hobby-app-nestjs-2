import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';
import { IsEntity } from 'common/decorators/validators/is-entity.decorator';
import { IdDto } from 'common/dtos/id.dto';

export class OrderItemDto {
  @IsCardinal()
  readonly quantity: number;

  @IsEntity()
  readonly productId: IdDto;
}
