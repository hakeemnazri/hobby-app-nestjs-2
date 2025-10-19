import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as DefaultIsBoolean,
  ValidationOptions,
} from 'class-validator';
import { ToBoolean } from '../transformers/to-boolean.decorator';

export const IsBoolean = (validationOptions?: ValidationOptions) =>
  applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());
