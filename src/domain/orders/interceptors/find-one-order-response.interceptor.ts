import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { map, Observable } from 'rxjs';

type IOrder = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: true;
      };
    };
    user: true;
    payment: true;
  };
}>;

@Injectable()
export class FindOneOrderResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((order: IOrder) => ({
        ...order,
        total: order.orderItems.reduce(
          (acc, orderItem) =>
            acc +
            orderItem.quantity * (orderItem.product.price?.toNumber() ?? 0),
          0,
        ),
        orderItems: order.orderItems.map((orderItem) => ({
          ...orderItem,
          subTotal:
            orderItem.quantity * (orderItem.product.price?.toNumber() ?? 0),
        })),
      })),
    );
  }
}
