import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IdDto } from 'common/dtos/id.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends IntersectionType(
  PartialType(CreateUserDto),
  IdDto,
) {}
