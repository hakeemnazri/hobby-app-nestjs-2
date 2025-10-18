import { ValidationPipeOptions } from '@nestjs/common';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = {
  whitelist: true, //remove non existed key,value from dto
  forbidNonWhitelisted: true, //give warning
  transform: true, // logs in console of the dto
  transformOptions: {
    enableImplicitConversion: true, //validation will transform to the right type then it will be validated
  },
};

export const DEFAULT_PAGE_SIZE = {
  USERS: 10,
} as const satisfies Record<string, number>;
