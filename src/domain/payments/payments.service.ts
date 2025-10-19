import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}
  async payOrder(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.payment) {
      throw new ConflictException('Order already paid');
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
      },
    });

    const updatedOrder = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.AWAITING_SHIPMENT,
        payment: {
          connect: {
            id: payment.id,
          },
        },
      },
    });

    return updatedOrder;
  }
}
