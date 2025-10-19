import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'common/dtos/pagination.dto';
import { CreateOrderDto } from 'orders/dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createorderDto: CreateOrderDto) {
    return this.ordersService.create(createorderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
