import { IsCardinal } from './../decorators/is-cardinal.decorators';
export class IdDto {
  @IsCardinal()
  readonly id: number;
}
