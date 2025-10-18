import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IdDto } from 'common/dtos/id.dto';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends IntersectionType(
  PartialType(CreateProductDto),
  IdDto,
) {}
