import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //remove non existed key,value from dto
        forbidNonWhitelisted: true, //give warning
        transform: true, // logs in console of the dto
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class CommonModule {}
