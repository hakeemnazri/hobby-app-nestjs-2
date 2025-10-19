import { IsCardinal } from 'common/decorators/is-cardinal.decorators';
import { IsEntity } from 'common/decorators/is-entity.decorator';
import { IdDto } from 'common/dtos/id.dto';

export class OrderItemDto {
  @IsCardinal()
  readonly quantity: number;

  @IsEntity()
  readonly productId: IdDto;
}
