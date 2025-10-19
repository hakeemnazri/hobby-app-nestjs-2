import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_PAGE_SIZE } from 'common/utils/common.constants';
import { PrismaService } from 'nestjs-prisma';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createcategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createcategoryDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.prisma.category.findMany({
      skip:
        (paginationDto.page - 1) *
        (paginationDto.limit ?? DEFAULT_PAGE_SIZE.USERS),
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE.USERS,
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async update(id: number, updatecategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: updatecategoryDto,
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    return category;
  }

  async remove(id: number) {
    const category = this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (category.products.length > 0) {
      throw new NotFoundException('category has related products');
    }

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
