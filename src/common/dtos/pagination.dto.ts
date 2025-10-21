import { IsOptional } from 'class-validator';
import { IsCardinal } from 'common/decorators/validators/is-cardinal.decorator';

export class PaginationDto {
  @IsCardinal()
  @IsOptional()
  readonly limit: number = 1;

  @IsCardinal()
  @IsOptional()
  readonly page: number = 1;
}
