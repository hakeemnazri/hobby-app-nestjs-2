import { Prisma } from '@prisma/client';

export type IOrder = Prisma.OrderGetPayload<{
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
