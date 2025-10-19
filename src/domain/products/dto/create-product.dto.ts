import {
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { IsEntity } from 'common/decorators/is-entity.decorator';
import { IdDto } from 'common/dtos/id.dto';
import { idDtoIdentifier } from 'common/utils/id.util';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;

  @Length(1, 500)
  @IsOptional()
  readonly description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price?: number;

  @ArrayNotEmpty()
  @ArrayUnique(idDtoIdentifier)
  @IsEntity()
  readonly categories?: IdDto[];
}
