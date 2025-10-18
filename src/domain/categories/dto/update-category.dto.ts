import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IdDto } from 'common/dtos/id.dto';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends IntersectionType(
  PartialType(CreateCategoryDto),
  IdDto,
) {}
