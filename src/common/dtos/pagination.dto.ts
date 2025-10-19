import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';

export class PaginationDto {
  @IsCardinal()
  @IsOptional()
  @Type(() => Number)
  @Transform((value: TransformFnParams) => value ?? 1)
  readonly limit: number;

  @IsCardinal()
  @IsOptional()
  @Type(() => Number)
  @Transform((value: TransformFnParams) => value ?? 1)
  readonly page: number = 1;
}
