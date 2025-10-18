import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/is-cardinal.decorators';

export class PaginationDto {
  @IsCardinal()
  @IsOptional()
  readonly limit: number;

  @IsCardinal()
  @IsOptional()
  readonly page: number;
}
