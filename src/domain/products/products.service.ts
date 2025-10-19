import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'common/utils/common.constants';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        categories: {
          connect: createProductDto.categories,
        },
      },
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.prisma.product.findMany({
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
        categories: {
          connect: updateProductDto.categories,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
