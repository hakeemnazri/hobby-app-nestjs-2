import {
  ArrayNotEmpty,
  ArrayUnique,
  IsCurrency,
  IsOptional,
  Length,
} from 'class-validator';
import { IsCardinal } from 'common/decorators/is-cardinal.decorators';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;
  @Length(1, 500)
  @IsOptional()
  readonly description?: string;
  @IsCurrency()
  readonly price?: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsCardinal({
    each: true,
  })
  readonly categories?: number[];
}
