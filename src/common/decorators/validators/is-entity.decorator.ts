import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { IdDto } from 'common/dtos/id.dto';

export const IsEntity = () =>
  applyDecorators(
    IsDefined(),
    ValidateNested(),
    Type(() => IdDto),
  );
