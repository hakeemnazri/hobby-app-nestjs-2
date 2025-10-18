import { Length } from 'class-validator';

export class CreateProductDto {
  @Length(2, 50)
  readonly name: string;
}
