import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsPositive, ValidationOptions } from 'class-validator';

export const IsCurrency = (validationOptions?: ValidationOptions) =>
  applyDecorators(
    IsNumber({ maxDecimalPlaces: 2 }, validationOptions),
    IsPositive(validationOptions),
  );
