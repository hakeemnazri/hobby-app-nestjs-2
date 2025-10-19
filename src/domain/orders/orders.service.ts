import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'common/utils/common.constants';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/order-item.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    const orderItems = createOrderDto.orderItems;

    const orderItemsWithPrice = await Promise.all(
      orderItems.map((orderItem) => this.createOrderItemWithPrice(orderItem)),
    );

    return await this.prisma.order.create({
      data: {
        customerId: createOrderDto.customerId.id,
        orderItems: {
          createMany: {
            data: orderItemsWithPrice,
          },
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.prisma.order.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return order;
  }

  async remove(id: number) {
    return this.prisma.order.delete({
      where: {
        id,
      },
    });
  }

  async createOrderItemWithPrice(orderItemDto: OrderItemDto) {
    const { productId, quantity } = orderItemDto;
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId.id,
      },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    const orderItem = {
      quantity,
      productId: product.id,
      price: product.price ?? 1,
    };

    return orderItem;
  }
}
